#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import os

import glove
import mirror_state
from flask import Flask, request, jsonify

gloveExplorer = None
mirror = None

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
    global gloveExplorer, mirror
    req = request.args.get("words", None)

    if gloveExplorer and req:
        wordList = req.split(" ")
        match = gloveExplorer.getMatch(wordList)
        if match != None:
            mirror.is_reflection = True
            mirror.current_match = match
            knns = gloveExplorer.getKNN(5, wordList)
            if knns != None:
                mirror.current_knn = list(knns.keys())
            else:
                mirror.current_knn = []
            mirror.current_similarities = gloveExplorer.getSimilarities(["successful"])
            return "ok"
        else:
            mirror.reset_mirror()
            return "failed - no match found"
    else:
        mirror.reset_mirror()
        return "failed - gloveExplorer not initialized or no request arguments"


@app.route("/resetMirror", methods=['POST'])
def resetModel():
    global mirror
    mirror.reset_mirror()
    return "ok"


@app.route("/toggleMirrorView", methods=['POST'])
def toggleMirrorView():
    global gloveExplorer
    view = request.args.get("view", None)
    if view == "neighbours":
        mirror.show_knn = not mirror.show_knn
    elif view == "similarities":
        mirror.show_similarities = not mirror.show_similarities
    else:
        return "unknown view"
    return "ok"


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


@app.route("/getMirrorState")
def getModelName():
    global mirror
    return jsonify(mirror.get_state())



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
        mirror = mirror_state.MirrorState()
        app.run()
    else:
        if not os.path.exists(glove_path):
            print("Couldn't find path: \n" + glove_path)
        if not os.path.exists(input_path):
            print("Couldn't find path: #\n" + input_path)
        print("Aborted server launch.")
