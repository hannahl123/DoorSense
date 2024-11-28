import os
import pathlib
import cv2
import numpy as np

# setup
dir = os.path.dirname(__file__)
interpreter = None # define interpreter based on platform
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
input_shape = input_details[0]["shape"]

# cv2.namedWindow("Preview")
vc = cv2.VideoCapture(0)

rval, frame = False, None
if vc.isOpened(): # try to get the first frame
    rval, frame = vc.read()
else:
    rval = False

while rval:
    # cv2.imshow("Preview", frame)
    rval, frame = vc.read()
    frame = cv2.resize(frame, (input_shape[2], input_shape[1]))
    if input_shape[3] == 1:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        frame = np.expand_dims(frame, axis=-1)
    frame_int8 = frame.astype(np.int8)
    frame_int8 = np.expand_dims(frame_int8, axis=0)
    interpreter.set_tensor(input_details[0]["index"], frame_int8)
    interpreter.invoke()
    key = cv2.waitKey(20)
    output = interpreter.get_tensor(output_details[0]['index'])[0]
    print(output)

    # if key == 27: # exit on ESC
    #     break

# close opencv
vc.release()
# cv2.destroyWindow("Preview")