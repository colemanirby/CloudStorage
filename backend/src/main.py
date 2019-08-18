import os
import json
import logging

from flask import Flask
from flask import request, send_from_directory
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
    file = request.files['file']
    path = request.form['path']
    fileName = file.filename
    
    save_file_path = path + '/' + fileName
    print('saving file to')
    print(path)
    
    print('file.filename')
    file.save(save_file_path)

    return 'Submitted'

@app.route('/download/<string:path>/<string:number>/<string:filename>', methods=['GET'])
def upload_file(path, number, filename):
    print('received Request')
    finalPath = path.replace('&', '/')
    print('finalPath ----: ')
    print(finalPath)
    current_directory = os.getcwd()
    print('current working directory')
    print(current_directory)
    itNumber = int(number)
    if itNumber > 1:
        finalPath = current_directory + finalPath
        print('This should be final path:')
        print(finalPath)
    else:
        finalPath = current_directory
    print('finalPath is')
    print(finalPath)

    return send_from_directory(directory=finalPath, filename=filename)