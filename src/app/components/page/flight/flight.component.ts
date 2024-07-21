import { Component, OnInit } from '@angular/core';
import { FlightAPIService } from '../../../services/FlightApi.Service';
import { FlightDto } from '../../../DTO/FlightDTO.DTO';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AirportDto } from '../../../DTO/airportDto.dto';
import { AirportApiService } from '../../../services/airportApi.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { JsonResponseDTO } from '../../../DTO/JsonResponeDTO.DTO copy';


@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [CommonModule,RouterLink,DialogModule, ButtonModule, InputTextModule,FormsModule,DropdownModule,CalendarModule,ReactiveFormsModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {
  listFlight : FlightDto[] | null = null;
  listAirports : AirportDto[] | null = null;
  
 
  flightForm: FormGroup;
  constructor(private flightService: FlightAPIService,private airportService: AirportApiService,private fb: FormBuilder){
    
  }
  ngOnInit(): void {
    
    this.loadFlight();

    this.flightForm = this.fb.group({
      flightId: ['', Validators.required],
      departureAirportId: '',
      arrivalAirportId: '',
      nameFlight: '',
      startDate: '',
      departureTime: '',
      arrivalTime: '',
      flightPrice: ''
    });
    this.loadAirports();
  }
  
  visible: boolean = false;

    showDialog() {
        this.visible = true;
      }
  loadFlight() {
    this.flightService.getAll().then(
      (res) => {
        
        this.listFlight= res as FlightDto[] ;
        
        
      }, 
      err => {
        console.log(err);
      }
    )
    
  }
  loadAirports(){
    this.airportService.findAll().then(
      (res) => {
        
        this.listAirports= res['result'] as AirportDto[] ;
        console.log(this.listAirports);
        console.log("---------------------------------------------------------------")
        
      }, 
      err => {
        console.log(err);
      }
    )
  }
  addFlight(){
    let formValues: FlightDto = this.flightForm.value ;
    let flight: FlightDto = {
      flightId: formValues.flightId,
      departureAirportId: formValues.departureAirportId,
      arrivalAirportId: formValues.arrivalAirportId,
      nameFlight: formValues.nameFlight,
      startDate: this.formatDateTime(this.convertToDate(formValues.startDate)),
      departureTime: this.formatTime(this.convertToDate(formValues.departureTime.toString())),
      arrivalTime: this.formatTime(this.convertToDate(formValues.arrivalTime.toString())),
      flightPrice: formValues.flightPrice,
      isHide: false  
  };
    
    console.log(flight);
    this.flightService.add(flight).then(
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
      // this.loading = false; 
    });
    this.flightForm.reset();
    this.visible = false;
  }

  formatDateTime(date: Date): string{
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

formatTime(time: Date): string {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
convertToDate(date: string | Date): Date {
  if (typeof date === 'string') {
      return new Date(date);
  }
  return date;
}
closeDialog() {
  if (confirm('Are you sure you want to discard changes?')) {
    this.flightForm.reset();
    this.visible = false;
  }
}
updateFlight(flight:FlightDto){
  this.flightService.update(flight).then(
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

}
async deleteFlight(flightId: number){
  this.flightService.delete(flightId).then(
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
}

}
