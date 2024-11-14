import os
import keras
import tensorflow as tf

VIDEO_X = 640
VIDEO_Y = 360

# model
model = keras.Sequential([
    keras.layers.InputLayer(shape=(VIDEO_X, VIDEO_Y)),
    keras.layers.Dense(32, activation="relu"),
    keras.layers.Dense(10, activation="softmax")
])

# load data
dir = os.path.dirname(__file__)
train_dataset = keras.preprocessing.image_dataset_from_directory(
    dir+"/data",
    image_size=(VIDEO_X, VIDEO_Y), # resize images
    color_mode="rgb",
    batch_size=32,
    label_mode="int" # "labels will be integer indices based on class folder names"
)
# test_dataset = keras.preprocessing.image_dataset_from_directory(
#     dir+"/data",
#     image_size=(VIDEO_X, VIDEO_Y),
#     color_mode="rgb",
#     batch_size=32,
#     label_mode="int"
# )

# train
model.compile(
    optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
)
model.fit(train_dataset, epochs=5);

# convert
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_model = converter.convert()

# write
with tf.io.gfile.GFile("model.tflite", "wb") as f:
    f.write(tflite_model)