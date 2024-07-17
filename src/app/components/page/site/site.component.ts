import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SiteDto } from '../../../DTO/siteDto.dto'; 
import { SiteAPIService } from '../../../services/site.service';

@Component({
  selector: 'app-site', 
  templateUrl: './site.component.html', 
  standalone: true,
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'SiteComponent' }
})
export class SiteComponent implements OnInit {
  sites: SiteDto[]; 

  constructor(
    private siteApiService: SiteAPIService
  ) {}

  ngOnInit() {
    this.loadSites(); 
  }

  loadSites() {
    this.siteApiService.findAll().then(
      res => {
        this.sites = res as SiteDto[]; 
      },
      err => {
        console.error('Error loading sites:', err);
      }
    );
  }

  delete(id: string) {
    const result = confirm('Are you sure you want to delete this site?');
    if (result) {
      this.siteApiService.delete(id).then(
        res => {
          if (res) {
            this.loadSites(); 
          } else {
            alert('Failed to delete site');
          }
        },
        err => {
          console.error('Error deleting site:', err);
          alert('Failed to delete site');
        }
      );
    }
  }

  createSite(site: SiteDto) {
    const formData = new FormData();
    formData.append('siteName', site.siteName); 
    formData.append('locationId', site.locationId.toString()); 
    formData.append('typeId', site.typeId.toString()); 
    formData.append('isHide', site.isHide.toString());

    this.siteApiService.create(formData).then(
      res => {
        this.loadSites(); 
      },
      err => {
        console.error('Error creating site:', err);
      }
    );
  }
}
