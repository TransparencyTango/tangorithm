from flask import Flask

def create_app():
  app = Flask(__name__)

  from . import glove_server
  glove_server.init_glove()
  app.register_blueprint(glove_server.bp, url_prefix='/api')

  return app
