import {FrontendApiService} from '../frontend-api.service';
import {FrontendModel} from '../frontend.model';
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material";
import {DirectoryModel} from "../directory.model";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  responseSubscription: Subscription;
  dataSource = new MatTableDataSource<DirectoryModel>();
  displayedColumns: string[] = ['name'];

  constructor(private frontendApi: FrontendApiService) {
  }

  ngOnInit(): void {
    this.callBackend();
    console.log('Response: ' + JSON.stringify(this.dataSource.data));
  }
  async callBackend() {
    await this.frontendApi.getHelloWorld().toPromise().then(data => this.dataSource.data = data.directories);
  }
  ngAfterViewInit() {
    console.log('Response after view: ' + this.dataSource.data);
  }
  ngOnDestroy() {
    this.responseSubscription.unsubscribe();
  }
}
