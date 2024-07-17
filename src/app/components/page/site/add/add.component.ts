import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoomAPIService } from '../../../../services/room.service';
import { RoomDto } from '../../../../DTO/roomDto.dto';
import { SiteAPIService } from '../../../../services/site.service';
import { SiteDto } from '../../../../DTO/siteDto.dto';

@Component({
  selector: 'app-add-site',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'AddSiteComponent' }
})
export class AddSiteComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private siteApiService: SiteAPIService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      //hotelId: ['', Validators.required],
      siteName: ['', Validators.required],
      locationId: ['', Validators.required],
      typeId: ['', [Validators.required]],
      isHide: [false]
    });
  }

  save() {
    if (this.addForm.valid) {
      let site: Partial<SiteDto> = this.addForm.value;
      let formData = new FormData();
      
      for (let key in site) {
        if (site.hasOwnProperty(key)) {
          formData.append(key, site[key]);
        }
      }

      this.siteApiService.create(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/site']); 
          } else {
            alert('Failed to add site');
          }
        },
        err => {
          alert('Failed to add site');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}