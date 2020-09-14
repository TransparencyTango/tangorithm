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
(mirror-env) $ pip install Flask-Session
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
{
    bg-video: "backgrounds/h-suicidal-klein.mp4",
    card-video: "cards/suicidal/suicidal-gross-weiss.webm",
    prophecy: "[["suicidal", 18], ["monogamy", 22], ["actress", 44]]",
    tp-video: "cards/empathy/empathy-gross-weiss.webm",
    turning-point: "[["empathy", 9], ["bisexual", 21], ["actor", 30]]"
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
