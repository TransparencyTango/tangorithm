import os

from flask import Flask, render_template


# ------------------ Server Functions ---------------------------

def create_app():
  app = Flask(__name__)
  @app.route("/inputPage")
  def inputPage():
    return render_template('index.html')
  return app