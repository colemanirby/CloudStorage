import {FrontendApiService} from '../services/frontend-api.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {DirectoryButtonModel} from '../models/directoryButtonModel';

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

  constructor(private frontendApi: FrontendApiService) {
  }

  ngOnInit(): void {
    this.previousData = [];
    this.frontendApi.getHelloWorld().subscribe(data => {
      this.initialData = data;
      this.currentData = data;
      this.setName(data.name);
      this.previousData.push(data);
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
    this.setName(this.currentData.name)
  }

  setName(name: string): void {
      console.log('name: ');
      console.log(name);
      const replaced = name.replace(/\D\W*/, '');
      console.log('replaced:');
      console.log(replaced);
      this.name = replaced;
  }

  thereIsPreviousData(): boolean {
    return this.previousData.length > 1;
  }

  thereAreDirectories(): boolean {
    return this.currentData.directories.length > 0;
  }

  thereAreFiles(): boolean {
    return this.currentData.directories.length > 0;
  }


  ngOnDestroy() {
    this.responseSubscription.unsubscribe();
  }
}
