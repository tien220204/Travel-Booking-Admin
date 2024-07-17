import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { enviroment } from '../Enviroments/Enviroment';
import { BeachDTO } from '../DTO/BeachDTO.dto';


@Injectable({
  providedIn: 'root',
})
export class BeachAPIService {
  httpClient = inject(HttpClient);
  baseUrl = enviroment.baseApiUrl + 'Beach';
  async getAll() {
    return lastValueFrom(
      this.httpClient.get(this.baseUrl + '/findAll')
    );
  }
  async create(beach: BeachDTO){
    return lastValueFrom(
        this.httpClient.post(this.baseUrl + '/addBeach', beach)
      );
  }
  }
  

