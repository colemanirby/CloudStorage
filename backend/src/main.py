import os

from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def return_directories():
    return next(os.walk('.'))[1]
