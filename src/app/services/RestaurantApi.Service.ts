import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";
import { enviroment } from "../Enviroments/Enviroment";

@Injectable({
    providedIn: 'root',
  })
  export class RestaurantAPIService {
    httpClient = inject(HttpClient);
    baseUrl = enviroment.baseApiUrl + 'Restaurant';
    async getAll() {
        return lastValueFrom(
          this.httpClient.get(this.baseUrl + '/findAll')
        );
      }
  }
  