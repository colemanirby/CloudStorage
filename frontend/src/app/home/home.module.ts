import {FrontendApiService} from '../frontend-api.service';
import {FrontendModel} from '../frontend.model';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  response: FrontendModel;

  constructor(private frontendApi: FrontendApiService) {
  }

  ngOnInit(): void {
    this.frontendApi.getHelloWorld()
      .subscribe((data: FrontendModel) => {
        this.response = data;
      }, console.error);
  }
}
