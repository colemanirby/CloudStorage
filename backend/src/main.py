import os
import json

from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def return_directories():
    directory_array = next(os.walk('./src'))[1]
    json_response = {}
    for directory_name in directory_array:
        json_response['name'] = directory_name

    return json.dumps(json_response)
