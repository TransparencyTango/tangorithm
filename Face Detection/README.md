# Dependencies glove tools:

- csv
- pandas
- sklearn
- flask

# Nutzung glove tools:
0. (einmalig zu Beginn) Starte den Flask Server
1. (einmalig zu Beginn) Setup des Servers: (Laden des Models)

    Request: http://127.0.0.1:5000/setup?path=absolute/path/to/file

        Bsp:
        http://127.0.0.1:5000/setup?path=C:/Users/Eduard/Downloads/glove.6B/glove.6B.50d.txt

2. Abfrage von Abständen:

    Request: http://127.0.0.1:5000/getDistances?words=word1 word2

        Bsp:
        http://127.0.0.1:5000/getDistances?words=frog lizard snake
        (Trennzeichen = space!)

        Output String: [(frog<->lizard Distanz) (frog <->snake Distanz)]
        Bsp:
        [0.8245 0.21]
        (Cosine Similarity! Maß für Ähnlichkeit: 1.0 bedeutet sehr ähnlich,
         je kleiner desto unähnlicher)

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
