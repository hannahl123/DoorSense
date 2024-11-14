# setup
import pathlib
def is_raspPI(): return pathlib.Path("/etc/rpi-issue").exists()
print(is_raspPI())

if is_raspPI():
    import tflite_runtime.interpreter as tfl_interpreter
else:
    import tensorflow.lite.python.interpreter as tfl_interpreter

interpreter = tfl_interpreter.Interpreter(model_path="");