import os
import json

from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def return_directories():
    directory_array = next(os.walk('./src'))[1]
    directories = []
    json_response = {}
    i=0
    for directory_name in directory_array:
        directory = {}
        directory['name'] = directory_name
        directories.append(directory)
        i = i+1
    json_response['directories'] = directories
        
    print(json.dumps(json_response))
    return json.dumps(json_response)
