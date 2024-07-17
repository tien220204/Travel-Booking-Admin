import { Injectable } from '@angular/core';
import { BaseUrlService } from './base_url.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteAPIService {

  constructor(
    private baseUrlService: BaseUrlService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Site/findAll'));
  }

  async findById(id: string) {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Site/find/' + id));
  }

  async create(formData: FormData) {
    return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'Site/create', formData));
  }

  async update(formData: FormData) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'Site/update', formData));
  }

  async delete(id: string) {
    return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'Site/delete/' + id));
  }

  async findAllDeleted() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'Site/findAllDeleted'));
  }

  async recover(id: string) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'Site/recover/' + id, {}));
  }
}
