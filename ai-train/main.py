import keras
import tensorflow as tf

#model
model = keras.Sequential([
    keras.layers.InputLayer(shape=(28,28)),
    keras.layers.Dense(32, activation="relu"),
    keras.layers.Dense(10, activation="softmax")
])

model.compile(
    optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
)
model.fit(train_images, train_labels, epochs=5);

# convert
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
tflite_model = converter.convert()

with tf.io.gfile.GFile("model.tflite", "wb") as f:
    f.write(tflite_model)