import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { enviroment } from '../Enviroments/Enviroment';
import { FlightDto } from '../DTO/FlightDTO.DTO';


@Injectable({
  providedIn: 'root',
})
export class FlightAPIService {
  httpClient = inject(HttpClient);
  baseUrl = enviroment.baseApiUrl + 'Flight';
  async getAll() {
    return lastValueFrom(
      this.httpClient.get(this.baseUrl + '/findAll')
    );
  }
  async add(flight:FlightDto){
    return lastValueFrom(
      this.httpClient.post(this.baseUrl + '/AddFlight',flight)
    );
  }
  async update(flight:FlightDto){
    return lastValueFrom(
      this.httpClient.put(this.baseUrl + '/UpdateFlight',flight)
    );
  }
  async delete(flightId: number) {
    return lastValueFrom(
      this.httpClient.post(this.baseUrl + '/delete/'+flightId,{})
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
  

