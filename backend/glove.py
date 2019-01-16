#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import csv
import difflib
import os

import numpy as np
import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import KDTree

ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
            "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
            "x", "y", "z"]
AVG_VECTORS_FILE_NAME = "averageVectors.pkl"
MODEL_DESCR_FILE_NAME = "modelDescriptions.pkl"
UNKNOWN_TAGS_FILE_NAME = "unknownTags.pkl"

# ------------------ Helper functions ---------------------------
def parseGloveFile(gloveFile):
    words = pd.read_table(gloveFile, sep=" ", index_col=0,
                          header=None, quoting=csv.QUOTE_NONE)
    words = words.loc[words.index.notnull()]
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
        self.__quickLookUpPath = "."

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

    def setQuickLookUpPath(self, path):
        self.__quickLookUpPath = path

    def getMostSimilarKnownWords(self, wordList):
        wordList = [word.lower() for word in wordList]
        similar_words = []
        for word in wordList:
            if not word:
                continue

            closest_match = None
            first_char = word[0]
            # TODO: make this fail proof
            if os.path.isdir(self.__quickLookUpPath) and first_char in ALPHABET:
                lookup_file_name = first_char + ".txt"
                lookup_path = os.path.join(self.__quickLookUpPath,
                                           lookup_file_name)
                compare_words = []
                with open(lookup_path, "r", encoding="utf-8") as f:
                    compare_words = f.read().split(" ")

                closest_match = difflib.get_close_matches(word, compare_words,
                                                          1, 0.2)
                print("Quick look up on:", word)
            else:
                closest_match = difflib.get_close_matches(word, self.getWords(),
                                                          1, 0.2)
                print("Look up on:", word)

            if closest_match:
                print("Look up on", word, "successful:", closest_match[0])
                similar_words.append(closest_match[0])
        return similar_words

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
        self.currentInputAverageVector = None

    def __setModelDescriptions(self, models_path):
        currentDir = os.getcwd()
        model_descr_path = os.path.join(currentDir, MODEL_DESCR_FILE_NAME)
        unknown_tags_path = os.path.join(currentDir, UNKNOWN_TAGS_FILE_NAME)
        model_path_valid = os.path.isfile(model_descr_path)
        tags_path_valid = os.path.isfile(unknown_tags_path)
        modelDescriptions = None
        unknown_tags = None
        if model_path_valid and tags_path_valid:
            infile1 = open(model_descr_path, "rb")
            infile2 = open(unknown_tags_path, "rb")

            modelDescriptions = pickle.load(infile1)
            print("Loaded model descriptions from disk...")
            unknown_tags = pickle.load(infile2)
            print("Loaded unknown tags from disk...")

            infile1.close()
            infile2.close()
        else:
            modelDescriptions = parseInputFile(models_path)
            unknown_tags, modelDescriptions = removeUnknownTags(self.getWords(),
                                                                modelDescriptions)

            outfile1 = open(model_descr_path, "wb")
            pickle.dump(modelDescriptions, outfile1)
            outfile1.close()

            outfile2 = open(unknown_tags_path, "wb")
            pickle.dump(unknown_tags, outfile2)
            outfile2.close()

            print("Read model descriptions and saved to disk...")
            print("Filtered unknown tags and saved to disk...")

        return unknown_tags, modelDescriptions

    def __setModelAverageVectors(self):
        if not self.__modelDescriptions:
            print("Average vector calculation failed. No models found.")
            return None

        currentDir = os.getcwd()
        avg_vectors_path = os.path.join(currentDir, AVG_VECTORS_FILE_NAME)
        avgVectors = None
        if os.path.isfile(avg_vectors_path):
            avgVectors = pd.read_pickle(avg_vectors_path)
            print("Loaded model average vectors from disk...")
        else:
            for modelName, modelTags in self.__modelDescriptions.items():
                vectors = self.getWordVectors(modelTags)
                avg_vector = np.average(vectors, axis=0)
                if avgVectors is None:
                    dims = len(avg_vector)
                    avgVectors = pd.DataFrame(columns=range(dims))
                avgVectors.loc[modelName] = avg_vector
            avgVectors.to_pickle(AVG_VECTORS_FILE_NAME)
            print("Calculated & saved model average vectors.")
        return avgVectors

    def getDroppedTags(self):
        return self.__unknownTags

    def getKNN(self, k, wordList):
        wordList = self.getMostSimilarKnownWords(wordList)
        if wordList:
            word_vectors = self.getWordVectors(wordList)
            input_avg_vector = np.average(word_vectors, axis=0)
            dist, idx = self.__kdTree.query(input_avg_vector.reshape(1, -1),
                                            k=k)
            results = {}
            iteration = 0
            for index in idx[0]:
                results[self.getWords()[index]] = dist[0, iteration]
                iteration += 1
        else:
            print("Error: All words are unknown.")
            return None
        return results

    def getMatch(self, wordList):
        if self.__modelAverageVectors is None:
            print("Missing model average vectors.")
            return None

        wordList = self.getMostSimilarKnownWords(wordList)
        if not wordList:
            print("Warning: All words are unknown!")
            return None

        modelAverageVectors = self.__modelAverageVectors.values
        vectors = self.getWordVectors(wordList)
        avg_vector = np.average(vectors, axis=0)
        self.currentInputAverageVector = avg_vector
        all_avg_vectors = np.vstack([avg_vector, modelAverageVectors])
        cosine_similarities = cosine_similarity(all_avg_vectors)[0][1:]
        max_sim_index = np.argmax(cosine_similarities)
        match = self.__modelAverageVectors.index[max_sim_index]
        return match

    def bulk_match(self, test_dict):
        if not self.__modelDescriptions:
            print("Model definitions missing.")
            return None

        results = {}
        unknown_tests, test_dict = removeUnknownTags(self.getWords(),
                                                     test_dict)

        for test_class, tags in test_dict.items():
            if tags == []:
                print("Empty tags for ", test_class)
                print("Test case skipped.")
                continue
            match = self.getMatch(tags)
            results[test_class] = match
        return results

    def getSimilarities(self, wordList):
        ref_vector = self.currentInputAverageVector
        if ref_vector is None:
            print("No input vector defined yet.")
            print("Please make a getMatch request first to init this vector")
            return None

        similarities = []
        for word in wordList:
            word = self.getMostSimilarKnownWords([word])
            if word:
                word_vector = self.getWordVector(word[0])
                similarity = cosine_similarity(np.vstack([word_vector,
                                                          ref_vector]))[0][1]
                similarities.append(similarity)
            else:
                # -inf indicates that no word like this was found
                similarities.append(-np.inf)

        return similarities
