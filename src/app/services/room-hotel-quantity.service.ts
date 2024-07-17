import { Injectable } from '@angular/core';
import { BaseUrlService } from './base_url.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { RoomHotelQuantityDto } from '../DTO/roomHotelQuantityDto.dto';

@Injectable({
  providedIn: 'root'
})
export class RoomHotelQuantityAPIService {

  constructor(
    private baseUrlService: BaseUrlService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return lastValueFrom(this.httpClient.get<RoomHotelQuantityDto[]>(this.baseUrlService.BaseUrl + 'RoomHotelQuantity/findAll'));
  }

  async findByHotelAndRoom(hotelId: number, roomId: number) {
    return lastValueFrom(this.httpClient.get<RoomHotelQuantityDto>(this.baseUrlService.BaseUrl + `RoomHotelQuantity/find/${hotelId}/${roomId}`));
  }

  async create(formData: FormData) {
    return lastValueFrom(this.httpClient.post(this.baseUrlService.BaseUrl + 'RoomHotelQuantity/create', formData));
  }

  async update(formData: FormData) {
    return lastValueFrom(this.httpClient.put(this.baseUrlService.BaseUrl + 'RoomHotelQuantity/update', formData));
  }

  async delete(hotelId: number, roomId: number) {
    return lastValueFrom(this.httpClient.delete(this.baseUrlService.BaseUrl + `RoomHotelQuantity/delete/${hotelId}/${roomId}`));
  }

  async updateQuantityLeft(hotelId: number, roomId: number, newQuantityLeft: number) {
    return lastValueFrom(this.httpClient.put<RoomHotelQuantityDto>(this.baseUrlService.BaseUrl + `RoomHotelQuantity/updateQuantityLeft/${hotelId}/${roomId}`, { quantityLeft: newQuantityLeft }));
  }
}