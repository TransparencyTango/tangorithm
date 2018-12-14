# Dependencies:

- argparse
- time
- cv2
- imutils
- numpy
- flask

# Nutzung:

1. Die prototxt und caffemodel Datein runterladen.
2. Im Server Script die Pfade zu den Dateien setzen
3. Server starten wie im Flask Tutorial

Vor der ersten Anfrage muss der Server initilisiert werden, d.h.
vor dem ersten GET von /detect muss ein GET /init erfolgen, welches
das model läd.
