import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


import { ReviewAPIService } from '../../../../services/review.service';
import { ReviewDto } from '../../../../DTO/reviewDto.dto';

@Component({
  selector: 'app-edit-review',
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'EditReviewComponent' }
})
export class EditReviewComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private reviewApiService: ReviewAPIService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      reviewId: [''],
      reviewStar: ['', Validators.required],
      reviewText: ['', Validators.required],
      userId: ['', Validators.required],
      hotelId: [''],
      restaurantId: [''],
      isHide: [false]
    });
  
    this.activatedRoute.paramMap.subscribe(p => {
      let id = p.get('id');
      if (id) {
        this.reviewApiService.findById(id).then(
          res => {
            let review = res as ReviewDto;
            this.editForm.patchValue(review);
          },
          err => {
            console.error('Error fetching review:', err);
          }
        );
      }
    });
  }

  save() {
    if (this.editForm.valid) {
      let review: ReviewDto = this.editForm.value;
      let formData = new FormData();
      formData.append('reviewId', review.reviewId.toString());
      formData.append('reviewStar', review.reviewStar);
      formData.append('reviewText', review.reviewText);
      formData.append('userId', review.userId.toString());
      formData.append('hotelId', review.hotelId.toString());
      formData.append('restaurantId', review.restaurantId.toString());
      formData.append('isHide', review.isHide);

      this.reviewApiService.update(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/review']); 
          } else {
            alert('Failed to update review');
          }
        },
        err => {
          alert('Failed to update review');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}