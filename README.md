# tangorithm

## Backend

### Setup
Anaconda installieren: https://www.anaconda.com/distribution/

Das Anaconda Prompt öffnen (sieht aus wie ein Terminal/eine Shell) und in den Projekt-Ordner navigieren.

```
cd /path/to/tangorithm
```

Ein neues Environment mit dem Namen `mirror-env` erstellen:
```
$ conda create -n mirror-env
```

Neues Environment aktivieren
```
$ conda activate mirror-env
```

Libs installieren:
```
(mirror-env) $ conda install flask
(mirror-env) $ conda install numpy
(mirror-env) $ conda install pandas
(mirror-env) $ conda install scikit-learn
```

Umgebungsvariablen setzen
```
(mirror-env) $ conda env config vars set FLASK_APP=backend
(mirror-env) $ conda env config vars set FLASK_ENV=development
(mirror-env) $ export FLASK_APP=backend
(mirror-env) $ export FLASK_ENV=development
```

GloVe Wort-Vektor runterladen und entpacken: http://nlp.stanford.edu/data/glove.6B.zip

Im Backendserver unter `tangorithm/backend/glove` einen neuen Ordner
`letterCache` anlegen.
Die kleinste der Dateien `glove.6B.50d.txt` in den neu angelegten Ordner `letterCache` verschieben.

In den Backendserver navigieren und Glove vorprozessieren:
```
$ cd tangorithm/backend/glove
$ python glove_cleaner.py
````

Im Ordner `tangorithm/backend/` die Ordner `static/videos` erstellen und dann alle Videos nach `tangorithm/backend/static/videos` kopieren.

### Anwendung starten 

Das Anaconda Prompt öffnen und in den Projekt-Ordner navigieren.
```
cd /path/to/tangorithm
```

Falls nötig Environment aktivieren
```
$ conda activate mirror-env
```

Server starten
```
$ python -m flask run
```

... warten, bis im Terminal "initialized" steht

### Requests

**Namenseingabe:** Klick auf Generate

Query Param: `name`
```
POST 127.0.0.1:5000/glove-exploration?name=Mira

200 OK 
successfully matched name
```

**Prophezeiung:** Auswertung für den Namen
```
GET 127.0.0.1:5000/evaluation

200 OK
{
    "prophecy": [
        [
            "suicidal",
            18
        ],
        [
            "monogamy",
            22
        ],
        [
            "actress",
            44
        ]
    ]
}
```

**Interpretation:** Klick auf einzelne Begriffe der Prophezeiung zeigt nächste verwandten Wörter an.

Query Param: `term`
```
GET 127.0.0.1:5000/interpretation?term=intelligent

200 OK
[
    "intelligent",
    "articulate",
    "adept",
    "suited",
    "smart",
    "uniquely",
    "intuitive",
    "incredibly",
    "resourceful",
    "thoughtful",
    "agile",
    "persuasive",
    "naive",
    "conscious",
    "useful"
]
```

**Turning Points:** Prophezeiung + nächst wahrscheinlichste Prophezeiung
```
GET 127.0.0.1:5000/turning-point

200 OK 
{
    "prophecy": [
        [
            "suicidal",
            18
        ],
        [
            "monogamy",
            22
        ],
        [
            "actress",
            44
        ]
    ],
    "turning-points": [
        [
            "empathy",
            9
        ],
        [
            "bisexual",
            21
        ],
        [
            "actor",
            30
        ]
    ]
}
```

**Videos:**

Path variable: `video-name`

 Für das Video hinter der Namenseingabe und das Intro-Video, bevor  die Prophezeiung angezeigt wird, entspricht `<video-name>` dem Dateinamen. Für die Prophezeiung muss der `<video-name>` für den Hintergrund 
`prophecy-background` und für die Karte `prophecy-card` lauten.
```
GET 127.0.0.1:5000/video/<video-name>

200 OK
h.happy.groß.mp4
```
