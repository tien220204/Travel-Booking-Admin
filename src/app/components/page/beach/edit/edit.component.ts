import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { BeachApiService } from '../../../../services/beachApi.service';
import { BeachDto } from '../../../../DTO/beachDto.dto';

@Component({
  selector: 'app-edit-beach',
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'EditBeachComponent' }
})
export class EditBeachComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private beachApiService: BeachApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      let id = p.get('id');
      if (id) {
        this.beachApiService.findById(id).then(
          res => {
            let beach = res as BeachDto;
            this.editForm = this.formBuilder.group({
              beachId: [beach.beachId],
              beachName: [beach.beachName, Validators.required],
              beachLocation: [beach.beachLocation, Validators.required],
              locationId: [beach.locationId, Validators.required]
            });
          },
          err => {
            console.error('Error fetching beach:', err);
          }
        );
      }
    });
  }

  save() {
    if (this.editForm.valid) {
      let beach: BeachDto = this.editForm.value;
      let formData = new FormData();
      formData.append('beachId', beach.beachId.toString());
      formData.append('beachName', beach.beachName);
      formData.append('beachLocation', beach.beachLocation);
      formData.append('locationId', beach.locationId.toString());

      this.beachApiService.update(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/beaches']); // Navigate to beach list
          } else {
            alert('Failed to update beach');
          }
        },
        err => {
          alert('Failed to update beach');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}