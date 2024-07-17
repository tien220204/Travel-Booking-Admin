import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { enviroment } from '../Enviroments/Enviroment';


@Injectable({
  providedIn: 'root',
})
export class FlightAPIService {
  httpClient = inject(HttpClient);
  baseUrl = enviroment.baseApiUrl + 'Flight';
  async getAll() {
    return lastValueFrom(
      this.httpClient.get(this.baseUrl + '/getAllFlight')
    );
  }
  // async login(account: AccountLoginDTO) {
  //   return lastValueFrom(
  //     this.httpClient.post(this.baseUrl + '/login', account)
  //   );
  // }
  // async findByUsername(username: string) {
  //   return lastValueFrom(
  //     this.httpClient.get(this.baseUrl + '/findByUsername/'+username)
  //   );
  }
  

