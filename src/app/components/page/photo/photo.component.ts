import { Component, OnInit } from '@angular/core';
import { PhotoAPIService } from '../../../services/PhotoApi.Service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, NgModel } from '@angular/forms';
import { HotelAPIService } from '../../../services/HotelApi.Service';
import { BeachAPIService } from '../../../services/BeachApi.Service';
import { RoomAPIService } from '../../../services/room.service';
import { HotelDTO } from '../../../DTO/HotelDTO.dto';
import { BeachDTO } from '../../../DTO/BeachDTO.dto';
import { RestaurantAPIService } from '../../../services/RestaurantApi.Service';
import { RoomDto } from '../../../DTO/roomDto.dto';
import { restaurantDTO } from '../../../DTO/RestaurantDto.DTO';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';


@Component({
  standalone:true,
  selector: 'app-photo-upload',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  imports:[FormsModule,ButtonModule, DropdownModule,FileUploadModule, ToastModule, CommonModule],
})
export class PhotoComponent implements OnInit {
  listHotel: HotelDTO[] ;
  listBeach:BeachDTO[] ;
  listRestaurant:restaurantDTO[] ;
  listRoom: RoomDto[];
  selectedFiles: File[] = [];
  hotelId: '-1';
  roomID: '-1';
  restaurantId: '-1' ;
  beachID: '-1';
  siteId: '-1 ';
  addPhotoForm: FormGroup
  constructor(
    private photoAPIService: PhotoAPIService,
    private hotelApiService: HotelAPIService,
    private beachApiService: BeachAPIService,
    private roomApiService: RoomAPIService,
    private restaurantApiService: RestaurantAPIService,
    
  ) {}
  ngOnInit(): void {
    
    this.getHotel();
    this.getBeach();
    this.getRestaurant();
    this.getRoom();
  }

  onFileChange(event: any): void {
    // Kiểm tra cấu trúc của event
    console.log('Event:', event);
    console.log('Current files:', event.currentFiles);
  
    if (event && event.currentFiles) {
      this.selectedFiles = event.currentFiles;
      console.log('Selected files:', this.selectedFiles);
    } else {
      console.error('Event or event.currentFiles is undefined');
    }
  }
  

  uploadPhotos(): void {
    if (this.selectedFiles.length === 0 ) {
      alert('Please select files and enter a Hotel ID.');
      return;
    }
    if ( !this.hotelId ) {
      this.hotelId = "-1"
    }
    if ( !this.roomID ) {
      this.roomID = "-1"
    }
    if ( !this.restaurantId ) {
      this.restaurantId = "-1"
    }
    if ( !this.beachID ) {
      this.beachID = "-1"
    }
    if ( !this.siteId ) {
      this.siteId = "-1 "
    }

    this.photoAPIService.upload(this.selectedFiles, this.hotelId,this.roomID,this.restaurantId,this.beachID,this.siteId).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(this.hotelId);
        } else if (event instanceof HttpResponse) {
          console.log('Upload complete', event.body);
        }
      },
      (error) => {
        console.error('Upload error', error);
      }
    );
  } 
  getHotel():void {
    this.hotelApiService.getAll().then(
      (res) => {
        this.listHotel = res as HotelDTO[];
      },
      err => {
        console.log(err);
      }
    );
  }
  getBeach():void {
    this.beachApiService.getAll().then(
      (res) => {
        this.listBeach = res as BeachDTO[];
      },
      err => {
        console.log(err);
      }
    );
  }
  getRestaurant():void {
    this.restaurantApiService.getAll().then(
      (res) => {
        this.listRestaurant = res as restaurantDTO[];
      },
      err => {
        console.log(err);
      }
    );
  }
  getRoom():void {
    this.roomApiService.findAll().then(
      (res) => {
        this.listRoom = res as RoomDto[];
      },
      err => {
        console.log(err);
      }
    );
  }

}
