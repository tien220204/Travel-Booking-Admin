import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TourPersonQuantityDto } from '../../../../DTO/tourPersonQuantityDto.dto';
import { TourPersonQuantityAPIService } from '../../../../services/tour_person_quantity.service';

@Component({
  selector: 'app-edit-tour-person-quantity',
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'EditTourPersonQuantityComponent' }
})
export class EditTourPersonQuantityComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private tourPersonQuantityApiService: TourPersonQuantityAPIService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      let id = p.get('id');
      if (id) {
        this.tourPersonQuantityApiService.findById(id).then(
          res => {
            let tourPersonQuantity = res as TourPersonQuantityDto;
            this.editForm = this.formBuilder.group({
              tourId: [tourPersonQuantity.tourId],
              perMax: [tourPersonQuantity.perMax, [Validators.required, Validators.min(0)]],
              perLeft: [tourPersonQuantity.perLeft, [Validators.required, Validators.min(0)]]
            });
          },
          err => {
            console.error('Error fetching tour person quantity:', err);
          }
        );
      }
    });
  }

  save() {
    if (this.editForm.valid) {
      let tourPersonQuantity: TourPersonQuantityDto = this.editForm.value;
      let formData = new FormData();
      formData.append('tourId', tourPersonQuantity.tourId.toString());
      formData.append('perMax', tourPersonQuantity.perMax.toString());
      formData.append('perLeft', tourPersonQuantity.perLeft.toString());

      this.tourPersonQuantityApiService.update(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/tour-person-quantity']); 
          } else {
            alert('Failed to update tour person quantity');
          }
        },
        err => {
          alert('Failed to update tour person quantity');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}