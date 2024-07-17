import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RoomHotelQuantityDto } from '../../../DTO/roomHotelQuantityDto.dto';
import { RoomHotelQuantityAPIService } from '../../../services/room-hotel-quantity.service';

@Component({
  selector: 'app-room-hotel-quantity',
  standalone: true,
  templateUrl: './room-hotel-quantity.component.html',
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'RoomHotelQuantityComponent' }
})
export class RoomHotelQuantityComponent implements OnInit {

  roomHotelQuantities: RoomHotelQuantityDto[];

  constructor(
    private roomHotelQuantityApiService: RoomHotelQuantityAPIService
  ) { }

  ngOnInit() {
    this.loadRoomHotelQuantities();
  }

  loadRoomHotelQuantities() {
    this.roomHotelQuantityApiService.findAll().then(
      res => {
        this.roomHotelQuantities = res as RoomHotelQuantityDto[];
      },
      err => {
        console.error('Error loading room hotel quantities:', err);
      }
    );
  }

  delete(hotelId: number, roomId: number) {
    const result = confirm('Are you sure you want to delete this room hotel quantity?');
    if (result) {
      this.roomHotelQuantityApiService.delete(hotelId, roomId).then(
        res => {
          if (res) {
            this.loadRoomHotelQuantities(); 
          } else {
            alert('Failed to delete room hotel quantity');
          }
        },
        err => {
          console.error('Error deleting room hotel quantity:', err);
          alert('Failed to delete room hotel quantity');
        }
      );
    }
  }

  createRoomHotelQuantity(roomHotelQuantity: RoomHotelQuantityDto) {
    const formData = new FormData();
    formData.append('hotelId', roomHotelQuantity.hotelId.toString());
    formData.append('roomId', roomHotelQuantity.roomId.toString());
    formData.append('quantityLeft', roomHotelQuantity.quantityLeft.toString());

    this.roomHotelQuantityApiService.create(formData).then(
      res => {
        this.loadRoomHotelQuantities();
      },
      err => {
        console.error('Error creating room hotel quantity:', err);
      }
    );
  }
}
