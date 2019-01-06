#!/usr/bin/env python3

import csv

import numpy as np
import pandas as pd
from flask import Flask, request
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import KDTree

GLOVEFILE = "C:/Users/Eduard/Downloads/glove.6B/glove.6B.50d.txt"
glovemodel = None


# ------------------ GLOVE TOOLS ---------------------------
def loadGloveModel(gloveFile):
    words = pd.read_table(gloveFile, sep=" ", index_col=0,
                          header=None, quoting=csv.QUOTE_NONE)
    return words


def create_dataset(dataframe):
    vectors = dataframe.values
    words = dataframe.index.values
    return words, vectors


def getWordVector(dataframe, word):
    vector = dataframe.loc[word].values
    return vector


def getCosineSimilarities(vectors):
    distances = cosine_similarity(vectors)
    return distances


def getEuclideanDistances(vectors):
    m, _ = vectors.shape
    distances = np.zeros((m, m))
    for i in range(m):
        for j in range(m):
            distances[i, j] = np.linalg.norm(vectors[i, :] - vectors[j, :])
    return distances


class GloveModel():

    def __init__(self, glove_file_path):
        self.dataframe = loadGloveModel(glove_file_path)
        self.words = create_dataset(self.dataframe)[0]
        self.vectors = create_dataset(self.dataframe)[1]
        self.__kdTree = KDTree(self.vectors)

    def wordExists(self, word):
        return (word in self.words)

    def getDistances(self, wordList, metric="euclidean"):
        """
        Input: List of strings

        Output: DataFrame with pairwise distances

        metric:
            values: euclidean (default) or cosine
                euclidean -> euclidean distance
                cosine    -> cosine distance
        """
        existing_words = [word for word in wordList if self.wordExists(word)]
        vectors = np.array([getWordVector(self.dataframe, word)
                            for word in existing_words])

        if metric == "euclidean":
            distances = getEuclideanDistances(vectors)
        else:
            distances = getCosineSimilarities(vectors)

        distance_table = pd.DataFrame(distances, index=existing_words)
        distance_table.columns = existing_words
        return distance_table

    def getKNN(self, k, word):
        if self.wordExists(word):
            queries = np.array([getWordVector(self.dataframe, word)])
            dist, idx = self.__kdTree.query(queries, k=k)
            results = {}
            iteration = 0
            for index in idx[0]:
                results[self.words[index]] = dist[0, iteration]
                iteration += 1

        else:
            print("Error: WordNotFound")
            return None

        return results


# ------------------ Server Functions ---------------------------
app = Flask(__name__)


@app.route("/setup")
def setup():
    global glovemodel
    file_path = request.args["path"]
    glovemodel = GloveModel(file_path)
    msg = "Setup successful."
    return msg


@app.route("/getDistances")
def getDistances():
    global glovemodel
    req = request.args["words"]
    if glovemodel:
        wordList = req.split(" ")
        distance_table = glovemodel.getDistances(wordList, metric="cosine")
        msg = str(distance_table.loc[wordList[0]].values[0][1:])
        return msg
    else:
        return ""


# Testing Code for data exploration
# if __name__ == "__main__":
#     glove = GloveModel(GLOVEFILE)
#     while True:
#         wordList = input("Enter list of words separated by space: ")
#         wordList = wordList.split(" ")
#         if wordList[0]:
#             print("\n")
#             print("Euclidean Distances: ")
#             print(glove.getDistances(wordList))
#             print("\n", "Cosine Distances: ")
#             print(glove.getDistances(wordList, metric="cosine"))
#             print("\n")
#             print("kNN for {0}".format(wordList[0]))
#             print(glove.getKNN(100, wordList[0]))
#         else:
#             print("Exiting...")
#             break
