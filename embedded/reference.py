from gpiozero import Button
from signal import pause

import datetime
import time

now = datetime.datetime.now
door_sensor = Button(16)

curr_state = 1
prev_same_state = now()

while True:
    if curr_state == door_sensor.is_pressed:
        prev_same_state = now()
    delta = now() - prev_same_state
    if delta.microseconds >= 500000: # 0.5 seconds
        if curr_state and not door_sensor.is_pressed:
            print("door opened")
        curr_state = door_sensor.is_pressed
    time.sleep(0.05)
