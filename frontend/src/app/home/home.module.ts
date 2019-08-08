import {FrontendApiService} from '../frontend-api.service';
import {FrontendModel} from '../frontend.model';
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {DirectoryModel} from '../directory.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  responseSubscription: Subscription;
  dataSource = new MatTableDataSource<DirectoryModel>();
  displayedColumns: string[] = ['name'];

  constructor(private frontendApi: FrontendApiService) {
  }

  ngOnInit(): void {
    this.frontendApi.getHelloWorld().then(data => {
      this.dataSource.data = data.directories;
    });
    console.log('Response: ' + JSON.stringify(this.dataSource.data));
  }

  ngOnDestroy() {
    this.responseSubscription.unsubscribe();
  }
}
