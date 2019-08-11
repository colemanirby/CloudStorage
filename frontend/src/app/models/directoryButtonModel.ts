import {FileModel} from "./file.model";

export class DirectoryButtonModel {
  name: string;
  directories: DirectoryButtonModel[];
  files: FileModel[];
}
