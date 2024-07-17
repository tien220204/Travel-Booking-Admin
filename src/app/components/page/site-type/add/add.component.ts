import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteTypeDto } from '../../../../DTO/siteTypeDto.dto';
import { SiteTypeAPIService } from '../../../../services/site-type.service';


@Component({
  selector: 'app-add-site-type',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [ReactiveFormsModule],
  host: { 'collision-id': 'AddSiteTypeComponent' }
})
export class AddSiteTypeComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private siteTypeApiService: SiteTypeAPIService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      typeName: ['', Validators.required],
    });
  }

  save() {
    if (this.addForm.valid) {
      let siteType: Partial<SiteTypeDto> = this.addForm.value;
      let formData = new FormData();
      this.siteTypeApiService.create(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/site-type']);
          } else {
            alert('Failed to add site type');
          }
        },
        err => {
          alert('Failed to add site type');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}
