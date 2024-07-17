import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AirportApiService } from '../../../../services/airportApi.service';
import { AirportDto } from '../../../../DTO/airportDto.dto';

@Component({
  selector: 'app-add-airport',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'AddAirportComponent' }
})
export class AddAirportComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private airportApiService: AirportApiService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      airportName: ['', Validators.required],
      isHide: [false]
    });
  }

  save() {
    if (this.addForm.valid) {
      let airport: Partial<AirportDto> = this.addForm.value;
      let formData = new FormData();
      formData.append('airportName', airport.airportName);

      this.airportApiService.create(formData).then(
        res => {
          // Assuming the API returns a success indicator
          if (res) {
            this.router.navigate(['/airport']); // Navigate to airport list
          } else {
            alert('Failed to add airport');
          }
        },
        err => {
          alert('Failed to add airport');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}