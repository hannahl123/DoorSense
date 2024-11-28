import cv2
import numpy as np
import requests
import tflite_runtime.interpreter as tflite
import json
from datetime import datetime

# Backend API URL
BACKEND_URL = "http://backend-server-url:port/api"

# ESP32 camera stream URL
ESP32_URL = "http://esp32-camera-ip-address/stream"

# Load the TFLite model
interpreter = tflite.Interpreter(model_path="custom_model.tflite")
interpreter.allocate_tensors()

# Get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Class names
class_names = ['background', 'parcel', 'person']

def preprocess_image(image):
    image = cv2.resize(image, (224, 224))
    image = image.astype(np.float32) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

def detect_objects(image):
    preprocessed_image = preprocess_image(image)
    interpreter.set_tensor(input_details[0]['index'], preprocessed_image)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])
    return output_data[0]

def send_detection_to_backend(class_name, confidence):
    payload = {
        "class": class_name,
        "confidence": confidence,
        "timestamp": str(datetime.now())
    }
    try:
        response = requests.post(f"{BACKEND_URL}/ai/detections", json=payload)
        if response.status_code == 200:
            print("Detection sent to backend successfully")
        else:
            print(f"Failed to send detection to backend. Status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending detection to backend: {e}")

def get_camera_config():
    try:
        response = requests.get(f"{BACKEND_URL}/camera-config")
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Failed to get camera config. Status code: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error getting camera config: {e}")
        return None

def main():
    camera_config = get_camera_config()
    if camera_config:
        esp32_url = camera_config.get('stream_url', ESP32_URL)
    else:
        esp32_url = ESP32_URL

    stream = requests.get(esp32_url, stream=True)
    bytes_data = bytes()

    cv2.namedWindow('ESP32 Camera Stream', cv2.CV_WINDOW_AUTOSIZE)

    for chunk in stream.iter_content(chunk_size=1024):
        bytes_data += chunk
        a = bytes_data.find(b'\xff\xd8')
        b = bytes_data.find(b'\xff\xd9')
        if a != -1 and b != -1:
            jpg = bytes_data[a:b+2]
            bytes_data = bytes_data[b+2:]
            frame = cv2.imdecode(np.frombuffer(jpg, dtype=np.uint8), cv2.CV_LOAD_IMAGE_COLOR)
            
            # Perform object detection
            results = detect_objects(frame)
            
            # Get the class with the highest probability
            class_id = np.argmax(results)
            class_name = class_names[class_id]
            confidence = results[class_id]
            
            # Send detection to backend
            send_detection_to_backend(class_name, float(confidence))
            
            # Draw the results on the frame
            cv2.putText(frame, f"{class_name}: {confidence:.2f}", (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            
            # Display the frame
            cv2.imshow('ESP32 Camera Stream', frame)
            
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()