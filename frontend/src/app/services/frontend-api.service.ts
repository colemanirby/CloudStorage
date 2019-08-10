import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL} from '../env';
import {DirectoryModel} from "../models/directory.model";

@Injectable()
export class FrontendApiService {
  constructor(private http: HttpClient) {

  }

  getHelloWorld(): Observable<DirectoryModel> {
     return this.http.get<DirectoryModel>(API_URL);
  }


}
