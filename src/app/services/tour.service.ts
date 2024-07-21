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
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Tour/getAllTour'));
  }

  async findById(id: string) {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Tour/getTourDetail/' + id));
  }

  async create(formData: FormData) {
    return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'Tour/AddTour', formData));
  }

  async update(formData: FormData) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'Tour/UpdateTour', formData));
  }

  async delete(id: string) {
    return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'Tour/delete/' + id,{}));
  }

  async findAllDeleted() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Tour/findAllDeleted'));
  }

  async recover(id: string) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'Tour/recover/' + id, {}));
  }
}