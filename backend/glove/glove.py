#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import csv
import difflib
import os
import pickle

import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import KDTree

ALPHABET = {"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
            "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
            "x", "y", "z"}

AVG_VECTORS_FILE_1_NAME = "averageVectors1.pkl"
AVG_VECTORS_FILE_2_NAME = "averageVectors2.pkl"
AVG_VECTORS_FILE_3_NAME = "averageVectors3.pkl"

MODEL_DESCR_FILE_1_NAME = "modelDescriptions1.pkl"
MODEL_DESCR_FILE_2_NAME = "modelDescriptions2.pkl"
MODEL_DESCR_FILE_3_NAME = "modelDescriptions3.pkl"
UNKNOWN_TAGS_FILE_NAME = "unknownTags.pkl"

STRING_MATCHING_CUTOFF = 0.5
NUM_CLUSTERS = 10


# ------------------ Helper functions ---------------------------
def parseGloveFile(gloveFile):
    print(gloveFile)
    words = pd.read_table(gloveFile, sep=" ", index_col=0,
                          header=None, quoting=csv.QUOTE_NONE)
    words = words.loc[words.index.notnull()]
    return words


def parseInputFile(path):
    results = {}
    with open(path, "r",encoding='utf-8-sig') as f:
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
            print("WARNING: Removed all words for ", key, "tags: ", tags)
        cleaned_dict[key] = known_words
        removed_dict[key] = unknown_words
        known_words = []
        unknown_words = []
    return removed_dict, cleaned_dict


def allFilesExist(filePaths):
    file_checks = [os.path.isfile(filePath) for filePath in filePaths]
    return all(file_checks)


def getFilePaths(path, fileNames, filesEnding):
    filePaths = [os.path.join(path, fileName + filesEnding)
                 for fileName in fileNames]
    return filePaths


def getWordsFromFile(filePath):
    try:
        f = open(filePath, "r", encoding="utf-8")
    except (IOError, OSError) as e:
        print("Couldn't open file:", filePath)
        return None

    words = f.read().split(" ")
    f.close()
    return words

def getPickleDirPath():
    moduleDir = os.path.dirname(os.path.abspath(__file__))
    pkl_path = os.path.join(moduleDir, "pkl-files")
    if not os.path.exists(pkl_path):
        os.makedirs(pkl_path)
    return pkl_path

