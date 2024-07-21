import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { enviroment } from '../Enviroments/Enviroment';


@Injectable({
  providedIn: 'root',
})
export class LocationAPIService {
  httpClient = inject(HttpClient);
  baseUrl = enviroment.baseApiUrl + 'Location';
  async add() {
    return lastValueFrom(
      this.httpClient.get(this.baseUrl + '/addLocation')
    );
  }
  async getProvince() {
    return lastValueFrom(
      this.httpClient.get(this.baseUrl + '/findAllProvince')
    );
  }
  async getDistrict( provinceId:number) {
    return lastValueFrom(
      this.httpClient.get(this.baseUrl + '/findAllDistrict/' + provinceId)
    );
  }
  async getWard(districtId:number) {
    return lastValueFrom(
      this.httpClient.get(this.baseUrl + '/findAllWard/' + districtId)
    );
  }
  async getStreet(wardId:number) {
    return lastValueFrom(
      this.httpClient.get(this.baseUrl + '/findAllWard/' + wardId)
    );
  }

}