#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

from flask import Blueprint, request, jsonify, json, render_template, redirect
#from flask import Flask, jsonify, request, render_template
from random import randrange

from . import glove
from . import mirror_state
from . import profession_color

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

# Mobile Views

@bp.route("/mobileStart")
def mobileStartPage():
    global mirror
    return render_template('mobileStart.html')

@bp.route("/mobileChoice")
def mobileChoicePage():
    global mirror
    try:
        return render_template('mobileChoice.html', name = mirror.last_input[0])
    except IndexError:
        mirror.currentBigScreen = "intro"
        return redirect("/mobileStart")

@bp.route("/mobileInterpretation")
def mobileInterpretationPage():
    global mirror
    try:
        return render_template('mobileInterpretation.html', name = mirror.last_input[0], current_match=mirror.current_match)
    except IndexError:
        mirror.currentBigScreen = "intro"
        return redirect("/mobileStart")

@bp.route("/mobileTurningPoint")
def mobileTurningPointPage():
    global mirror
    try:
        return render_template('mobileTurningPoint.html', name = mirror.last_input[0], matches = mirror.current_matches)
    except IndexError:
        mirror.currentBigScreen = "intro"
        return redirect("/mobileStart")

@bp.route("/mobileRelevance")
def mobileRelevancePage():
    return render_template('mobileRelevance.html')

# Big Screen Views
@bp.route("/bigScreenIntroduction")
def bigScreenIntroductionPage():
    return render_template('bigScreen.html', video = "/static/videos/idleBigScreen.mp4", currentScreen = "intro")

@bp.route("/bigScreenInterpretationIntro")
def bigScreenInterpretationIntroPage():
    profession = mirror.current_match[0][0]
    profession = profession.strip("id _")
    color = ""
    profession_lower = profession[0].lower() + profession[1:]
    profession_upper = profession[0].upper() + profession[1:]
    try:
        color = profession_color.profession_color[profession_lower]
    except KeyError:
        color = profession_color.profession_color[profession_upper]
    print(color)
    if color == "white black":
        pick = randrange(2)
        color = color.split()[pick]

    success = mirror.current_match[2][0]
    success = success.strip("id _")
    success = success[0].lower() + success[1:]
    isBig = mirror.current_match[2][1] > 0.3 # match is higher than 65 %
    size = "groß" if isBig else "klein"


    path_color = "" if color == "white" else "_schwarz"
    video_path = success + "_" + size + path_color

    mirror.current_video = video_path
    print(mirror.current_video)

    return render_template('bigScreenInterpretationIntro.html', video = "/static/videos/Vorspann_" +color+".mp4", currentScreen = "interpretation intro")

@bp.route("/bigScreenInterpretation")
def bigScreenInterpretationPage():
    mirror.currentBigScreen ="interpretation"
    folder =  mirror.current_video.partition("_")[0]
    video_1 = "/static/videos/"+folder+"/"+"D_"+mirror.current_video + ".mp4"
    video_2 = "/static/videos/"+folder+"/"+mirror.current_video + ".mp4"

    return render_template('bigScreenInterpretation.html', first_video = video_1 , second_video = video_2, currentScreen = "interpretation")

# AJAX Routes

@bp.route("/getMatch")
def getMatch():
    global mirror
    # if not videos: video pfade initialisiern. Und natürlich mitschicken.
    return jsonify(mirror.current_match, mirror.current_knn, mirror.current_similarities)

@bp.route("/postAttributes", methods=['POST'])
def postAttributes():
    global gloveExplorer, mirror, similarities
    req = request.args.get("words", None)

    if gloveExplorer and req:
        wordList = req.split(",")
        mirror.last_input = wordList
        match = gloveExplorer.getTwoMatches(wordList)
        if match is not None:
            mirror.currentBigScreen = "interpretation intro"
            mirror.current_matches = match
            mirror.current_match = getFirstMatches(match)
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

@bp.route("/resetMirror", methods=['POST'])
def resetModel():
    global mirror
    mirror.reset_mirror()
    return "ok"

@bp.route("/getMirrorState")
def getModelName():
    global mirror
    return jsonify(mirror.get_state())

# helpers

def getFirstMatches(match):
    first_matches = []
    for category in match:
        first_match=[]
        for element in category:
            first_match.append(element[1])
        first_matches.append(first_match)
    return first_matches

"""

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
