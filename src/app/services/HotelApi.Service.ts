import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { enviroment } from '../Enviroments/Enviroment';
import { AddHotelDTO } from '../DTO/AddHotelDTO.dto';
import { HotelDTO } from '../DTO/HotelDTO.dto';


@Injectable({
  providedIn: 'root',
})
export class HotelAPIService {
  httpClient = inject(HttpClient);
  baseUrl = enviroment.baseApiUrl + 'Hotel';
  async getAll() {
    return lastValueFrom(
      this.httpClient.get(this.baseUrl + '/findAll')
    );
  }
  async add(hotel: AddHotelDTO){
    return lastValueFrom(
      this.httpClient.post(this.baseUrl + '/AddHotel',hotel)
    );
  }
  
  async update(hotel:AddHotelDTO){
    return lastValueFrom(
      this.httpClient.put(this.baseUrl + '/UpdateHotel',hotel)
    );
  }
  async delete(hotelId: number) {
    return lastValueFrom(
      this.httpClient.post(this.baseUrl + '/delete/'+hotelId ,{})
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
  // }
  

}