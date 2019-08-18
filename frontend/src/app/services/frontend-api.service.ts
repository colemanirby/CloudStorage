import {HttpClient, HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_URL} from '../env';
import {DirectoryButtonModel} from '../models/directoryButtonModel';
import {map} from 'rxjs/operators';

@Injectable()
export class FrontendApiService {
  constructor(private http: HttpClient) {

  }

  getFileStructure(): Observable<DirectoryButtonModel> {
    return this.http.get<DirectoryButtonModel>(API_URL);
  }

  upload(data) {
    return this.http.post<any>(API_URL + 'upload', data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return {status: 'progress', message: progress};

        case HttpEventType.Response:
          return event.body;

        default:
          return 'Unhandle event: ${event.type}';
      }
    }));
  }

  downloadFile() {
    console.log('calling download at');
    const downloadUrl = API_URL + 'download';
    console.log(downloadUrl);
    return this.http.get(downloadUrl);
  }


}
