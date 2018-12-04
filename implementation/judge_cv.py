from sklearn import svm, preprocessing
import numpy as np
from sklearn.svm import SVC

dataset_cvs = np.array([
                ['black', '0-29'],
                ['brown', '30-49'],
                ['blond', '50+'],
                ['white', '50+'],
                ['red', '50+']])
decisions = np.array([1,1,1,1,0])
        
class SVMClassifier():
    def __init__(self):
        self.dataset_cvs_encoded, self.label_encoder_color, self.label_encoder_age, self.one_hot_encoder = encode_set_for_svm(dataset_cvs)
        self.clf = SVC(gamma='auto')
        self.clf.fit(self.dataset_cvs_encoded, decisions)
        
    def decide_on(self, question):
        encoded_question = question
        encoded_question[:, 0] = self.label_encoder_color.transform(question[:, 0])
        encoded_question[:, 1] = self.label_encoder_age.transform(question[:, 1])
        encoded_question = self.one_hot_encoder.transform(encoded_question).toarray()
        print(self.clf.predict(encoded_question))
        
        

def encode_set_for_svm(dataset_cvs):
    label_encoder_color = preprocessing.LabelEncoder()
    dataset_cvs[:, 0] = label_encoder_color.fit_transform(dataset_cvs[:, 0])
    label_encoder_age = preprocessing.LabelEncoder()
    dataset_cvs[:, 1] = label_encoder_age.fit_transform(dataset_cvs[:, 1])
    one_hot_enc = preprocessing.OneHotEncoder()
    dataset_cvs_encoded = one_hot_enc.fit_transform(dataset_cvs).toarray()
    return dataset_cvs_encoded, label_encoder_color, label_encoder_age, one_hot_enc
    
question = np.array([['red', '0-29']])
svm = SVMClassifier()
svm.decide_on(question)


