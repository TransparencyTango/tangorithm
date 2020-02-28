#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

from flask import Blueprint, request, jsonify, json, render_template
#from flask import Flask, jsonify, request, render_template

from . import glove
from . import mirror_state

QUICK_LOOKUP_PATH = "backend/letterCache"

bp = Blueprint('glove', __name__)

gloveExplorer = None
mirror = None
similarities = None

def initialize(initial_similarities):
  init_glove()
  return init_similarities(initial_similarities)

def init_similarities(initial_similarities):
  global similarities
  similarities = initial_similarities
  # ToDo: sanitize similarities, save in var similarities
  # ToDo: process similarities for frontend (similarity lookup and no match)
  return similarities

def init_glove():
  global gloveExplorer, mirror
  glove_path = "backend/letterCache/cleaned_glove.6B.50d.txt"
  models_path_1 = "backend/result_stereotypes/stereotypen_profession.txt"
  models_path_2 = "backend/result_stereotypes/stereotypen_politics.txt"
  models_path_3 = "backend/result_stereotypes/stereotypen_success.txt"
  pos_args_valid = os.path.exists(glove_path) and os.path.exists(models_path_1) and os.path.exists(models_path_2) and os.path.exists(models_path_3)
  if pos_args_valid:
      print("valid")
      gloveExplorer = glove.GloveExplorer(glove_path, models_path_1, models_path_2, models_path_3)
      gloveExplorer.setQuickLookUpPath(QUICK_LOOKUP_PATH)
      mirror = mirror_state.MirrorState()
      print("initialized")
  else:
      print("invalid")
      if not os.path.exists(glove_path):
          print("Couldn't find path: \n" + glove_path)
      if not os.path.exists(models_path_1):
          print("Couldn't find path: #\n" + models_path_1)
      if not os.path.exists(models_path_2):
          print("Couldn't find path: #\n" + models_path_2)
      if not os.path.exists(models_path_3):
          print("Couldn't find path: #\n" + models_path_3)
      print("Aborted glove initialization")
      raise Exception("Aborted glove initialization")

@bp.route("/bigScreenStart")
def getBigScreenStart():
    return render_template('bigScreenStart.html')

@bp.route("/getInput")
def getInput():
    global mirror
    return jsonify(mirror.last_input)

@bp.route("/getMatch")
def getMatch():
    global mirror
    return jsonify(mirror.current_match, mirror.current_knn, mirror.current_similarities)

@bp.route("/getMatchAndInput")
def getMatchAndInput():
    global mirror
    return jsonify(mirror.current_match, mirror.current_knn, mirror.current_similarities, mirror.last_input)


@bp.route("/postAttributes", methods=['POST'])
def postAttributes():
    global gloveExplorer, mirror, similarities
    req = request.args.get("words", None)

    if gloveExplorer and req:
        wordList = req.split(",")
        mirror.last_input = wordList
        match = gloveExplorer.getMatch(wordList)
        if match is not None:
            mirror.is_reflection = True
            mirror.current_match = match
            knns = gloveExplorer.getKNN(20, wordList)
            mirror.current_similarities = gloveExplorer.getSimilarities(similarities)
            if knns is not None:
                mirror.current_knn = list(knns.keys())
            else:
                mirror.current_knn = []
                mirror.current_similarities = gloveExplorer.getSimilarities(similarities)
            return "ok"
        else:
            mirror.reset_mirror()
            return "failed - no match found"
    else:
        mirror.reset_mirror()
        return "failed - gloveExplorer not initialized or no request arguments"


"""
import argparse
import os

from flask import Flask, jsonify, request, render_template
import glove
import mirror_state
from flask import Flask, request, jsonify
import json

gloveExplorer = None
mirror = None

#QUICK_LOOKUP_PATH = "Documents/Tangorithm_Tools/data"
QUICK_LOOKUP_PATH = "./letterCache"
possible_words = []
with open("possible_inputs/possibleInputsList") as f:
    possible_words = json.loads(f.read())

# ------------------ Server Functions ---------------------------


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

@app.route("/getAutocompletionList/<string:substring>/<int:count>")
def getAutocompletionList(substring, count):
    result_count = 1
    result = []
    for word in possible_words:
        if word.startswith(substring):
            result.append(word)
            result_count = result_count+1
        if result_count > count:
            break
    return jsonify(result)

"""

"""if __name__ == "__main__":
    pass
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
        print("valid")
        gloveExplorer = glove.GloveExplorer(glove_path, models_path)
        gloveExplorer.setQuickLookUpPath(QUICK_LOOKUP_PATH)
        mirror = mirror_state.MirrorState()
        app.run()
    else:
        print("invalid")
        if not os.path.exists(glove_path):
            print("Couldn't find path: \n" + glove_path)
        if not os.path.exists(models_path):
            print("Couldn't find path: #\n" + models_path)
        print("Aborted server launch.")"""
