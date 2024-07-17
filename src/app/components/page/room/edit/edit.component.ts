import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { RoomDto } from '../../../../DTO/roomDto.dto';
import { RoomAPIService } from '../../../../services/room.service';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'EditRoomComponent' }
})
export class EditRoomComponent implements OnInit {

  editForm: FormGroup;

  constructor(
    private roomApiService: RoomAPIService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      let id = p.get('id');
      if (id) {
        this.roomApiService.findById(id).then(
          res => {
            let room = res as RoomDto;
            this.editForm = this.formBuilder.group({
              roomId: [room.roomId],
              hotelId: [room.hotelId, Validators.required],
              roomName: [room.roomName, Validators.required],
              roomDescription: [room.roomDescription, Validators.required],
              roomPrice: [room.roomPrice, Validators.required],
              numOfSingleBed: [room.numOfSingleBed, Validators.required],
              numOfDoubleBed: [room.numOfDoubleBed, Validators.required],
              isHide: [room.isHide]
            });
          },
          err => {
            console.error('Error fetching room:', err);
          }
        );
      }
    });
  }

  save() {
    if (this.editForm.valid) {
      let room: RoomDto = this.editForm.value;
      let formData = new FormData();
      formData.append('roomId', room.roomId.toString());
      formData.append('hotelId', room.hotelId.toString());
      formData.append('roomName', room.roomName);
      formData.append('roomDescription', room.roomDescription);
      formData.append('roomPrice', room.roomPrice.toString());
      formData.append('numOfSingleBed', room.numOfSingleBed.toString());
      formData.append('numOfDoubleBed', room.numOfDoubleBed.toString());
      formData.append('isHide', room.isHide.toString());

      this.roomApiService.update(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/room']); 
          } else {
            alert('Failed to update room');
          }
        },
        err => {
          alert('Failed to update room');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}