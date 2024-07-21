import { Component, OnInit } from '@angular/core';

import { BeachDTO } from '../../../DTO/BeachDTO.dto';
import { BeachAPIService } from '../../../services/BeachApi.Service';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonResponseDTO } from '../../../DTO/JsonResponeDTO.DTO copy';


@Component({
  selector: 'app-beach',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './beach.component.html',
  styleUrl: './beach.component.css'
})
export class BeachComponent implements OnInit {
  listBeach: BeachDTO[] = [];
  beachForm: FormGroup
  ngOnInit(): void {
    this.loadBeach();
    this.beachForm = this.fb.group({
      id: [''],
      name: [''],
      location: ['']
    });
  }
  constructor(
    private beachService: BeachAPIService,
    private fb: FormBuilder
  ) {
  }
  loadBeach() {
    this.beachService.getAll().then(
      (res) => {

        this.listBeach = res as BeachDTO[];
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
  addBeach() {
    let formValues = this.beachForm.value;
    let beach = {
      beachId: formValues.id,
      beachName: formValues.name,
      beachLocation: formValues.location,
      locationId: null
    }
    console.log(beach);
    this.beachService.create(beach).then(
      (res) => {
        let result: JsonResponseDTO = res as JsonResponseDTO;
        console.log(result.code);
        console.log(result);
        if (result.code == 200) {
          // this.router.navigate(["/confirm-success"], { state: { message: result.msg } });

          console.log(result.msg);

        }
        // this.loading = false; 
      }
    ).catch((err) => {
      // Xử lý lỗi ở đây
      console.error(err);
      if (err.error) {
        let result: JsonResponseDTO = err.error as JsonResponseDTO;

        console.log(result.msg);
      } else {
        console.log('An unexpected error occurred.');
      }
      // this.loading = false; 
    });
    this.beachForm.reset();
    this.visible = false;

    alert("Success");

  }
  deleteBeach(beachId: number) {
    this.beachService.delete(beachId).then(
      (res) => {
        let result: JsonResponseDTO = res as JsonResponseDTO;
        console.log(result.code);
        console.log(result);
        if (result.code == 200) {
          // this.router.navigate(["/confirm-success"], { state: { message: result.msg } });
          alert(result.msg);

        }
        // this.loading = false; 
      }
    ).catch((err) => {
      // Xử lý lỗi ở đây
      console.error(err);
      if (err.error) {
        let result: JsonResponseDTO = err.error as JsonResponseDTO;

        alert(result.msg);
      } else {
        alert('An unexpected error occurred.');
      }
    })
    alert('success');
  }
  isEditMode: boolean = false;
  saveBeach() {
    if (this.beachForm.valid) {
      if (this.isEditMode) {
        this.updateBeach();
      } else {
        this.addBeach();
      }
    }
  }
  openAddDialog() {
    this.isEditMode = false;
    this.beachForm.reset();
    this.visible = true;
  }

  openEditDialog(beach: BeachDTO) {
    this.isEditMode = true;
    this.beachForm.patchValue({
      id: beach.beachId,
      name: beach.beachName,
      location: beach.beachLocation
    });
    this.visible = true;
  }
  updateBeach() {
    let formValues = this.beachForm.value;
    let beach: BeachDTO = {
      beachId: formValues.id,
      beachName: formValues.name,
      beachLocation: formValues.location,
      locationId: null
    };
    console.log(beach);
    this.beachService.update(beach).then(
      (res) => {
        let result: JsonResponseDTO = res as JsonResponseDTO;
        console.log(result.code);
        console.log(result);
        if (result.code == 200) {
          // this.router.navigate(["/confirm-success"], { state: { message: result.msg } });
          alert(result.msg);
        } 
        // this.loading = false; 
      }
    ).catch((err) => {
      // Xử lý lỗi ở đây
      console.error(err);
      if (err.error) {
        let result: JsonResponseDTO = err.error as JsonResponseDTO;
  
        alert(result.msg);
      } else {
        alert('An unexpected error occurred.');
      }
  })
  alert('success')
  this.cancelDialog()
  }
  cancelDialog() {
    this.beachForm.reset();  // Reset form khi đóng dialog
    this.visible = false;
  }
}
