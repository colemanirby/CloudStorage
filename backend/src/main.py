import os
import json
import logging

from flask import Flask
from flask import request, send_from_directory, make_response
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
    #Need to start getting directories from selected drives
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
    
    #might need to look into path that's passed in from the ui
    save_file_path = path + '/' + fileName
    print('saving file to')
    print(path)
    
    print('file.filename')
    file.save(save_file_path)

    return 'Submitted'

@app.route('/download/<string:path>/<string:number>/<string:filename>', methods=['GET'])
def upload_file(path, number, filename):
    
    print('received Request')
    
    #when I pass the path through the ui, I can't use / in the url since it will then be
    #Interpereted as a continuation of the path so I use & then replace it with a / on arrival
    #might not be good practice though.
    finalPath = path.replace('&', '/')
    
    print('finalPath ----: ')
    print(finalPath)
    
    #need to get desired drive path here
    #rename to current_drive
    current_directory = os.getcwd()
    print('current working directory')
    print(current_directory)
    
    #I will start to send a 0 if root or a 1 if not
    isRoot = int(number)
    
    if isRoot == 0:
        finalPath = current_directory
    else:
        finalPath = current_directory + finalPath
        print('This should be final path:')
        print(finalPath)
        
        
    file = make_response(send_from_directory(directory=finalPath, filename=filename, as_attachment=True))
    file.headers['File-Name'] = filename
    
    return file