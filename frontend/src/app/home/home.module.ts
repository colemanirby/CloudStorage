import {FrontendApiService} from '../frontend-api.service';
import {FrontendModel} from '../frontend.model';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  response: FrontendModel;
  displayedColumns: string[] = ['name'];

  constructor(private frontendApi: FrontendApiService) {
    this.frontendApi.getHelloWorld()
      .subscribe((data: FrontendModel) => {
        this.response = data;
      }, console.error);
  }

  ngOnInit(): void {
    console.log('Response: ' + this.response);
  }
}
