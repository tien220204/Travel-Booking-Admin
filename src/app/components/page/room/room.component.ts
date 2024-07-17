import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RoomDto } from '../../../DTO/roomDto.dto';
import { RoomAPIService } from '../../../services/room.service';


@Component({
  selector: 'app-room',
  standalone: true,
  templateUrl: './room.component.html',
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'RoomComponent' }
})
export class RoomComponent implements OnInit {

  rooms: RoomDto[];

  constructor(
    private roomApiService: RoomAPIService
  ) { }

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.roomApiService.findAll().then(
      res => {
        this.rooms = res as RoomDto[];
      },
      err => {
        console.error('Error loading rooms:', err);
      }
    );
  }

  delete(id: string) {
    const result = confirm('Are you sure you want to delete this room?');
    if (result) {
      this.roomApiService.delete(id).then(
        res => {
          if (res) {
            this.loadRooms(); 
          } else {
            alert('Failed to delete room');
          }
        },
        err => {
          console.error('Error deleting room:', err);
          alert('Failed to delete room');
        }
      );
    }
  }

  createRoom(room: RoomDto) {
    const formData = new FormData();
    formData.append('hotelId', room.hotelId.toString());
    formData.append('roomName', room.roomName);
    formData.append('roomDescription', room.roomDescription);
    formData.append('roomPrice', room.roomPrice.toString());
    formData.append('numOfSingleBed', room.numOfSingleBed.toString());
    formData.append('numOfDoubleBed', room.numOfDoubleBed.toString());
    formData.append('isHide', room.isHide.toString());

    this.roomApiService.create(formData).then(
      res => {
        this.loadRooms();
      },
      err => {
        console.error('Error creating room:', err);
      }
    );
  }
}