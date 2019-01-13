#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import csv

import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import KDTree

# ------------------ Helper functions ---------------------------
def parseGloveFile(gloveFile):
    words = pd.read_table(gloveFile, sep=" ", index_col=0,
                          header=None, quoting=csv.QUOTE_NONE)
    return words


def parseInputFile(path):
    results = {}
    with open(path, "r") as f:
        for line in f:
            if not line or line == "\n":
                continue
            else:
                line = line.lower()
                test_class, tags = line.split(":")
                tags = tags.split(",")
                tags = [tag.strip() for tag in tags]
                results[test_class] = tags
    return results


def removeUnknownTags(known_tags, input_dict):
    cleaned_dict = {}
    removed_dict = {}
    unknown_words = []
    known_words = []
    for key, tags in input_dict.items():
        for tag in tags:
            if (tag in known_tags):
                known_words.append(tag)
            else:
                unknown_words.append(tag)
        if known_words == []:
            print("Removed all words for ", key, "tags: ", tags)
        cleaned_dict[key] = known_words
        removed_dict[key] = unknown_words
        known_words = []
        unknown_words = []
    return removed_dict, cleaned_dict


# ----------------- Basic glove model ----------------
class GloveModel():

    def __init__(self, glove_file_path):
        self.dataframe = parseGloveFile(glove_file_path)
        self.__words = self.dataframe.index.values

    def wordExists(self, word):
        return (word in self.__words)

    def allWordsExist(self, wordList):
        existance_check = [self.wordExists(word) for word in wordList]
        result = all(existance_check)
        return result

    def getExistingWords(self, wordList):
        existing_words = []
        for word in wordList:
            if self.wordExists(word):
                existing_words.append(word)
        return existing_words

    def getWordVector(self, word):
        vector = None
        if (self.wordExists(word)):
            vector = self.dataframe.loc[word].values
        else:
            print("Warning: Word does not exist in model.")
        return vector

    def getWordVectors(self, wordList):
        vectors = []
        if self.allWordsExist(wordList):
            for word in wordList:
                vectors.append(self.getWordVector(word))
            return np.array(vectors)
        else:
            print("Warning: At least one word does not exist in model.")
            return None

    def getWords(self):
        return self.__words

# ---------------------- Glove Explorer ---------------------
class GloveExplorer(GloveModel):

    def __init__(self, glove_file_path, models_path):
        GloveModel.__init__(self, glove_file_path)
        self.__kdTree = KDTree(self.dataframe.values)
        self.__unknownTags, self.__modelDescriptions = \
            self.__setModelDescriptions(models_path)
        self.__modelAverageVectors = self.__setModelAverageVectors()
        self.isReflection, self.currentMatch = False, "default"

    def __setModelDescriptions(self, models_path):
        modelDescriptions = parseInputFile(models_path)
        unknown_tags, modelDescriptions = removeUnknownTags(self.getWords(),
                                                            modelDescriptions)
        self.__modelDescriptions = modelDescriptions
        print("Loaded model descriptions.")
        print("Stored unknown tags. These were dropped during initilization.")
        return unknown_tags, modelDescriptions

    def __setModelAverageVectors(self):
        if not self.__modelDescriptions:
            print("Average vector calculation failed. No models found.")
            print("set model average vector encounters following model descriptions: ", self.__modelDescriptions)
            return None

        avgVectors = None
        for modelName, modelTags in self.__modelDescriptions.items():
            vectors = self.getWordVectors(modelTags)
            avg_vector = np.average(vectors, axis=0)
            if avgVectors is None:
                dims = len(avg_vector)
                avgVectors = pd.DataFrame(columns=range(dims))
            avgVectors.loc[modelName] = avg_vector
        self.__modelAverageVectors = avgVectors
        print("Calculated model average vectors.")
        return avgVectors

    def getDroppedTags(self):
        return self.__unknownTags

    def getKNN(self, k, word):
        if self.wordExists(word):
            word_vector = self.getWordVector(word)
            dist, idx = self.__kdTree.query(word_vector, k=k)
            results = {}
            iteration = 0
            for index in idx[0]:
                results[self.__words[index]] = dist[0, iteration]
                iteration += 1
        else:
            print("Error: Word not found")
            return None
        return results

    def getMatch(self, tags):
        if self.__modelAverageVectors is None:
            print("Missing model average vectors.")
            return None

        tags = [tag.lower() for tag in tags]
        existing_tags = self.getExistingWords(tags)
        if not tags:
            print("Warning: All tags are unknown!")
            return None

        modelAverageVectors = self.__modelAverageVectors.values
        vectors = self.getWordVectors(existing_tags)
        avg_vector = np.average(vectors, axis=0)
        all_avg_vectors = np.vstack([avg_vector, modelAverageVectors])
        cosine_similarities = cosine_similarity(all_avg_vectors)[0][1:]
        max_sim_index = np.argmax(cosine_similarities)
        match = self.__modelAverageVectors.index[max_sim_index]
        self.isReflection = True
        return match

    def bulk_match(self, test_dict):
        if not self.__modelDescriptions:
            print("Model definitions missing.")
            return None

        results = {}
        unknown_tests, test_dict = removeUnknownTags(self.getWords(), test_dict)

        for test_class, tags in test_dict.items():
            if tags == []:
                print("Empty tags for ", test_class)
                print("Test case skipped.")
                continue
            match = self.getMatch(tags)
            results[test_class] = match
        return results
