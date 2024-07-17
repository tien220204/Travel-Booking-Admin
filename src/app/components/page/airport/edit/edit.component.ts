import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AirportApiService } from '../../../../services/airportApi.service';
import { AirportDto } from '../../../../DTO/airportDto.dto';

@Component({
  selector: 'app-edit-airport',
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'EditAirportComponent' }
})
export class EditAirportComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private airportApiService: AirportApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      let id = p.get('id');
      if (id) {
        this.airportApiService.findById(id).then(
          res => {
            let airport = res as AirportDto;
            this.editForm = this.formBuilder.group({
              airportId: [airport.airportId],
              airportName: [airport.airportName, Validators.required]
            });
          },
          err => {
            console.error('Error fetching airport:', err);
          }
        );
      }
    });
  }

  save() {
    if (this.editForm.valid) {
      let airport: AirportDto = this.editForm.value;
      let formData = new FormData();
      formData.append('airportId', airport.airportId);
      formData.append('airportName', airport.airportName);

      this.airportApiService.update(formData).then(
        res => {
          // Assuming the API returns a success indicator
          if (res) {
            this.router.navigate(['/airports']); // Navigate to airport list
          } else {
            alert('Failed to update airport');
          }
        },
        err => {
          alert('Failed to update airport');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}