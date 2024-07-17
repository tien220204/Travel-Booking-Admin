import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SiteTypeDto } from '../../../DTO/siteTypeDto.dto';
import { SiteTypeAPIService } from '../../../services/site-type.service';


@Component({
  selector: 'app-site-type',
  templateUrl: './site-type.component.html',
  standalone: true,
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'SiteTypeComponent' }
})
export class SiteTypeComponent implements OnInit {
  siteTypes: SiteTypeDto[];

  constructor(
    private siteTypeApiService: SiteTypeAPIService
  ) {}

  ngOnInit() {
    this.loadSiteTypes();
  }

  loadSiteTypes() {
    this.siteTypeApiService.findAll().then(
      res => {
        this.siteTypes = res as SiteTypeDto[];
      },
      err => {
        console.error('Error loading site types:', err);
      }
    );
  }

  delete(id: string) {
    const result = confirm('Are you sure you want to delete this site type?');
    if (result) {
      this.siteTypeApiService.delete(id).then(
        res => {
          if (res) {
            this.loadSiteTypes();
          } else {
            alert('Failed to delete site type');
          }
        },
        err => {
          console.error('Error deleting site type:', err);
          alert('Failed to delete site type');
        }
      );
    }
  }

  createSiteType(siteType: SiteTypeDto) {
    const formData = new FormData();
    formData.append('typeName', siteType.typeName);

    this.siteTypeApiService.create(formData).then(
      res => {
        this.loadSiteTypes();
      },
      err => {
        console.error('Error creating site type:', err);
      }
    );
  }
}
