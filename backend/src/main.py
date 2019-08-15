import os
import json
import logging

from flask import Flask
from flask import request
from flask_cors import CORS
from src.backend_service import FileService

app = Flask(__name__)
CORS(app)
file_service = FileService()


@app.route('/', methods=['GET'])
def return_directories():
    """For each directory in the directory tree rooted at top (including top
        itself, but excluding '.' and '..'), yields a 3-tuple
        dirpath, dirnames, filenames"""
    os_walk = os.walk('./../backend')

    tuplet = next(os_walk)
    json_response = file_service.populate_directories_object({}, tuplet, os_walk)

    print('response:')
    print(json.dumps(json_response))
    return json.dumps(json_response)


@app.route('/upload', methods=['POST'])
def download_file():
    print(request)
    print(request.files)
    return 'Submitted'
