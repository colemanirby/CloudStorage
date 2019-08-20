import os, stat
import json
import logging

from flask import Flask
from flask import request, send_from_directory, make_response
from flask_cors import CORS
from src.backend_service import FileService

app = Flask(__name__)
CORS(app)
file_service = FileService()
basePath = '/mnt/'
currentExternalHD = 'HDD'
rootPath = basePath + currentExternalHD
os.chmod(rootPath, stat.S_IWOTH)


@app.route('/', methods=['GET'])
def return_directories():
    """For each directory in the directory tree rooted at top (including top
        itself, but excluding '.' and '..'), yields a 3-tuple
        dirpath, dirnames, filenames"""
    
    os_walk = os.walk(basePath + currentExternalHD)

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
    finalPath = path.replace('&', '/').replace(' ', '\ ')
    
    print('finalPath ----: ')
    print(finalPath)
    print('filename')
    print(filename)
    
    #need to get desired drive path here
    #rename to current_drive
        
        
    file = make_response(send_from_directory(directory=finalPath, filename=filename, as_attachment=True))
    file.headers['File-Name'] = filename
    
    return file