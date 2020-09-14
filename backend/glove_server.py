#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os

from flask import Blueprint, request, jsonify, send_from_directory, json

from .glove import glove
from .result_stereotypes import profession_color

QUICK_LOOKUP_PATH = "backend/glove/letterCache"

bp = Blueprint('glove', __name__)

gloveExplorer = None

def init_glove():
  global gloveExplorer
  glove_path = "backend/glove/letterCache/cleaned_glove.6B.50d.txt"
  models_path_1 = "backend/result_stereotypes/stereotypen_success.txt"
  models_path_2 = "backend/result_stereotypes/stereotypen_politics.txt"
  models_path_3 = "backend/result_stereotypes/stereotypen_profession.txt"
  pos_args_valid = os.path.exists(glove_path) and os.path.exists(models_path_1) and os.path.exists(models_path_2) and os.path.exists(models_path_3)
  if pos_args_valid:
      print("valid")
      gloveExplorer = glove.GloveExplorer(glove_path, models_path_1, models_path_2, models_path_3)
      gloveExplorer.setQuickLookUpPath(QUICK_LOOKUP_PATH)
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

@bp.route("/interpretation")
def interpretation():
    term = request.args.get("term", None)
    knns = list(gloveExplorer.getKNN(16, [t.lower() for t in term.split(" ")]).keys())
    knns = knns[1:] if knns[0] == term.lower() else knns[:15]
    return jsonify(knns) 

@bp.route("/glove-exploration", methods=['POST'])
def glove_exploration():
    req = request.args.get("name", None)

    if gloveExplorer and req:
        nameList = [name.lower() for name in req.split(" ")]
        matches = gloveExplorer.getTwoMatches(nameList)
        if matches is not None:
            prophecy, tps = processMatches(matches)
            bg_video, card_video = getVideos(prophecy)	
            _, tp_video = getVideos(tps)
            result = {
	        "prophecy": json.dumps(prophecy),
                "turning-point": json.dumps(tps),
                "bg-video": bg_video,
                "card-video": card_video,	
                "tp-video": tp_video
	    }
            return result
        else:
            return "failed - no match found for " + req, 404
    else:
        if not req:
            return "failed - no name parameter", 400
        return "failed - gloveExplorer not initialized", 500

def processMatches(matches):
    first_matches, turning_points = [], []
    for match in matches:
        match_names = [v.split("_")[1].strip().lower() for v in match[0]]
        conceal_neg_cos_sim = lambda x: (x + 1) / 21 if x <= 0.05 else x
        percentages = [round(conceal_neg_cos_sim(p) * 100) for p in match[1].tolist()]
        match_tuples = list(zip(match_names, percentages))
        first_matches.append(match_tuples[1])
        turning_points.append(match_tuples[0])
    return first_matches, turning_points

def getVideos(prophecy):
    social_property = prophecy[0][0]
    is_strong_interest_val = prophecy[1][1] > 30 
    size_bg = "gross" if is_strong_interest_val else "klein"
    size_card = "klein" if is_strong_interest_val else "gross"
    profession = prophecy[2][0].lower()
    color = profession_color.profession_color[profession]
    filename_bg = "backgrounds/h-" + social_property + "-" + size_bg + ".mp4"
    filename_card = "cards/" + social_property + "/" + social_property + "-" + size_card + "-" + color + ".webm"
    return filename_bg, filename_card
