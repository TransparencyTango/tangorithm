#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

import glove

PATH_TO_GLOVE_FILE = \
    "C:/Users/Eduard Gette/Downloads/glove.6B/glove.6B.50d.txt"


# --------------- Helper functions -------------------------------
def containsNoNumber(word):
    result = (re.search("\d", word) is None)
    return result


def startsWithLetterOfAlphabet(word):
    alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l",
                "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
                "x", "y", "z"]
    if word:
        return word[0] in alphabet
    else:
        return False


def filterData(conditionFunctions, data):
    for conditionFunction in conditionFunctions:
        data = filter(conditionFunction, data)
    return data


def splitWordsByFirstChar(words, saveToDisk=False):
    splitDict = {}
    for word in words:
        first_char = word[0]
        key_exists = splitDict.get(first_char)
        if key_exists:
            splitDict[first_char] += (" " + word)
        else:
            splitDict[first_char] = word

    if saveToDisk:
        for first_char, words in splitDict.items():
            file_name = first_char + ".txt"

            if os.path.isfile(file_name):
                warning_msg = "File with name {0} already exists. Skipping..."
                print(warning_msg.format(file_name))
                continue

            with open(file_name, 'w', encoding="utf-8") as f:
                f.write(words)

    return splitDict


def cleanWordEmbeddingData(path):
    file_name = os.path.basename(path)
    cleaned_file_name = "cleaned_" + file_name

    with open(path, "r", encoding="utf-8") as f:
        if os.path.isfile(cleaned_file_name):
            print("File alreay exists.")
            return None

        with open(cleaned_file_name, "w", encoding="utf-8") as new_f:
            for line in f:
                if not line:
                    continue

                word = line.split(" ")[0]

                if type(word) != str:
                    print(word)
                    continue

                noNumbers = containsNoNumber(word)
                startsWithLetter = startsWithLetterOfAlphabet(word)
                if noNumbers and startsWithLetter:
                    new_f.write(line)
    print("Glove file succesfully cleaned.")


if __name__ == "__main__":
    g_path = PATH_TO_GLOVE_FILE
    g = glove.GloveModel(g_path)
    all_g_words = [word.lower() for word in g.getWords()]

    filtered_words = filterData([containsNoNumber, startsWithLetterOfAlphabet],
                                all_g_words)

    splitted_words = splitWordsByFirstChar(filtered_words, saveToDisk=True)
    cleanWordEmbeddingData(g_path)
