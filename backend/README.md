# Sever Speedup Tutorial:

1. Bereinigung & Spaltung des glove word-embeddings Datensatzes

  - Setze im Skript glove_cleaner.py die Variable PATH_TO_GLOVE_FILE
  - Führe das glove_cleaner.py Skript aus
    - -> Output:
        - a. Es wird im derzeitigen directory für jeden Buchstaben des Alphabets
           eine .txt Datei der Form buchstabe.txt erstellt, z.B. a.txt
        - b. Es wird im derzeitigen directory eine .txt Datei erstellt, die den
           Namen der glove Datei trägt mit dem Prefix cleaned_, z.B.
           cleaned_glove.6B.50d.txt
  - Setze nun im glove_server die Variable QUICK_LOOKUP_PATH auf das directory
    in welchem sich die Buchstaben.txt befinden

2. Starte den Server mit dem bereinigten "cleaned_glove.6B.50d.txt" Datensatz
  -> Output:
      - a. Es wird im derzeitigen directory eine Datei namens avgVectors.pkl
           erstellt
      - b. Es wird im derzeitigen directory eine Datei namens modelDescriptions.pkl
           erstellt
      - c. Es wird im derzeitigen directory eine Datei namens unknownTags.pkl
           erstellt

  Sollten sich diese Dateien bei nachfolgenden Server-Starts im Start-directory
  des Servers befinden, so werden diese automatisch geladen und müssen nicht
  länger neu berechnet werden


# Dependencies glove server:

- csv
- numpy
- pandas
- sklearn
- flask
- argparse
- os
- glove
- difflib
- pickle

# Nutzung glove server:
1. (einmalig zu Beginn) Starte den Flask Server
    In Terminal:
    python glove_server.py path/to/glove/data path/to/model/descriptions

      Bsp:
      python glove_server.py glove.6B.50d.txt stereotypen.txt

2. Matching:

    Request: http://127.0.0.1:5000/getMatch?words=word1 word2

        Bsp:
        http://127.0.0.1:5000/getMatch?words=lazy cool rock
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
