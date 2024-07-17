import { Injectable } from '@angular/core';
import { BaseUrlService } from './base_url.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  constructor(
    private baseUrlService: BaseUrlService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'User/findAll'));
  }

  async findById(id: string) {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'User/find/' + id));
  }

  async create(formData: FormData) {
    return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'User/create', formData));
  }

  async update(formData: FormData) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'User/update', formData));
  }

  async delete(id: number) {
    return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + 'User/delete/' + id));
  }

  async findAllDeleted() {
    return lastValueFrom(this.httpClient.get(this.baseUrlService.BaseUrl + 'User/findAllDeleted'));
  }

  async recover(id: string) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'User/recover/' + id, {}));
  }
}
