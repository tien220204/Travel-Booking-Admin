import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TourDto } from '../../../../DTO/tourDto.dto';
import { TourAPIService } from '../../../../services/tour.service';

@Component({
  selector: 'app-edit-tour',
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'EditTourComponent' }
})
export class EditTourComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private tourApiService: TourAPIService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      tourId: [''],
      tourName: ['', Validators.required],
      tourDescription: ['', Validators.required],
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      tourPrice: ['', Validators.required],
      isHide: [false]
    });

    this.activatedRoute.paramMap.subscribe(p => {
      let id = p.get('id');
      if (id) {
        this.tourApiService.findById(id).then(
          res => {
            let tour = res as TourDto;
            this.editForm.patchValue(tour);
          },
          err => {
            console.error('Error fetching tour:', err);
          }
        );
      }
    });
  }

  save() {
    if (this.editForm.valid) {
      let tour: TourDto = this.editForm.value;
      let formData = new FormData();
      formData.append('tourId', tour.tourId.toString());
      formData.append('tourName', tour.tourName);
      formData.append('tourDescription', tour.tourDescription);
      formData.append('departure', tour.departure.toString());
      formData.append('arrival', tour.arrival.toString());
      formData.append('tourPrice', tour.tourPrice.toString());
      formData.append('isHide', tour.isHide.toString());

      this.tourApiService.update(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/tour']); 
          } else {
            alert('Failed to update tour');
          }
        },
        err => {
          alert('Failed to update tour');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}