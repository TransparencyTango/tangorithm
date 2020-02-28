from flask import Flask, render_template
import json

def create_app():
  app = Flask(__name__)

  #todo: read similarities
  with app.open_resource('similarities_keys.json') as f:
    similarities_from_file = json.load(f)

    from . import glove_server
    similarities = glove_server.initialize(similarities_from_file)
    app.register_blueprint(glove_server.bp)

    @app.route("/inputPage")
    def inputPage():
      return render_template('test.html', similarities = similarities)

    @app.route("/mobileIdle")
    def mobileIdlePage():
      return render_template('mobileIdle.html')

    @app.route("/bigScreenStart")
    def getBigScreenStart():
        return render_template('bigScreenStart.html')

  return app
