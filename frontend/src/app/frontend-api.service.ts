import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';
import {API_URL} from "./env";
import {FrontendModel} from "./frontend.model";

@Injectable()
export class FrontendApiService {
  constructor(private http: HttpClient) {

  }

  getHelloWorld(): Observable<FrontendModel> {
    return this.http.get<FrontendModel>('${API_URL}');
  }


}
