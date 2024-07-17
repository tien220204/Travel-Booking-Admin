import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { BeachApiService } from '../../../services/beachApi.service';
import { BeachDto } from '../../../DTO/beachDto.dto';

@Component({
  selector: 'app-beach',
  standalone: true,
  templateUrl: './beach.component.html',
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'BeachComponent' }
})
export class BeachComponent implements OnInit {

  beaches: BeachDto[];

  constructor(
    private beachApiService: BeachApiService
  ) { }

  ngOnInit() {
    this.loadBeaches();
  }

  loadBeaches() {
    this.beachApiService.findAll().then(
      res => {
        this.beaches = res as BeachDto[];
      },
      err => {
        console.error('Error loading beaches:', err);
      }
    );
  }

  delete(id: number) {
    const result = confirm('Are you sure you want to delete this beach?');
    if (result) {
      this.beachApiService.delete(id).then(
        res => {
          if (res) {
            this.loadBeaches(); 
          } else {
            alert('Failed to delete beach');
          }
        },
        err => {
          console.error('Error deleting beach:', err);
          alert('Failed to delete beach');
        }
      );
    }
  }

  // Nếu bạn cần method này, hãy điều chỉnh nó cho phù hợp với Beach
  createBeach(beach: BeachDto) {
    // Tạo FormData từ đối tượng BeachDto
    const formData = new FormData();
    formData.append('beachName', beach.beachName);
    formData.append('beachLocation', beach.beachLocation);
    formData.append('locationId', beach.locationId.toString());
  
    this.beachApiService.create(formData).then(
      res => {
        // Xử lý khi tạo thành công
        this.loadBeaches();
      },
      err => {
        console.error('Error creating beach:', err);
      }
    );
  }
}