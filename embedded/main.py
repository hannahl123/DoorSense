import gpiozero as gpio
from modules.include import *

door_sensor = ButtonSensor(1)

run = True
while run:
    door_change = door_sensor.update()
    if door_change:
        if door_sensor.status:
            print("Door open at "+time.time())
        else:
            print("Door close at "+time.time())
