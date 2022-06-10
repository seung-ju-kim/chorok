from flask import Flask
from controller.sick_ML import ml
# from dotenv import load_dotenv
import os
# load_dotenv()
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
with app.app_context():
    app.register_blueprint(ml)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000', debug=True)
