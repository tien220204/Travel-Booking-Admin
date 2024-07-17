import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TourPersonQuantityAPIService } from '../../../../services/tour_person_quantity.service';
import { TourPersonQuantityDto } from '../../../../DTO/tourPersonQuantityDto.dto';

@Component({
  selector: 'app-add-tour-person-quantity',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'AddTourPersonQuantityComponent' }
})
export class AddTourPersonQuantityComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tourPersonQuantityApiService: TourPersonQuantityAPIService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      tourId: ['', [Validators.required, Validators.min(1)]],
      perMax: ['', [Validators.required, Validators.min(0)]],
      perLeft: ['', [Validators.required, Validators.min(0)]]
    });
  }

  save() {
    if (this.addForm.valid) {
      let tourPersonQuantity: Partial<TourPersonQuantityDto> = this.addForm.value;
      let formData = new FormData();
      
      for (let key in tourPersonQuantity) {
        if (tourPersonQuantity.hasOwnProperty(key)) {
          formData.append(key, tourPersonQuantity[key]);
        }
      }

      this.tourPersonQuantityApiService.create(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/tour-person-quantity']); 
          } else {
            alert('Failed to add tour person quantity');
          }
        },
        err => {
          alert('Failed to add tour person quantity');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}