import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BeachApiService } from '../../../../services/beachApi.service';
import { BeachDto } from '../../../../DTO/beachDto.dto';

@Component({
  selector: 'app-add-beach',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'AddBeachComponent' }
})
export class AddBeachComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private beachApiService: BeachApiService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      beachName: ['', Validators.required],
      beachLocation: ['', Validators.required],
      locationId: [0, Validators.required]
    });
  }

  save() {
    if (this.addForm.valid) {
      let beach: Partial<BeachDto> = this.addForm.value;
      let formData = new FormData();
      formData.append('beachName', beach.beachName);
      formData.append('beachLocation', beach.beachLocation);
      formData.append('locationId', beach.locationId.toString());

      this.beachApiService.create(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/beach']); // Navigate to beach list
          } else {
            alert('Failed to add beach');
          }
        },
        err => {
          alert('Failed to add beach');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}