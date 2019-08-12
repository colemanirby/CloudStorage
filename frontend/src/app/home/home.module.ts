import {FrontendApiService} from '../services/frontend-api.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DirectoryButtonModel} from '../models/directoryButtonModel';
import {FileUploader} from 'ng2-file-upload';
import {API_URL} from '../env';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  responseSubscription: Subscription;
  initialData: DirectoryButtonModel;
  currentData: DirectoryButtonModel;
  previousData: DirectoryButtonModel[];
  name: string;
  dataLoaded = false;
  public uploader: FileUploader = new FileUploader({url: API_URL + 'upload', itemAlias: 'file'});

  constructor(private frontendApi: FrontendApiService) {
  }

  ngOnInit(): void {
    this.previousData = [];
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded', item, status, response);
      alert('File uploaded successfully');
    };
    this.frontendApi.getHelloWorld().subscribe(data => {
      this.initialData = data;
      this.currentData = data;
      this.previousData.push(data);
      this.setName(data.name);
      this.dataLoaded = true;
      console.log('Response: ' + JSON.stringify(this.initialData));
    });
  }

  openNextDirectory(directory: DirectoryButtonModel): void {

    const indexOfDirectory = this.currentData.directories.indexOf(directory);
    this.previousData.push(this.currentData);
    this.currentData = this.currentData.directories[indexOfDirectory];
    this.setName(this.currentData.name);
  }

  openPreviousDirectory(): void {
    if (this.previousData.length > 1) {
      this.currentData = this.previousData.pop();
      this.setName(this.currentData.name);
    }
  }

  returnHome(): void {
    this.currentData = this.initialData;
    this.previousData = [];
    this.previousData.push(this.initialData);
    this.setName(this.currentData.name);
  }

  setName(name: string): void {
    console.log('name: ');
    console.log(name);
    if (this.previousData.length > 1) {
      const previousName = this.previousData[this.previousData.length - 1].name;
      const replaced = name.replace(this.previousData[this.previousData.length - 1].name + '/', '');
      console.log('replaced:');
      console.log(replaced);
      this.name = replaced;
    } else {
      const replaced = name.replace(/\D\W*/, '');
      console.log('replaced:');
      console.log(replaced);
      this.name = replaced;
    }
  }

  getDirectoryName(directoryName: string): string {
    const replaced = directoryName.replace(this.currentData.name + '/', '');
    console.log('replaced:');
    console.log(replaced);
    return replaced;
  }

  getPath(): string {
    return this.currentData.name.replace(/\D\W*/, '');
  }


  thereIsPreviousData(): boolean {
    return this.previousData.length > 1;
  }

  thereAreDirectories(): boolean {
    return this.currentData.directories.length > 0;
  }

  thereAreFiles(): boolean {
    return this.currentData.files.length > 0;
  }


  ngOnDestroy() {
    this.responseSubscription.unsubscribe();
  }
}
