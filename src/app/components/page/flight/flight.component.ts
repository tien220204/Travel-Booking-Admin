import { Component, OnInit } from '@angular/core';
import { FlightAPIService } from '../../../services/FlightApi.Service';
import { FlightDto } from '../../../DTO/reviewDto.dto';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {
  listFLight : FlightDto[] | null = null;
  ngOnInit(): void {
    this.loadFlight();
  }
  constructor(private flightService: FlightAPIService){

  }
  loadFlight() {
    this.flightService.getAll().then(
      (res) => {
        
        this.listFLight= res as FlightDto[] ;
        console.log(this.listFLight);
        
      }, 
      err => {
        console.log(err);
      }
    )
    
  }
}
