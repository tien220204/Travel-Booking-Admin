import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TourAPIService } from '../../../../services/tour.service';
import { TourDto } from '../../../../DTO/tourDto.dto';

@Component({
  selector: 'app-add-tour',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'AddTourComponent' }
})
export class AddTourComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tourApiService: TourAPIService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      tourName: ['', Validators.required],
      tourDescription: ['', Validators.required],
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      tourPrice: ['', [Validators.required, Validators.min(0)]],
      isHide: [false]
    });
  }

  save() {
    if (this.addForm.valid) {
      let tour: Partial<TourDto> = this.addForm.value;
      let formData = new FormData();
      
      for (let key in tour) {
        if (tour.hasOwnProperty(key)) {
          formData.append(key, tour[key]);
        }
      }

      this.tourApiService.create(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/tour']); 
          } else {
            alert('Failed to add tour');
          }
        },
        err => {
          alert('Failed to add tour');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}