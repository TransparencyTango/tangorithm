class MirrorState:

    def __init__(self):
        self.reset_mirror()

    def reset_mirror(self):
        self.is_idle = False
        self.is_introduction = True
        self.is_choice = False
        self.is_turning_point = False
        self.current_match = []
        self.current_matches = []
        self.show_knn, self.show_similarities = True, True
        self.current_knn, self.current_similarities = [], []
        self.last_input = []

    def get_state(self):
        response = {
            "isIdle": str(self.is_idle),
            "isIntroduction": str(self.is_introduction),
            "isChoice": str(self.is_choice),
            "isTurningPoint": str(self.is_turning_point),
            "name": self.current_match,
            "showKNN": str(self.show_knn),
            "showSimilarities": str(self.show_similarities),
            "knns": self.current_knn,
            "similarities": self.current_similarities
        }
        return response
