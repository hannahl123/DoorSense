import keras
import tensorflow as tf

# model
model = keras.Sequential([
    keras.layers.InputLayer(shape=(28,28)),
    keras.layers.Dense(32, activation="relu"),
    keras.layers.Dense(10, activation="softmax")
])

# load data
train_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    "data",
    image_size=(28, 28), # resize images
    color_mode="rgb",
    batch_size=32,
    label_mode="int" # "labels will be integer indices based on class folder names"
)
test_dataset = tf.keras.preprocessing.image_dataset_from_directory(
    "data",
    image_size=(28, 28),
    color_mode="rgb",
    batch_size=32,
    label_mode="int"
)
def normalize(images, labels):
    images = tf.cast(images, tf.float32) / 255.0
    return images, labels

train_dataset = train_dataset.map(normalize)
test_dataset = test_dataset.map(normalize)

# train
model.compile(
    optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
)
model.fit(train_images, train_labels, epochs=5);

# convert
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_model = converter.convert()

# write
with tf.io.gfile.GFile("model.tflite", "wb") as f:
    f.write(tflite_model)