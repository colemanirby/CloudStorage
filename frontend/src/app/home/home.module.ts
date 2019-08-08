import {FrontendApiService} from '../frontend-api.service';
import {FrontendModel} from '../frontend.model';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  responseSubscription: Subscription;
  response: FrontendModel;
  displayedColumns: string[] = ['name'];

  constructor(private frontendApi: FrontendApiService) {
  }

  ngOnInit(): void {
    this.responseSubscription = this.frontendApi.getHelloWorld()
      .subscribe((data: FrontendModel) => {
        this.response = data;
      }, console.error);
    console.log('Response: ' + this.response);
  }
  ngOnDestroy() {
    this.responseSubscription.unsubscribe();
  }
}
