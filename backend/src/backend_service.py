import json
import os


class FileService:

    def populate_directories_object(self, node, tuplet, os_walk):
        node['name'] = tuplet[0]
        node['files'] = self.populateFilesArray([], tuplet[2])
        new_directories_array = []
        for directory in tuplet[1]:
            new_directories_array.append(self.populate_directories_object({}, next(os_walk), os_walk))
        node['directories'] = new_directories_array
        return node

    def populateFilesArray(self, file_node, files):
        for file in files:
            file = {'name': file}
            file_node.append(file)
        return file_node