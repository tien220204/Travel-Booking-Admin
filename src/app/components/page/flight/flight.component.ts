import { Component, OnInit } from '@angular/core';
import { FlightAPIService } from '../../../services/FlightApi.Service';
import { FlightDto } from '../../../DTO/FlightDTO.DTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [CommonModule],
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