# ----------------- Basic glove model ----------------
class GloveModel():

    def __init__(self, glove_file_path):
        self.dataframe = parseGloveFile(glove_file_path)
        self.__words = self.dataframe.index.values
        self.__wordSet = set(self.__words)
        self.__quickLookUpPath = None
        self.similarWordsCache = []

    def wordExists(self, word):
        return (word in self.__wordSet)

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
        lookupFilePaths = getFilePaths(path,
                                       ALPHABET,
                                       ".txt")
        lookupPathIsValid = allFilesExist(lookupFilePaths)

        if lookupPathIsValid:
            self.__quickLookUpPath = path
        else:
            print("Not a valid lookup directory.")
            print("Valid directories must contain the following files: ")
            print("[a.txt, b.txt, ..., z.txt]")

    def getMostSimilarKnownWord(self, word):
        word = word.lower()

        if not word:
            return None

        # Try find it in O(1) in the word data
        if self.wordExists(word):
            return word

        # If couldn't be found in word data try finding something similar
        first_char = word[0]
        first_char_is_valid = first_char in ALPHABET
        compare_words = None
        # First try to find similar match in preselected data for speedup
        if first_char_is_valid and self.__quickLookUpPath:
            lookupPath = os.path.join(self.__quickLookUpPath,
                                      first_char + ".txt")
            compare_words = getWordsFromFile(lookupPath)
            if not compare_words:
                compare_words = self.getWords()
        # If no preselected data found, look through entire data
        else:
            compare_words = self.getWords()

        closest_match = difflib.get_close_matches(word, compare_words,
                                                  1, STRING_MATCHING_CUTOFF)

        if closest_match:
            closest_match = closest_match[0]
            print("Similarity look-up on >>", word, "<< successful:",
                  closest_match)
            return closest_match
        else:
            print("No match found for word:", word)
            return None

    def getMostSimilarKnownWords(self, wordList):
        matches = []

        for word in wordList:
            closest_match = self.getMostSimilarKnownWord(word)

            if closest_match:
                matches.append(closest_match)
        self.similarWordsCache = matches
        return matches

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

    def __init__(self, glove_file_path, models_path_1, models_path_2, models_path_3):
        GloveModel.__init__(self, glove_file_path)
        self.__kdTree = KDTree(self.dataframe.values)
        self.__unknownTags, self.__modelDescriptions = \
            self.__setModelDescriptions(models_path_1, models_path_2, models_path_3)
        self.__modelAverageVectorsList = self.__setModelAverageVectors()
        '''
        kMeans = []
        for avgVector in self.__modelAverageVectorsList:
            new_element = KMeans(n_clusters=NUM_CLUSTERS, random_state=0).fit(avgVector)
            kMeans.append(new_element)
        self.__kMeansList = kMeans
        '''
        self.currentInputAverageVector = None

    def __setModelDescriptions(self, models_path_1, models_path_2, models_path_3):
        pkl_path = getPickleDirPath()
        model_descr_path_1 = os.path.join(pkl_path, MODEL_DESCR_FILE_1_NAME)
        model_descr_path_2 = os.path.join(pkl_path, MODEL_DESCR_FILE_2_NAME)
        model_descr_path_3 = os.path.join(pkl_path, MODEL_DESCR_FILE_3_NAME)
        unknown_tags_path = os.path.join(pkl_path, UNKNOWN_TAGS_FILE_NAME)
        model_path_valid = os.path.isfile(model_descr_path_1) and os.path.isfile(model_descr_path_2) and os.path.isfile(model_descr_path_3)
        tags_path_valid = os.path.isfile(unknown_tags_path)
        modelDescriptions = None
        unknown_tags = None
        if model_path_valid and tags_path_valid:
            infile1 = open(model_descr_path_1, "rb")
            infile2 = open(model_descr_path_2, "rb")
            infile3 = open(model_descr_path_3, "rb")

            infileUnknown = open(unknown_tags_path, "rb")

            modelDescriptions_1 = pickle.load(infile1)
            modelDescriptions_2 = pickle.load(infile2)
            modelDescriptions_3 = pickle.load(infile3)
            print("Loaded model descriptions from disk...")
            unknown_tags = pickle.load(infileUnknown)
            print("Loaded unknown tags from disk...")

            infile1.close()
            infile2.close()
            infile3.close()

            infileUnknown.close()
        else:
            modelDescriptions_1 = parseInputFile(models_path_1)
            modelDescriptions_2 = parseInputFile(models_path_2)
            modelDescriptions_3 = parseInputFile(models_path_3)
            unknown_tags, modelDescriptions_1 = \
                removeUnknownTags(self.getWords(), modelDescriptions_1)
            unknown_tags_2, modelDescriptions_2 = \
                removeUnknownTags(self.getWords(), modelDescriptions_2)
            unknown_tags.update(unknown_tags_2)
            unknown_tags_3, modelDescriptions_3 = \
                removeUnknownTags(self.getWords(), modelDescriptions_3)
            unknown_tags.update(unknown_tags_3)

            for path, description in zip([model_descr_path_1,model_descr_path_2,model_descr_path_3], [modelDescriptions_1, modelDescriptions_2, modelDescriptions_3]):
              outfile1 = open(path, "wb")
              pickle.dump(description, outfile1)
              outfile1.close()

            outfile2 = open(unknown_tags_path, "wb")
            pickle.dump(unknown_tags, outfile2)
            outfile2.close()

            print("Read model descriptions and saved to disk...")
            print("Filtered unknown tags and saved to disk...")

        return unknown_tags, [modelDescriptions_1, modelDescriptions_2, modelDescriptions_3]

    def __setModelAverageVectors(self):
        if not (self.__modelDescriptions[0] and self.__modelDescriptions[1] and self.__modelDescriptions[2]):
            print("Average vector calculation failed. No models found.")
            return None
        avgVectors = []
        pkl_path = getPickleDirPath()

        avg_file_names = [AVG_VECTORS_FILE_1_NAME, AVG_VECTORS_FILE_2_NAME, AVG_VECTORS_FILE_3_NAME]

        for avg_vector_file_name, modelDescriptionsDict in zip(avg_file_names, self.__modelDescriptions):
            avg_vectors_path = os.path.join(pkl_path, avg_vector_file_name)
            print(avg_vectors_path)
            if os.path.isfile(avg_vectors_path):
                avgVectors.append(pd.read_pickle(avg_vectors_path))
                print("Loaded model average vectors from disk from..." + avg_vector_file_name)
            else:
                current_avg_vec = self.getAndSaveAvgVectorForModelDescriptions(modelDescriptionsDict, avg_vectors_path)
                avgVectors.append(current_avg_vec)
        return avgVectors

    def getAndSaveAvgVectorForModelDescriptions(self, modelDescriptionsDict, file_name):
        avgVectors = None
        for modelName, modelTags in modelDescriptionsDict.items():
            vectors = self.getWordVectors(modelTags)
            avg_vector = np.average(vectors, axis=0)
            if avgVectors is None:
                dims = len(avg_vector)
                avgVectors = pd.DataFrame(columns=range(dims))
            avgVectors.loc[modelName] = avg_vector
        avgVectors.to_pickle(file_name)
        print("Calculated & saved model average vectors in ..." + file_name)
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
        if self.__modelAverageVectorsList is None:
            print("Missing model average vectors.")
            return None

        wordList = self.getMostSimilarKnownWords(wordList)
        if not wordList:
            print("Warning: All words are unknown!")
            return None

        wordList_vectors = self.getWordVectors(wordList)
        wordList_avg_vector = np.average(wordList_vectors, axis=0)
        self.currentInputAverageVector = wordList_avg_vector

        matches = []
        '''for model_avg_vector, kMeans in zip(self.__modelAverageVectorsList, self.__kMeansList):
            matches.append(getMatchWithKMeans(self, self.currentInputAverageVector, avg_vectors, kMeans))'''
        for model_avg_vector in self.__modelAverageVectorsList:
            all_avg_vectors = np.vstack([wordList_avg_vector, model_avg_vector])
            cosine_similarities = cosine_similarity(all_avg_vectors)[0][1:]
            max_sim = np.amax(cosine_similarities)
            max_sim_index = np.argmax(cosine_similarities)
            print(max_sim_index)
            matches.append([model_avg_vector.index[max_sim_index], max_sim])
        return matches

    def getTwoMatches(self, wordList):
        if self.__modelAverageVectorsList is None:
            print("Missing model average vectors.")
            return None

        wordList = self.getMostSimilarKnownWords(wordList)
        if not wordList:
            print("Warning: All words are unknown!")
            return None

        wordList_vectors = self.getWordVectors(wordList)
        wordList_avg_vector = np.average(wordList_vectors, axis=0)
        self.currentInputAverageVector = wordList_avg_vector

        matches = []

        for model_avg_vector in self.__modelAverageVectorsList:
            all_avg_vectors = np.vstack([wordList_avg_vector, model_avg_vector])
            cosine_similarities = cosine_similarity(all_avg_vectors)[0][1:]
            #max_sim = np.amax(cosine_similarities)
            #max_sim_index = np.argmax(cosine_similarities)
            max_sims_indices = np.argpartition(cosine_similarities, -2)[-2:]
            max_sims_indices = max_sims_indices[np.argsort(cosine_similarities[max_sims_indices])]
            max_sims = cosine_similarities[max_sims_indices]
            the_matches = [model_avg_vector.index[index] for index in max_sims_indices]
            matches.append([the_matches, max_sims])
        return matches

    '''
    def getMatchWithKMeans(self, wordListVector, avg_vectors, kMeans):
        modelAverageVectors = avg_vectors.values

        closest_cluster = kMeans.predict([wordListVector])[0]
        cluster_mask = kMeans.labels_ == closest_cluster
        non_zero_idx = np.nonzero(cluster_mask)
        cluster_modelVectors = modelAverageVectors[cluster_mask]
        all_avg_vectors = np.vstack([wordListVector, cluster_modelVectors])
        cosine_similarities = cosine_similarity(all_avg_vectors)[0][1:]
        max_sim_index = non_zero_idx[0][np.argmax(cosine_similarities)]
        match = self.avg_vectors.index[max_sim_index]
        return match
        # modelAverageVectors = self.__modelAverageVectors.values
        # vectors = self.getWordVectors(wordList)
        # avg_vector = np.average(vectors, axis=0)
        # self.currentInputAverageVector = avg_vector
        # all_avg_vectors = np.vstack([avg_vector, modelAverageVectors])
        # cosine_similarities = cosine_similarity(all_avg_vectors)[0][1:]
        # max_sim_index = np.argmax(cosine_similarities)
        # match = self.__modelAverageVectors.index[max_sim_index]
        # return match
    '''

    def bulk_match(self, test_dict):
        if not (self.__modelDescriptions[0] and self.__modelDescriptions[1] and self.__modelDescriptions[2]):
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
        currentInput = self.similarWordsCache
        print("currentInput")
        print(currentInput)
        for word in wordList:
            word = self.getMostSimilarKnownWord(word)
            if word:
                #word_vector = self.getWordVector(word[0])
                word_vector = self.getWordVector(word)
                similarity = cosine_similarity(np.vstack([word_vector,
                                                          ref_vector]))[0][1]
                similarities.append(similarity)
            else:
                # None indicates that no word like this was found
                similarities.append(None)

        return similarities
