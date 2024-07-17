import { Injectable } from '@angular/core';
import { BaseUrlService } from './base_url.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourPersonQuantityAPIService {

  constructor(
    private baseUrlService: BaseUrlService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'TourPersonQuantity/findAll'));
  }

  async findById(id: string) {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'TourPersonQuantity/find/' + id));
  }

  async create(formData: FormData) {
    return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'TourPersonQuantity/create', formData));
  }

  async update(formData: FormData) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'TourPersonQuantity/update', formData));
  }

  async delete(id: number) {
    return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'TourPersonQuantity/delete/' + id));
  }

}