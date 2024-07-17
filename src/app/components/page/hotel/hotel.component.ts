import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelAPIService } from '../../../services/HotelApi.Service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ScrollerModule } from 'primeng/scroller';
import { HotelDTO } from '../../../DTO/HotelDTO.dto';
import { facilitiesDTO } from '../../../DTO/facilitiesDTO.dto';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollerModule,DialogModule, ButtonModule, InputTextModule],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'] // Changed 'styleUrl' to 'styleUrls'
})
export class HotelComponent implements OnInit {
 
  
  listhotel: HotelDTO[] = [];
  facilities: string[] = []; // Initialized facilities as an empty array

  constructor(
    private hotelApiService: HotelAPIService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.facilities = [];
    
      
      this.loadHotels();
      
    
  }
  visible: boolean = false;

    showDialog() {
        this.visible = true;
      }

  loadHotels() {
    this.hotelApiService.getAll().then(
      (res) => {
        this.listhotel = res as HotelDTO[];
        
        // this.listhotel.forEach((hotel: HotelDTO) => {
          
        //   hotel.facilities.forEach((faci: facilitiesDTO) => {
        //     this.facilities.push(faci.facilityName);
        //   })
        // });
        this.listhotel.forEach((hotel:HotelDTO) => {
          console.log(hotel);
          hotel.facilities.forEach((facility:facilitiesDTO) => {
            this.facilities.push(facility.facilityName);
          })
        })
      },
      err => {
        console.log(err);
      }
    );
  }
}

