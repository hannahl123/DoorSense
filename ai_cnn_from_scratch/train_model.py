import os
import tensorflow as tf
from tensorflow.keras import layers, models
import xml.etree.ElementTree as ET
from sklearn.model_selection import train_test_split
import shutil

# Define paths
voc_dir = "dataset/parcels/Parcel_Detection.v5i.voc"
persons_train_dir = "dataset/persons/INRIAPerson/96X160H96/Train/pos"
persons_valid_dir = "dataset/persons/INRIAPerson/70X134H96/Test/pos"
preprocessed_dir = "dataset/preprocessed"

# Function to parse Pascal VOC annotations and split images into train/valid folders
def preprocess_voc_dataset(voc_dir, output_dir, class_name):
    print(f"Preprocessing VOC dataset for class: {class_name}")
    image_paths = []
    for split in ["train", "valid"]:
        split_dir = os.path.join(voc_dir, split)
        if not os.path.exists(split_dir):
            print(f"{split_dir} does not exist. Skipping.")
            continue

        for xml_file in [f for f in os.listdir(split_dir) if f.endswith(".xml")]:
            xml_path = os.path.join(split_dir, xml_file)
            tree = ET.parse(xml_path)
            root = tree.getroot()
            file_name = root.find("filename").text
            image_path = os.path.join(split_dir, file_name)
            if os.path.exists(image_path):
                image_paths.append(image_path)

    # Split into train/valid sets
    train_images, valid_images = train_test_split(image_paths, test_size=0.2, random_state=42)

    # Save images to respective directories
    for image_set, set_name in [(train_images, "train"), (valid_images, "valid")]:
        class_dir = os.path.join(output_dir, set_name, class_name)
        os.makedirs(class_dir, exist_ok=True)
        for img in image_set:
            shutil.copy(img, class_dir)

# Function to preprocess INRIA dataset
def preprocess_inria_dataset(train_dir, valid_dir, output_dir, class_name):
    print(f"Preprocessing INRIA dataset for class: {class_name}")
    # Copy training images
    train_output_dir = os.path.join(output_dir, "train", class_name)
    os.makedirs(train_output_dir, exist_ok=True)
    for img in os.listdir(train_dir):
        shutil.copy(os.path.join(train_dir, img), train_output_dir)

    # Copy validation images
    valid_output_dir = os.path.join(output_dir, "valid", class_name)
    os.makedirs(valid_output_dir, exist_ok=True)
    for img in os.listdir(valid_dir):
        shutil.copy(os.path.join(valid_dir, img), valid_output_dir)

# Preprocess datasets
os.makedirs(preprocessed_dir, exist_ok=True)
preprocess_voc_dataset(voc_dir, preprocessed_dir, "parcel")
preprocess_inria_dataset(persons_train_dir, persons_valid_dir, preprocessed_dir, "person")

# Data generators for training and validation
train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1. / 255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

valid_datagen = tf.keras.preprocessing.image.ImageDataGenerator(
    rescale=1. / 255
)

train_generator = train_datagen.flow_from_directory(
    os.path.join(preprocessed_dir, "train"),
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

validation_generator = valid_datagen.flow_from_directory(
    os.path.join(preprocessed_dir, "valid"),
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical'
)

# Build the CNN model
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(train_generator.num_classes, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // train_generator.batch_size,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // validation_generator.batch_size,
    epochs=10
)

# Save the trained model
model.save('custom_model.h5')
print("Model saved as 'custom_model.h5'.")

# Convert the model to TensorFlow Lite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

# Save the TFLite model
with open('custom_model.tflite', 'wb') as f:
    f.write(tflite_model)
print("TFLite model saved as 'custom_model.tflite'.")
