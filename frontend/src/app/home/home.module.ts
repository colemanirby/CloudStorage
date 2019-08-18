import {FrontendApiService} from '../services/frontend-api.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DirectoryButtonModel} from '../models/directoryButtonModel';
import {FileUploader} from 'ng2-file-upload';
import {API_URL} from '../env';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  form: FormGroup;
  error: string;
  uploadResponse = {status: '', message: '', filePath: ''};

  constructor(private frontendApi: FrontendApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.previousData = [];
    this.form = this.formBuilder.group({
      file: ['']
    });
    this.frontendApi.getFileStructure().subscribe(data => {
      this.initialData = data;
      this.currentData = data;
      this.previousData.push(data);
      this.setName(data.name);
      this.dataLoaded = true;
      console.log('Response: ' + JSON.stringify(this.initialData));
    });
  }

  downloadFile(filename: string) {
    console.log('Current directory name:');
    console.log(this.currentData.name);
    const num = this.currentData.name.split('/').length - 2;
    let relativePath = this.currentData.name.replace('./../backend', '');
    console.log('first pass');
    console.log(relativePath);
    relativePath = relativePath.replace(/\//g, '&');
    if (relativePath.length === 0) {
      relativePath = '&';
    }
    console.log('second pass');
    console.log(relativePath);
    this.frontendApi.callDownloadFile(relativePath, num, filename);
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

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('file').value);
    formData.append('path', this.currentData.name);

    this.frontendApi.upload(formData).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );
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
