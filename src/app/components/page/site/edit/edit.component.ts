import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';



import { SiteAPIService } from '../../../../services/site.service';
import { SiteDto } from '../../../../DTO/siteDto.dto';

@Component({
  selector: 'app-edit-site',
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'EditSiteComponent' }
})
export class EditSiteComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private siteApiService: SiteAPIService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      let id = p.get('id');
      if (id) {
        this.siteApiService.findById(id).then(
          res => {
            let site = res as SiteDto;
            this.editForm = this.formBuilder.group({
              // roomId: [room.roomId],
              siteName: [site.siteName, Validators.required],
              locationId: [site.locationId, Validators.required],
              typeId: [site.typeId, Validators.required],
              isHide: [site.isHide]
            });
          },
          err => {
            console.error('Error fetching site:', err);
          }
        );
      }
    });
  }

  save() {
    if (this.editForm.valid) {
      let site: SiteDto = this.editForm.value;
      let formData = new FormData();
      // formData.append('siteId', site.siteId.toString());
      formData.append('siteId', site.siteId.toString());
      formData.append('siteName', site.siteName);
      formData.append('locationId', site.locationId.toString());
      formData.append('typeId', site.typeId.toString());
      formData.append('isHide', site.isHide.toString());

      this.siteApiService.update(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/site']); 
          } else {
            alert('Failed to update site');
          }
        },
        err => {
          alert('Failed to update site');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}