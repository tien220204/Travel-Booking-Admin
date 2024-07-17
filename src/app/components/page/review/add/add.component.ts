import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReviewAPIService } from '../../../../services/review.service';
import { ReviewDto } from '../../../../DTO/reviewDto.dto';


@Component({
  selector: 'app-add-review',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'AddReviewComponent' }
})
export class AddReviewComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private reviewApiService: ReviewAPIService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      reviewStar: ['', Validators.required],
      reviewText: ['', Validators.required],
      userId: ['', Validators.required],
      userFullName: ['', Validators.required],
      hotelId: [''],
      restaurantId: [''],
      isHide: ['false']
    });
  }

  save() {
    if (this.addForm.valid) {
      let review: Partial<ReviewDto> = this.addForm.value;
      let formData = new FormData();
      
      for (let key in review) {
        if (review.hasOwnProperty(key)) {
          formData.append(key, review[key]);
        }
      }

      this.reviewApiService.create(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/review']); 
          } else {
            alert('Failed to add review');
          }
        },
        err => {
          alert('Failed to add review');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}