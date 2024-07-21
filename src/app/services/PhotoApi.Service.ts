import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { enviroment } from '../Enviroments/Enviroment';

@Injectable({
  providedIn: 'root',
})
export class PhotoAPIService {
  httpClient = inject(HttpClient);
  baseUrl = enviroment.baseApiUrl + 'Photo';
  
  upload(files: File[], hotelId: string,roomId:string,restaurantId:string,beachId:string,siteId:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    files.forEach(file => formData.append('files', file));
    formData.append('hotelId', hotelId);
    formData.append('roomId', roomId);
    formData.append('restaurantId', restaurantId);
    formData.append('beachId', beachId);
    formData.append('siteId', siteId);
    // formData.append('tourId', tourId);

    const req = new HttpRequest('POST', `${this.baseUrl}/addListPhoto`, formData, {
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/files`);
  }
  uploadPhotos(files: File[], hotelId: string, roomId: string, restaurantId: string, beachId: string, siteId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    for (let file of files) {
      formData.append('files', file, file.name);
    }
    formData.append('hotelId', hotelId);
    formData.append('roomId', roomId);
    formData.append('restaurantId', restaurantId);
    formData.append('beachId', beachId);
    formData.append('siteId', siteId);

    const req = new HttpRequest('POST', `${this.baseUrl}/addListPhoto`, formData, {
      responseType: 'json',
      reportProgress: true,
    });

    return this.httpClient.request(req);
  }
}
