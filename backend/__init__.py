from flask import Flask, render_template 

def create_app():
  app = Flask(__name__)
  
  @app.route("/inputPage")
  def inputPage():
    similarities = ["adj1", "adj2"]
    return render_template('index.html', similarities = similarities)
    
  from . import glove_server
  glove_server.init_glove() 
  
  app.register_blueprint(glove_server.bp)
  
  return app

"""  
def get_db():
  if 'db' not in g:
      g.db = sqlite3.connect(
          current_app.config['DATABASE'],
          detect_types=sqlite3.PARSE_DECLTYPES
      )
      g.db.row_factory = sqlite3.Row

  return g.db


parser = argparse.ArgumentParser()
    parser.add_argument("glove_file_path", action="store",
                        help="directory of glove word-embeddings")
    parser.add_argument("models_descriptions_path", action="store",
                        help="path to file with modelname + tags")
    args = parser.parse_args()

    glove_path = args.glove_file_path
    models_path = args.models_descriptions_path
    pos_args_valid = os.path.exists(glove_path) and os.path.exists(models_path)

    if pos_args_valid:
        print("valid")
        gloveExplorer = glove.GloveExplorer(glove_path, models_path)
        gloveExplorer.setQuickLookUpPath(QUICK_LOOKUP_PATH)
        mirror = mirror_state.MirrorState()
        app.run()
    else:
        print("invalid")
        if not os.path.exists(glove_path):
            print("Couldn't find path: \n" + glove_path)
        if not os.path.exists(models_path):
            print("Couldn't find path: #\n" + models_path)
        print("Aborted server launch.")"""