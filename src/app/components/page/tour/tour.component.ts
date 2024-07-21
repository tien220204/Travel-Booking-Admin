import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TourDto } from '../../../DTO/tourDto.dto';
import { TourAPIService } from '../../../services/tour.service';

@Component({
  selector: 'app-tour',
  standalone: true,
  templateUrl: './tour.component.html',
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'TourComponent' }
})
export class TourComponent implements OnInit {

  tours: TourDto[];

  constructor(
    private tourApiService: TourAPIService
  ) { }

  ngOnInit() {
    this.loadTours();
  }

  loadTours() {
    this.tourApiService.findAll().then(
      res => {
        this.tours = res as TourDto[];
      },
      err => {
        console.error('Error loading tours:', err);
      }
    );
  }

  delete(id: string) {
    const result = confirm('Are you sure you want to delete this tour?');
    if (result) {
      this.tourApiService.delete(id).then(
        res => {
          if (res) {
            this.loadTours(); 
          } else {
            alert('Failed to delete tour');
          }
        },
        err => {
          console.error('Error deleting tour:', err);
          alert('Failed to delete tour');
        }
      );
    }
  }

  createTour(tour: TourDto) {
    const formData = new FormData();
    formData.append('tourName', tour.tourName);
    formData.append('tourDescription', tour.tourDescription);
    formData.append('departure', tour.departure.toString());
    formData.append('arrival', tour.arrival.toString());
    formData.append('tourPrice', tour.tourPrice.toString());
    formData.append('isHide', tour.isHide.toString());

    this.tourApiService.create(formData).then(
      res => {
        this.loadTours();
      },
      err => {
        console.error('Error creating tour:', err);
      }
    );
  }
}