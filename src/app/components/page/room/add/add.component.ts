import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoomAPIService } from '../../../../services/room.service';
import { RoomDto } from '../../../../DTO/roomDto.dto';

@Component({
  selector: 'app-add-room',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'AddRoomComponent' }
})
export class AddRoomComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roomApiService: RoomAPIService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      hotelId: ['', Validators.required],
      roomName: ['', Validators.required],
      roomDescription: ['', Validators.required],
      roomPrice: ['', [Validators.required, Validators.min(0)]],
      numOfSingleBed: ['', [Validators.required, Validators.min(0)]],
      numOfDoubleBed: ['', [Validators.required, Validators.min(0)]],
      isHide: [false]
    });
  }

  save() {
    if (this.addForm.valid) {
      let room: Partial<RoomDto> = this.addForm.value;
      let formData = new FormData();
      
      for (let key in room) {
        if (room.hasOwnProperty(key)) {
          formData.append(key, room[key]);
        }
      }

      this.roomApiService.create(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/room']); 
          } else {
            alert('Failed to add room');
          }
        },
        err => {
          alert('Failed to add room');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields');
    }
  }
}