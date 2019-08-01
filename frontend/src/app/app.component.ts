import {Component, OnDestroy, OnInit} from '@angular/core';
import {FrontendApiService} from "./frontend-api.service";
import {FrontendModel} from "./frontend.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
