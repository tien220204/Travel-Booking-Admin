import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { RoomHotelQuantityDto } from '../../../../DTO/roomHotelQuantityDto.dto';
import { RoomHotelQuantityAPIService } from '../../../../services/room-hotel-quantity.service';

@Component({
  selector: 'app-edit-room-hotel-quantity',
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'EditRoomHotelQuantityComponent' }
})
export class EditRoomHotelQuantityComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private roomHotelQuantityApiService: RoomHotelQuantityAPIService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      let hotelId = p.get('hotelId');
      let roomId = p.get('roomId');
      if (hotelId && roomId) {
        this.roomHotelQuantityApiService.findByHotelAndRoom(parseInt(hotelId), parseInt(roomId)).then(
          res => {
            let roomHotelQuantity = res as RoomHotelQuantityDto;
            this.editForm = this.formBuilder.group({
              hotelId: [roomHotelQuantity.hotelId, [Validators.required, Validators.min(0)]],
              roomId: [roomHotelQuantity.roomId, [Validators.required, Validators.min(0)]],
              quantityLeft: [roomHotelQuantity.quantityLeft, [Validators.required, Validators.min(0)]]
            });
          },
          err => {
            console.error('Error fetching room hotel quantity:', err);
          }
        );
      }
    });
  }

  save() {
    if (this.editForm.valid) {
      let roomHotelQuantity: RoomHotelQuantityDto = this.editForm.value;
      let formData = new FormData();
      formData.append('hotelId', roomHotelQuantity.hotelId.toString());
      formData.append('roomId', roomHotelQuantity.roomId.toString());
      formData.append('quantityLeft', roomHotelQuantity.quantityLeft.toString());

      this.roomHotelQuantityApiService.update(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/room-hotel-quantitiy']); 
          } else {
            alert('Failed to update room hotel quantity');
          }
        },
        err => {
          alert('Failed to update room hotel quantity');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}
