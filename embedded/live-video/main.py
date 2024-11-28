import cv2
import base64
import socketio
import time


class RPiVideoStream:
    def __init__(self, server_url: str):
        """
        - Sets up camera capture
        - Establishes WebSocket connection to server
        """

        self.camera = cv2.VideoCapture(0)

        self.width, self.height = 640, 480
        self.camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

        self.sio = socketio.Client()
        self.server_url = server_url

        self._connect_to_server()

    def _connect_to_server(self):
        try:
            self.sio.connect(self.server_url)
            print(f"Raspberry Pi connected to server at {self.server_url}")
        except Exception as e:
            print(f"Error while connecting to server at {self.server_url}: {e}")
            print("Retrying in 3 seconds...")
            time.sleep(3)
            self._connect_to_server()

    def stream_video(self):
        while True:
            ret, frame = self.camera.read()

            if not ret:
                print("Failed to grab frame.")
                return

            frame = cv2.resize(frame, (self.width, self.height))

            # encode frame as JPEG
            _, buffer = cv2.imencode(".jpg", frame)

            frame_base64 = base64.b64encode(buffer).decode("utf-8")

            # send frame via web socket
            self.sio.emit("video_stream", {"frame": frame_base64})

            time.sleep(0.03)  # ~30 frames/second

    def __del__(self):
        # called when the object is garbage collected
        self.camera.release()
        self.sio.disconnect()


if __name__ == "__main__":
    streamer = RPiVideoStream()
    streamer.stream_video()
