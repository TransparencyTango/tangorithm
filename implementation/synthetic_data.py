#! /usr/bin/env python3

import sys
import csv
import json
import numpy as np

class Dataset_generator:

    labels = [0, 1]

    def __init__(self, jsonfile):
        with open(jsonfile, "r") as json_config:
            self.config_dict = json.load(json_config)
            self.features, self.feature_values_lists, self.probability_lists = self.__read_features_from_config()
            self.base_success_probability, self.biased_data = self.config_dict["base_success_probability"], self.config_dict["biased_data"]

    def __read_features_from_config(self):
        features = []
        feature_values_lists = []
        probability_lists = []
        for f in self.config_dict["features"]:
            configured_probabilities = list(filter(lambda x : x != "default", self.config_dict["features"][f].values()))
            default_probability = (1-sum(configured_probabilities))/(len(self.config_dict["features"][f])-len(configured_probabilities))
            assert default_probability >= 0, "wrong configured json file"
            feature_values = list(self.config_dict["features"][f].keys())
            probabilities = len(feature_values) * [default_probability]
            for i, item in enumerate(feature_values):
                if self.config_dict["features"][f][item] != "default":
                    probabilities[i] = self.config_dict["features"][f][item]
            features.append(f)
            feature_values_lists.append(feature_values)
            probability_lists.append(probabilities)
        return features, feature_values_lists, probability_lists

    def write_to_csv(self, file_name = "synthetic_dataset.csv"):
        with open(file_name, "w") as csv_file:
            writer = csv.writer(csv_file)
            writer.writerow(self.features)
            for i in range(self.config_dict["sample_size"]):
                writer.writerow(self.generate_data())

    def generate_data(self):
        feature_values = [np.random.choice(feature, p=self.probability_lists[i]) for i, feature in enumerate(self.feature_values_lists)]
        label_prob = bias_counter= 0
        for i, feature in enumerate(self.features):
            if feature in self.biased_data and feature_values[i] in self.biased_data[feature]:
                label_prob += float(self.biased_data[feature][feature_values[i]])
                bias_counter += 1
        if bias_counter == 0:
            label_prob = self.base_success_probability
        else:
            label_prob /= bias_counter
        label = np.random.choice(self.labels, p = [(1-label_prob), label_prob])
        feature_values.append(label)
        return feature_values

def main(filename = "dataset_config.json"):
    generator = Dataset_generator(filename)
    generator.write_to_csv()

if __name__ == "__main__":
    if (len(sys.argv) > 1):
        main(sys.argv[1])
    else:
        main()
