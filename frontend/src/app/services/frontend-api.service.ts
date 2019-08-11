import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL} from '../env';
import {DirectoryButtonModel} from "../models/directoryButtonModel";

@Injectable()
export class FrontendApiService {
  constructor(private http: HttpClient) {

  }

  getHelloWorld(): Observable<DirectoryButtonModel> {
     return this.http.get<DirectoryButtonModel>(API_URL);
  }


}
