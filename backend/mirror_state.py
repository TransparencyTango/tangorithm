class MirrorState:

    def __init__(self):
        self.reset_mirror()

    def reset_mirror(self):
        self.is_reflection = False
        self.current_match = "default"
        self.show_knn, self.show_similarities = False, True
        self.current_knn, self.current_similarities = [], []

    def get_state(self):
        response = {
            "isReflection": str(self.is_reflection),
            "name": self.current_match,
            "showKNN": str(self.show_knn),
            "showSimilarities": str(self.show_similarities),
            "knns": self.current_knn,
            "similarities": self.current_similarities
        }
        return response
