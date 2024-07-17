import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoomHotelQuantityAPIService } from '../../../../services/room-hotel-quantity.service';
import { RoomHotelQuantityDto } from '../../../../DTO/roomHotelQuantityDto.dto';

@Component({
  selector: 'app-add-room-hotel-quantity',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'AddRoomHotelQuantityComponent' }
})
export class AddRoomHotelQuantityComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roomHotelQuantityApiService: RoomHotelQuantityAPIService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      hotelId: ['', [Validators.required, Validators.min(0)]],
      roomId: ['', [Validators.required, Validators.min(0)]],
      quantityLeft: ['', [Validators.required, Validators.min(0)]]
    });
  }

  save() {
    if (this.addForm.valid) {
      let roomHotelQuantity: Partial<RoomHotelQuantityDto> = this.addForm.value;
      let formData = new FormData();
      
      for (let key in roomHotelQuantity) {
        if (roomHotelQuantity.hasOwnProperty(key)) {
          formData.append(key, roomHotelQuantity[key].toString());
        }
      }

      this.roomHotelQuantityApiService.create(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/room-hotel-quantity']); 
          } else {
            alert('Failed to add room hotel quantity');
          }
        },
        err => {
          alert('Failed to add room hotel quantity');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}
