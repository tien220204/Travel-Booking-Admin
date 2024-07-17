import { Component, OnInit } from '@angular/core';

import { BeachDTO } from '../../../DTO/BeachDTO.dto';
import { BeachAPIService } from '../../../services/BeachApi.Service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-beach',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule,RouterLink],
  templateUrl: './beach.component.html',
  styleUrl: './beach.component.css'
})
export class BeachComponent implements OnInit  {
  listBeach: BeachDTO[] = [];
  ngOnInit(): void {
    this.loadBeach();
  }
  constructor(
    private beachService: BeachAPIService
  ){
  }
  loadBeach(){
    this.beachService.getAll().then(
      (res) => {
        
        this.listBeach= res as BeachDTO[] ;
        console.log(this.listBeach);
        
      }, 
      err => {
        console.log(err);
      }
    )
  }

  visible: boolean = false;

    showDialog() {
        this.visible = true;
      }
}
