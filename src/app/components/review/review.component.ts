import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  standalone: true,
  templateUrl: './review.component.html',
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'ReviewComponent' }
})
export class ReviewComponent implements OnInit {
  reviews: any[] = [];

  constructor(
    private reviewService: ReviewService,
    public router: Router
  ) {}


  ngOnInit(): void {
    this.reviewService.findAll().then(reviews => {
      this.reviews = reviews;
    });
  }
}
