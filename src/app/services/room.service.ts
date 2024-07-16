import { Injectable } from '@angular/core';
import { BaseUrlService } from './base_url.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private baseUrlService: BaseUrlService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'room/findAll'));
  }

  async create(formData: FormData) {
    return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'room/create', formData));
}
}
