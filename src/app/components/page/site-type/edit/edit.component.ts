import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SiteTypeAPIService } from '../../../../services/site-type.service';
import { SiteTypeDto } from '../../../../DTO/siteTypeDto.dto';

@Component({
  selector: 'app-edit-site-type',
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'EditSiteTypeComponent' }
})
export class EditSiteTypeComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private siteTypeApiService: SiteTypeAPIService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      let id = p.get('id');
      if (id) {
        this.siteTypeApiService.findById(id).then(
          res => {
            let siteType = res as SiteTypeDto;
            this.editForm = this.formBuilder.group({
              typeId: [siteType.typeId],
              typeName: [siteType.typeName, Validators.required]
            });
          },
          err => {
            console.error('Error fetching site type:', err);
          }
        );
      }
    });
  }

  save() {
    if (this.editForm.valid) {
      let siteType: SiteTypeDto = this.editForm.value;
      let formData = new FormData();
      formData.append('typeId', siteType.typeId.toString());
      formData.append('typeName', siteType.typeName);

      this.siteTypeApiService.update(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/site-type']); 
          } else {
            alert('Failed to update site type');
          }
        },
        err => {
          alert('Failed to update site type');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}