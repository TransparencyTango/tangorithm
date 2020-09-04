from flask import Flask
from flask_session import Session

def create_app():
  app = Flask(__name__)
  app.config.from_pyfile('config.py')
  Session(app)

  from . import glove_server
  glove_server.init_glove()
  app.register_blueprint(glove_server.bp)

  return app
