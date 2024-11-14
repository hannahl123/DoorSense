import os
import pathlib

# setup
def is_raspPI(): return pathlib.Path("/etc/rpi-issue").exists()
print("Is Raspberry PI: "+str(is_raspPI()))
if is_raspPI():
    import tflite_runtime.interpreter as tfl_interpreter
else:
    import numpy as np
    import tensorflow as tf

dir = os.path.dirname(__file__)
interpreter = tf.lite.Interpreter(dir+"/model/parcel_detection.lite")
interpreter.allocate_tensors()

# get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# test the model on random input data
input_shape = input_details[0]["shape"]
input_data = np.array(np.random.random_sample(input_shape), dtype=np.int8)
interpreter.set_tensor(input_details[0]["index"], input_data)

# invoke interpreter
interpreter.invoke()