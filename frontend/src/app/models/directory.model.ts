import {FileModel} from "./file.model";

export class DirectoryModel {
  name: string;
  directories: DirectoryModel[];
  files: FileModel[];
}
