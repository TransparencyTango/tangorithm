#! /usr/bin/env python3

from sklearn import svm, preprocessing
import numpy as np
import pandas as pd
from sklearn.svm import SVC

header = pd.read_csv("synthetic_dataset.csv", nrows=1).columns.values
num_features = len(header) - 1
dataset_cvs = pd.read_csv("synthetic_dataset.csv", usecols = [i for i in range(num_features)]).values
decisions = pd.read_csv("synthetic_dataset.csv", usecols = [num_features], squeeze=True).values

class SVMClassifier():
    def __init__(self):
        self.dataset_cvs_encoded, self.label_encoders, self.one_hot_encoder = encode_set_for_svm(dataset_cvs)
        self.clf = SVC(gamma='auto')
        self.clf.fit(self.dataset_cvs_encoded, decisions)

    def decide_on(self, question):
        encoded_question = question
        for i in range(num_features):
            encoded_question[:, i] = self.label_encoders[i].transform(question[:,i])
        encoded_question = self.one_hot_encoder.transform(encoded_question).toarray()
        print(self.clf.predict(encoded_question))



def encode_set_for_svm(dataset_cvs):
    label_encoders = []
    for i in range(num_features):
        label_encoder = preprocessing.LabelEncoder()
        dataset_cvs[:,i] = label_encoder.fit_transform(dataset_cvs[:,i])
        label_encoders.append(label_encoder)
    one_hot_enc = preprocessing.OneHotEncoder()
    dataset_cvs_encoded = one_hot_enc.fit_transform(dataset_cvs).toarray()
    return dataset_cvs_encoded, label_encoders, one_hot_enc

question = np.array([['red', '0-29', 'blue'], ['blond', '30-50', 'yellow'], ['brown', '0-29', 'red']])
svm = SVMClassifier()
svm.decide_on(question)
