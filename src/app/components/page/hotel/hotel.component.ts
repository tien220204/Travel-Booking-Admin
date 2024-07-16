import { Component, OnInit } from '@angular/core';

// import { hotelDto } from '../../../DTO/hotelDTO.DTO';
import { CommonModule } from '@angular/common';

import { HotelAPIService } from '../../../services/HotelApi.Service';
import { ActivatedRoute, Router } from '@angular/router';
import { listHotelDto } from '../../../DTO/listHotelDto.dto';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent implements OnInit {
  page: number = 1;
  pageSize: number = 8;
  totalPages: number = 0;
  totalItems: number = 0;
  
  listhotel : listHotelDto | null = null;
  
  constructor(
    private hotelApiService: HotelAPIService,
    private route: ActivatedRoute,
    private router: Router,
  ){

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'] ? + params['page'] : 1;
      this.loadHotels();
      console.log("page",this.page);
    });

    
  }

  loadHotels() {
    this.hotelApiService.getPaginedHotel(this.page).then(
      (res) => {
        // console.log(res);
        this.listhotel = res as listHotelDto;
        console.log(this.listhotel);
        this.totalPages = this.listhotel.totalPages;
        this.totalItems = this.listhotel.totalItem;
      }, 
      err => {
        console.log(err);
      }
    )
  }
}
