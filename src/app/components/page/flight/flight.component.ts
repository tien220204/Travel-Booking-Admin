import { Component, OnInit } from '@angular/core';
import { FlightAPIService } from '../../../services/FlightApi.Service';
import { FlightDto } from '../../../DTO/FlightDTO.DTO';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [CommonModule,RouterLink,DialogModule, ButtonModule, InputTextModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {
  listFlight : FlightDto[] | null = null;
  ngOnInit(): void {
    this.loadFlight();
  }
  constructor(private flightService: FlightAPIService){

  }
  visible: boolean = false;

    showDialog() {
        this.visible = true;
      }
  loadFlight() {
    this.flightService.getAll().then(
      (res) => {
        
        this.listFlight= res as FlightDto[] ;
        console.log(this.listFlight);
        
      }, 
      err => {
        console.log(err);
      }
    )
    
  }
}
