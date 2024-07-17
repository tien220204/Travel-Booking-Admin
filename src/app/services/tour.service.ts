import { Injectable } from '@angular/core';
import { BaseUrlService } from './base_url.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourAPIService {

  constructor(
    private baseUrlService: BaseUrlService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Tour/findAll'));
  }

  async findById(id: string) {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Tour/find/' + id));
  }

  async create(formData: FormData) {
    return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'Tour/create', formData));
  }

  async update(formData: FormData) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'Tour/update', formData));
  }

  async delete(id: number) {
    return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'Tour/delete/' + id));
  }

  async findAllDeleted() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Tour/findAllDeleted'));
  }

  async recover(id: string) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'Tour/recover/' + id, {}));
  }
}