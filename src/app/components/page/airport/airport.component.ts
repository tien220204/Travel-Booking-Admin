import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AirportDto } from '../../../DTO/airportDto.dto';
import { AirportApiService } from '../../../services/airportApi.service';


@Component({
  selector: 'app-airport',
  standalone: true,
  templateUrl: './airport.component.html',
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'AirportComponent' }
})
export class AirportComponent implements OnInit {

  airports: AirportDto[];

  constructor(
    private airportApiService: AirportApiService
  ) { }

  ngOnInit() {
    this.loadAirports();
  }

  loadAirports() {
    this.airportApiService.findAll().then(
      res => {
        this.airports = res as AirportDto[];
      },
      err => {
        console.error('Error loading airports:', err);
      }
    );
  }

  delete(id: string) {
    const result = confirm('Are you sure you want to delete this airport?');
    if (result) {
      this.airportApiService.delete(id).then(
        res => {
          if (res) {
            this.loadAirports(); 
          } else {
            alert('Failed to delete airport');
          }
        },
        err => {
          console.error('Error deleting airport:', err);
          alert('Failed to delete airport');
        }
      );
    }
  }



  createAirport(airport: AirportDto) {
    // This method would be called from your form submit
    const formData = new FormData();
    formData.append('airportName', airport.airportName);
    formData.append('isHide', airport.isHide.toString());

    this.airportApiService.create(formData).then(
      res => {
        // Handle successful creation
        this.loadAirports();
      },
      err => {
        console.error('Error creating airport:', err);
      }
    );
  }

}