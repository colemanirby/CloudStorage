import os, stat
import json

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
    file_name = file.filename

    save_file_path = path + '/' + file_name
    print('saving file to')
    print(path)

    print('file.filename')
    file.save(save_file_path)

    return 'Submitted'


@app.route('/download/<string:path>/<string:number>/<string:filename>', methods=['GET'])
def upload_file(path, number, filename):
    print('received Request')

    final_path = path.replace('&', '/').replace(' ', '\ ')

    print('finalPath ----: ')
    print(final_path)
    print('filename')
    print(filename)

    file = make_response(send_from_directory(directory=final_path, filename=filename, as_attachment=True))
    file.headers['File-Name'] = filename

    return file
