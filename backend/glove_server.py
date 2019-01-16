#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import os

import glove
from flask import Flask, request

gloveExplorer = None


# ------------------ Server Functions ---------------------------
app = Flask(__name__)


@app.route("/getMatch")
def getMatch():
    global gloveExplorer
    req = request.args.get("words", None)

    if gloveExplorer and req:
        wordList = req.split(" ")
        match = gloveExplorer.getMatch(wordList)
        return match
    else:
        return None


@app.route("/getKNN")
def getKNN():
    global gloveExplorer
    k = int(request.args.get("k", None))
    input_words = request.args.get("words", None)
    if k and input_words:
        wordList = input_words.split(" ")
        knn_dict = gloveExplorer.getKNN(k, wordList)
        knn_keys = list(knn_dict.keys())
        msg = " ".join(knn_keys)
        return msg
    else:
        return None


@app.route("/postAttributes", methods=['POST'])
def postAttributes():
    global gloveExplorer
    req = request.args.get("words", None)

    if gloveExplorer and req:
        wordList = req.split(" ")
        match = gloveExplorer.getMatch(wordList)
        gloveExplorer.isReflection = True
        gloveExplorer.currentMatch = match
        gloveExplorer.current_knn = list(gloveExplorer.getKNN(5, wordList).keys())
        gloveExplorer.current_similarities = gloveExplorer.getSimilarities(["successful"])
        return "ok"
    else:
        return "failed"

@app.route("/resetModel", methods=['POST'])
def resetModel():
    global gloveExplorer
    gloveExplorer.isReflection = False
    gloveExplorer.currentMatch = "default"
    gloveExplorer.showKNN, gloveExplorer.showSimilarities = False, False
    gloveExplorer.current_knn, gloveExplorer.current_similarities = [], []
    return "ok"

@app.route("/toggleMirrorView", methods=['POST'])
def toggleMirrorView():
    global gloveExplorer
    view = request.args.get("view", None)
    if view == "neighbours":
        gloveExplorer.showKNN = not gloveExplorer.showKNN
    elif view == "similarities":
        gloveExplorer.showSimilarities = not gloveExplorer.showSimilarities
    else:
        return "unknown view"
    return "ok"

@app.route("/getModelName")
def getModelName():
    global gloveExplorer
    response = [str(gloveExplorer.isReflection), gloveExplorer.currentMatch, str(gloveExplorer.showSimilarities), str(gloveExplorer.showKNN)]
    response.append(",".join(gloveExplorer.current_knn))
    response.append(",".join(list(map(str, gloveExplorer.current_similarities))))
    return " ".join(response)


@app.route("/getSimilarities")
def getSimilarities():
    global gloveExplorer
    req = request.args.get("words", None)

    if req:
        wordList = req.split(" ")
        similarities = gloveExplorer.getSimilarities(wordList)
        msg = " ".join(map(str, similarities))
        return msg
    else:
        return None


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("glove_file_path", action="store",
                        help="directory of glove word-embeddings")
    parser.add_argument("models_descriptions_path", action="store",
                        help="path to file with modelname + tags")
    args = parser.parse_args()

    glove_path = args.glove_file_path
    models_path = args.models_descriptions_path

    pos_args_valid = os.path.exists(glove_path) and os.path.exists(models_path)

    if pos_args_valid:
        gloveExplorer = glove.GloveExplorer(glove_path, models_path)
        app.run()
    else:
        if not os.path.exists(glove_path):
            print("Couldn't find path: \n" + glove_path)
        if not os.path.exists(input_path):
            print("Couldn't find path: #\n" + input_path)
        print("Aborted server launch.")
