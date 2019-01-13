# Dependencies glove server:

- csv
- numpy
- pandas
- sklearn
- flask
- argparse
- os
- glove

# Nutzung glove server:
1. (einmalig zu Beginn) Starte den Flask Server
    In Terminal:
    python glove_server.py path/to/glove/data path/to/model/descriptions

      Bsp:
      python glove_server.py glove.6B.50d.txt stereotypen.txt

2. Matching:

    Request: http://127.0.0.1:5000/getMatch?words=word1 word2

        Bsp:
        http://127.0.0.1:5000/getDistances?words=lazy cool rock
        (Trennzeichen = space!)

        Output String: "punk17"

3. Abfrage von kNN:

    Request: http://127.0.0.1:5000/getKNN?k=number&word=example_word

        Bsp:
        http://127.0.0.1:5000/getKNN?k=100&word=caucasian

        Output String: [word_1, ..., word_n]
        (Metrik ist hier Euklidische Distanz nicht Kosinus-Ähnlichkeit!)



# Dependencies face_detector_server: [Dieser Abschnitt vorerst unwichtig: deprecated]

- cv2
- imutils
- numpy
- flask

# Nutzung Face Detector:

1. Die prototxt und caffemodel Datein runterladen.
2. Im Server Script die Pfade zu den Dateien setzen
3. Server starten wie im Flask Tutorial

Vor der ersten Anfrage muss der Server initilisiert werden, d.h.
vor dem ersten GET von /detect muss ein GET /init erfolgen, welches
das model läd.
