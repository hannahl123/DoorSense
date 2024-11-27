import os
import pathlib
import numpy as np

# setup
dir = os.path.dirname(__file__)
interpreter = None
def is_raspPI(): return pathlib.Path("/etc/rpi-issue").exists()
print("Is Raspberry Pi: "+str(is_raspPI()))
if is_raspPI():
    import tflite_runtime.interpreter as tfl_interpreter
    interpreter = tfl_interpreter.Interpreter(dir+"/model/parcel_detection.lite")
else:
    import tensorflow as tf
    interpreter = tf.lite.Interpreter(dir+"/model/parcel_detection.lite")

# allocate tensors
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