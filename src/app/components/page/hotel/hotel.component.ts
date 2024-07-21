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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationAPIService } from '../../../services/LocationApi.service';
import { JsonResponseDTO } from '../../../DTO/JsonResponeDTO.DTO copy';
import { AddHotelDTO } from '../../../DTO/AddHotelDTO.dto';
// interface DistrictDTO{
//   districtId: number
//   districtName: string
// }
// interface ProvinceDTO{
//   provinceId: number
//   provinceName: string
// }
// interface WardDTO{
//   wardId: number
//   wardName: string
// }
// interface StreetDTO{
//   streetId: number
//   streetName: string
// }



@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollerModule, DialogModule, ButtonModule, InputTextModule, CommonModule, RouterLink, DialogModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'] // Changed 'styleUrl' to 'styleUrls'
})
export class HotelComponent implements OnInit {

  hotelForm: FormGroup;
  listhotel: HotelDTO[] = [];
  facilities: string[] = []; // Initialized facilities as an empty array
  // listDistricts: DistrictDTO[] = [];
  // listProvince: ProvinceDTO[] = [];
  // listWard: WardDTO[] = [];
  // listStreet: StreetDTO[] = [];

  provinceID: number = -1;
  districtId: number = -1;
  wardId: number = -1;
  streetId: number = -1;
  message :string = ''

  constructor(
    private hotelApiService: HotelAPIService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationAPIService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {



    this.loadHotels();
    this.hotelForm = this.fb.group({
      hotelId: ['', Validators.required],
      hotelName: '',
      hotelDescription: '',
      hotelPriceRange: '',
      

      detailLocationNumber: '',


    });

    // this.loadProvince();
    // this.loadDistrict(this.provinceID);
    // this.loadWard(this.districtId);
    // this.loadStreet(this.wardId);

  }


  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  loadHotels() {
    this.hotelApiService.getAll().then(
      (res) => {
        this.listhotel = res as HotelDTO[];


        this.listhotel.forEach((hotel: HotelDTO) => {
          console.log(hotel);
          hotel.facilities.forEach((facility: facilitiesDTO) => {
            this.facilities.push(facility.facilityName);
          })
        })
      },
      err => {
        console.log(err);
      }
    );
  }
  // loadProvince(){
  //   this.locationService.getProvince().then(
  //     (res) => {
  //       this.listProvince = res['result'] as ProvinceDTO[];
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }
  // loadDistrict(provinceId:number){
  //   this.locationService.getDistrict(provinceId).then(
  //     (res) => {
  //       this.listDistricts = res['result'] as DistrictDTO[];
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }
  // loadWard(districtId:number){
  //   this.locationService.getDistrict(districtId).then(
  //     (res) => {
  //       this.listWard = res['result'] as WardDTO[];
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }
  // loadStreet(wardId:number){
  //   this.locationService.getDistrict(wardId).then(
  //     (res) => {
  //       this.listStreet = res['result'] as StreetDTO[];
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }
  addHotel() {
    let formValues = this.hotelForm.value;
    let hotel: AddHotelDTO = {
      hotelId: formValues.hotelId,
      hotelName: formValues.hotelName,
      // arrivalAirportId: formValues.arrivalAirportId,
      hotelDescription: formValues.hotelDescription,
      hotelPriceRange: formValues.hotelPriceRange,
      // hotelLocation:formValues.detailLocationNumber + ' '+ formValues.streetName + ', '+formValues.
      hotelLocation: formValues.detailLocationNumber,
      isHide: false,

    };
    console.log(hotel);
    this.hotelApiService.add(hotel).then(
      (res) => {
        let result: JsonResponseDTO = res as JsonResponseDTO;
        console.log(result.code);
        console.log(result);
        if (result.code == 200) {
          // this.router.navigate(["/confirm-success"], { state: { message: result.msg } });
          this.message = result.msg;
          console.log(this.message);
        }
        // this.loading = false; 
      }
    ).catch((err) => {
      // Xử lý lỗi ở đây
      console.error(err);
      if (err.error) {
        let result: JsonResponseDTO = err.error as JsonResponseDTO;

        this.message = result.msg;
      } else {
        this.message = 'An unexpected error occurred.';
      }
      // this.loading = false; 
    });
    this.hotelForm.reset();
    this.visible = false;
    console.log(this.message);
    alert("Success");

  }
  updateHotel(){
    let formValues = this.hotelForm.value;
    let hotel: AddHotelDTO = {
      hotelId: formValues.hotelId,
      hotelName: formValues.hotelName,
      // arrivalAirportId: formValues.arrivalAirportId,
      hotelDescription: formValues.hotelDescription,
      hotelPriceRange: formValues.hotelPriceRange,
      // hotelLocation:formValues.detailLocationNumber + ' '+ formValues.streetName + ', '+formValues.
      hotelLocation: formValues.detailLocationNumber,
      isHide: true,

    };
    console.log(hotel);
    this.hotelApiService.update(hotel).then(
      (res) => {
        let result: JsonResponseDTO = res as JsonResponseDTO;
        console.log(result.code);
        console.log(result);
        if (result.code == 200) {
          // this.router.navigate(["/confirm-success"], { state: { message: result.msg } });
          alert(result.msg);
        } 
        // this.loading = false; 
      }
    ).catch((err) => {
      // Xử lý lỗi ở đây
      console.error(err);
      if (err.error) {
        let result: JsonResponseDTO = err.error as JsonResponseDTO;
  
        alert(result.msg);
      } else {
        alert('An unexpected error occurred.');
      }
  })
  alert('success')
  
  }
  async deleteHotel(hotelId: number){
    this.hotelApiService.delete(hotelId).then(
      (res) => {
        let result: JsonResponseDTO = res as JsonResponseDTO;
        console.log(result.code);
        console.log(result);
        if (result.code == 200) {
          // this.router.navigate(["/confirm-success"], { state: { message: result.msg } });
          alert(result.msg);
          this.loadHotels();
        } 
        // this.loading = false; 
      }
    ).catch((err) => {
      // Xử lý lỗi ở đây
      console.error(err);
      if (err.error) {
        let result: JsonResponseDTO = err.error as JsonResponseDTO;
  
        alert(result.msg);
      } else {
        alert('An unexpected error occurred.');
      }
  })
  alert('success');
  }
  isEditMode: boolean = false;
  saveHotel() {
    if (this.hotelForm.valid) {
      if (this.isEditMode) {
        this.updateHotel();
      } else {
        this.addHotel();
      }
    }
  }
  openAddDialog() {
    this.isEditMode = false;
    this.hotelForm.reset();
    this.visible = true;
  }

  openEditDialog(hotel: HotelDTO) {
    this.isEditMode = true;

    
    this.hotelForm.patchValue({
      hotelId: hotel.hotelId,
      hotelName: hotel.hotelName,
      hotelDescription: hotel.hotelDescription,
      
      hotelPriceRange: hotel.hotelPriceRange,
      
      detailLocationNumber: hotel.hotelLocation
    });
    this.visible = true;
  }
}

