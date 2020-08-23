class MirrorState:

    def __init__(self):
        self.reset_mirror()

    def reset_mirror(self):
        self.current_matches = []
        self.current_turning_points = []
        self.last_input = []
