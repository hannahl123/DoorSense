import cv2

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    print("frame:")
    print(frame)
    break

    cv2.imshow("frame", frame)

    if cv2.waitKey(1) in [ord("q"), 27]:  # 27 is escape key
        break

cap.release()
cv2.destroyAllWindows()
