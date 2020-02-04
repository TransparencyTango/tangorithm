#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import os

from flask import Flask, jsonify, request

import glove
import mirror_state
from flask import Flask, request, jsonify
import json

gloveExplorer = None
mirror = None

#QUICK_LOOKUP_PATH = "Documents/Tangorithm_Tools/data"
QUICK_LOOKUP_PATH = "."
possible_words = []
with open("possible_inputs/possibleInputsList") as f:
    possible_words = json.loads(f.read())

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
        if match is not None:
            mirror.is_reflection = True
            mirror.current_match = match
            knns = gloveExplorer.getKNN(20, wordList)
            if knns is not None:
                mirror.current_knn = list(knns.keys())
            else:
                mirror.current_knn = []
            mirror.current_similarities = \
                gloveExplorer.getSimilarities(["socialist","socialists","party","centrist","socialism","communist","leftist","communists","populist","left-wing","federalist","revolutionary","pasok","agrarian","reformer",

                "liberal","liberals","centrist","libertarian","progressive","party","leaning","federalist","labour","opposed","tory","left-wing","democratic","politics","influential",

                "conservative","conservatives","centrist","democratic","supporter","opposed","party","leaning","influential","republican","supported","opinion","outspoken","tory","populist"

                "successfully","eventually","effectively","managed","subsequently","ultimately","aided","pursued","assisted","quickly","begun","simultaneously","entered","determined","soon",

                "looser","restrictive","loosening","inflexible","polices","tighter","dictated","rigid","conforming","dictating","rigidly","instituting","cumbersome","constrained","burdensome",

                "loved","remember","friends","wonder","remembered","loves","imagine","liked","beloved","remembers","knew","tell","wonders","reminds","dad",

                "hated","despised","despise","betrayed","loathed","hates","obsessed","evidently","cursed","theirs","scorned","dreamed","ironically","adored","dislikes",

                "criminal","crime","crimes","charged","prosecution","charges","alleged","investigating","prosecuting","guilty","conspiracy","case","prosecuted","investigate","involvement",

                "victim","death","killer","finds","witness","child","murder","escaped","man","woman","suspect","escapes","survived","another","innocent",

                "suicidal","ideation","homicidal","impulsive","tendencies","psychotic","antisocial","sociopathic","delusional","self-destructive","paranoid","impetuous","demented","psychopath","narcissistic",

                "hostess","waitress","hairdresser","diner","bartender","showbiz","caterer","waiter","emcee","barmaid","catered","saucy","swanky","restaurateur","twinkies",

                "fireman","firefighter","janitor","driscoll","blackmailer","crewman","medic","hires","mechanic","chauffeur","cabbie","watchman","paramedic","vetter","gunning",

                "nurse","nurses","pediatrician","counselor","therapist","pregnant","nursing","surgeon","paramedic","physician","midwife","psychiatrist","toddler","teacher","patient",

                "waitress","bartender","waiter","hairdresser","housekeeper","homemaker","receptionist","diner","housewife","schoolteacher","hostess","prostitute","mom","janitor","fiance"

                "policeman","soldier","gunman","fatally","policemen","assailant","gunned","wounding","attacker","killing","assailants","injuring","guards","attackers","police"

                "nursery","nurseries","cottage","orchard","barn","sunnyside","vine","playground","ivy","elms","sheds","gardening","heronswood","tending","farm",

                "judge","court","attorney","prosecutor","appeals","lawyer","justice","jury","prosecution","judges","magistrate","defendant","supreme","hearing","case",

                "professor","harvard","associate","sociology","emeritus","psychologist","yale","researcher","lecturer","scientist","sociologist","scholar","studied","university","economics",

                "teacher","student","taught","teaches","teaching","graduate","teachers","classmate","tutor","schoolteacher","counselor","colleague","master","school","mentor"

                "plumber","janitor","electrician","tradesman","roofer","newspaperman","landscaper","cabdriver","welder","bricklayer","curmudgeon","tinkerer","layabout","woodworker","storekeeper",

                "technician","technologist","mechanic","engineer","technicians","dentist","paramedic","orthopedic","instructor","lab","specialist","internist","programmer","contractor","welder",

                "roofer","landscaper","softy","chiropractor","manicurist","janitor","doddering","podiatrist","crackhead","ninny","cowhand","plasterer","tinkerer","locksmith","welder",

                "locomotive","driver","cab","mechanic","car","tractor","driving","bicycle","lorry","vehicle","truck","powered","wheel","wagon","carriage",

                "forester","moulton","esmond","gage","atwood","forsythe","huck","stoddard","mundy","parson","oly-2004-box","nell","mcdonell","holden","haslam",

                "soldier","serviceman","wounded","soldiers","guards","prisoner","dead","army","captured","man","slain","victim","sergeant","platoon","escaped",

                "postman","paperboy","bagman","milkman","charlatan","buffoon","bloodsucker","exclaims","cujo","curmudgeon","glorified","knucklehead","drunkard","scoundrel","bookworm",

                "lawyer","attorney","judge","colleague","lawyers","counsel","testified","attorneys","justice","asked","prosecutor","defendant","argued","roberts","pleaded",

                "entrepreneur","brainchild","pioneer","philanthropist","businessman","millionaire","restaurateur","innovator","co-founder","multimillionaire","founder","businesswoman","onetime","consultant","salesman"

                "consultant","consulting","specializes","associate","worked","co","managing","expert","consultants","lobbyist","specialist","psychologist","specializing","hired","marketing",

                "banker","stockbroker","businessman","accountant","financier","trader","onetime","salesman","dealer","entrepreneur","restaurateur","realtor","colleague","broker","billionaire",

                "manager","owner","boss","managing","assistant","ceo","mike","hired","kevin","henderson","ferguson","hughes","executive","keegan","coach",

                "politician","businessman","mp","lawmaker","liberal","jurist","parliamentarian","citizen","colleague","conservative","servant","elected","candidate","prominent","reformer",

                "designer","designers","fashion","klein","stylist","lauren","artist","photography","designing","designs","mcqueen","shoe","costume","vintage","chanel"

                "undertaker","cena","lawler","despero","bredahl","summerslam","zarathos","mcmahon","michaels","pipping","wrestled","headlock","wyrm","cornerman","volthoom"

                "housekeeper","hairdresser","landlady","babysitter","fiance","nanny","fiancé","fiancée","schoolteacher","governess","prostitute","co-worker","barmaid","bartender","receptionist"])
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
        gloveExplorer.setQuickLookUpPath(QUICK_LOOKUP_PATH)
        mirror = mirror_state.MirrorState()
        app.run()
    else:
        if not os.path.exists(glove_path):
            print("Couldn't find path: \n" + glove_path)
        if not os.path.exists(models_path):
            print("Couldn't find path: #\n" + models_path)
        print("Aborted server launch.")
