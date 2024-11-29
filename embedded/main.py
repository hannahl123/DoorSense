import gpiozero as gpio
from modules.include import *
import requests
from datetime import datetime

door_sensor = ButtonSensor(16)

BACKEND_URL = "http://10.20.98.169:3000"

def send_detection_to_backend():
    payload = {
        "timestamp": str(datetime.now())
    }
    try:
        response = requests.post(f"{BACKEND_URL}/ai/door", json=payload)
        if response.status_code == 200:
            print("Detection sent to backend successfully")
        else:
            print(f"Failed to send detection to backend. Status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending detection to backend: {e}")

run = True
while run:
    door_change = door_sensor.update()
    if door_change:
        if door_sensor.state:
            print("Door open at " + str(time.time()))
            send_detection_to_backend()

        else:
            print("Door close at " + str(time.time()))
