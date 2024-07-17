import { Injectable } from '@angular/core';
import { BaseUrlService } from './base_url.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteTypeAPIService {

  constructor(
    private baseUrlService: BaseUrlService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'SiteTye/findAll'));
  }

  async findById(id: string) {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'SiteTye/find/' + id));
  }

  async create(formData: FormData) {
    return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'SiteTye/create', formData));
  }

  async update(formData: FormData) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'SiteTye/update', formData));
  }

  async delete(id: string) {
    return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'SiteTye/delete/' + id));
  }

  async findAllDeleted() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'SiteTye/findAllDeleted'));
  }

  async recover(id: string) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'SiteTye/recover/' + id, {}));
  }
}
