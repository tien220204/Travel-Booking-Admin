import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReviewDto } from '../../../DTO/reviewDto.dto';
import { ReviewAPIService } from '../../../services/review.service';

@Component({
  selector: 'app-review',
  standalone: true,
  templateUrl: './review.component.html',
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'ReviewComponent' }
})
export class ReviewComponent implements OnInit {

  reviews: ReviewDto[];

  constructor(
    private reviewAPIService: ReviewAPIService
  ) { }

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewAPIService.findAll().then(
      res => {
        this.reviews = res as ReviewDto[];
      },
      err => {
        console.error('Error loading reviews:', err);
      }
    );
  }

  delete(id: string) {
    const result = confirm('Are you sure you want to delete this review?');
    if (result) {
      this.reviewAPIService.delete(id).then(
        res => {
          if (res) {
            this.loadReviews(); 
          } else {
            alert('Failed to delete review');
          }
        },
        err => {
          console.error('Error deleting review:', err);
          alert('Failed to delete review');
        }
      );
    }
  }

  createReview(review: ReviewDto) {
    const formData = new FormData();
    formData.append('reviewStar', review.reviewStar);
    formData.append('reviewText', review.reviewText);
    formData.append('userId', review.userId.toString());
    formData.append('hotelId', review.hotelId.toString());
    formData.append('restaurantId', review.restaurantId.toString());
    formData.append('isHide', review.isHide);

    this.reviewAPIService.create(formData).then(
      res => {
        this.loadReviews();
      },
      err => {
        console.error('Error creating review:', err);
      }
    );
  }
}