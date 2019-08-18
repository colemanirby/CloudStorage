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

  callDownloadFile(path: string, num: number,  filename: string) {
    console.log('calling download at');
    console.log('path: ' + path);
    console.log('filename: ' + filename);
    const downloadUrl = API_URL + 'download/' + path + '/' + num + '/' + filename;
    console.log(downloadUrl);
    this.http.get(downloadUrl, {
        responseType: 'arraybuffer'
      }
    ).subscribe(response => this.downloadFile(response, 'application/octet-stream'));
  }

  downloadFile(data: any, type: string) {
    const blob = new Blob([data], {type});
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }


}
