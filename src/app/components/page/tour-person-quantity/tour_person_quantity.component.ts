import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TourPersonQuantityDto } from '../../../DTO/tourPersonQuantityDto.dto';
import { TourPersonQuantityAPIService } from '../../../services/tour_person_quantity.service';

@Component({
  selector: 'app-tour-person-quantity',
  standalone: true,
  templateUrl: './tour_person_quantity.component.html',
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'TourPersonQuantityComponent' }
})
export class TourPersonQuantityComponent implements OnInit {

  tourPersonQuantities: TourPersonQuantityDto[];

  constructor(
    private tourPersonQuantityApiService: TourPersonQuantityAPIService
  ) { }

  ngOnInit() {
    this.loadTourPersonQuantities();
  }

  loadTourPersonQuantities() {
    this.tourPersonQuantityApiService.findAll().then(
      res => {
        this.tourPersonQuantities = res as TourPersonQuantityDto[];
      },
      err => {
        console.error('Error loading tour person quantities:', err);
      }
    );
  }

  delete(id: number) {
    const result = confirm('Are you sure you want to delete this tour person quantity?');
    if (result) {
      this.tourPersonQuantityApiService.delete(id).then(
        res => {
          if (res) {
            this.loadTourPersonQuantities();
          } else {
            alert('Failed to delete tour person quantity');
          }
        },
        err => {
          console.error('Error deleting tour person quantity:', err);
          alert('Failed to delete tour person quantity');
        }
      );
    }
  }

  createTourPersonQuantity(tourPersonQuantity: TourPersonQuantityDto) {
    const formData = new FormData();
    formData.append('tourId', tourPersonQuantity.tourId.toString());
    formData.append('perMax', tourPersonQuantity.perMax.toString());
    formData.append('perLeft', tourPersonQuantity.perLeft.toString());

    this.tourPersonQuantityApiService.create(formData).then(
      res => {
        this.loadTourPersonQuantities();
      },
      err => {
        console.error('Error creating tour person quantity:', err);
      }
    );
  }

  updateTourPersonQuantity(tourPersonQuantity: TourPersonQuantityDto) {
    const formData = new FormData();
    formData.append('tourId', tourPersonQuantity.tourId.toString());
    formData.append('perMax', tourPersonQuantity.perMax.toString());
    formData.append('perLeft', tourPersonQuantity.perLeft.toString());

    this.tourPersonQuantityApiService.update(formData).then(
      res => {
        this.loadTourPersonQuantities();
      },
      err => {
        console.error('Error updating tour person quantity:', err);
      }
    );
  }
}