import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL} from './env';
import {FrontendModel} from './frontend.model';
import {DirectoryModel} from "./directory.model";

@Injectable()
export class FrontendApiService {
  promise: Promise<FrontendModel>;
  response: DirectoryModel[];
  constructor(private http: HttpClient) {

  }

  getHelloWorld(): Promise<FrontendModel> {
    this.promise = new Promise<FrontendModel>((resolve, reject) => {
       this.http.get<FrontendModel>(API_URL).toPromise().then(data => this.response = data.directories);
       console.log('got data');
       resolve();
    });
    return this.promise;
  }


}
