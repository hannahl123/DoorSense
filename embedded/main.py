import gpiozero as gpio

import time
import datetime

class ButtonSensor:
    def __init__(self, port: int):
        self.state: int = 0
        self.button: gpio.Button = gpio.Button(port)
        self.last_change: float = 0
        self.timeout: float = 0.5
    def get_state(self) -> int:
        return self.button.is_pressed 
    def update(self):
        val = False;
        if (self.state != self.get_state()):
            self.state = self.get_state()
            if time.time()-self.last_change >= self.timeout:
                val = True
                self.last_change = time.time()
        return val;

door_sensor = ButtonSensor(1)

run = True
while run:
    door_change = door_sensor.update()
    if door_change:
        if door_sensor.status:
            print("Door open at "+time.time())
        else:
            print("Door close at "+time.time())
