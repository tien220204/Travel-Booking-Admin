import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Room } from '../../../entities/room.entity';
import { RoomService } from '../../../services/room.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule]
})
export class AddRoomComponent implements OnInit {

  addForm!: FormGroup;

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      hotel_id: '',
      room_name: '',
      room_description: '',
      room_price: '',
      num_of_single_bed: '',
      num_of_double_bed: '',
      is_hide: false
    });
  }

  save() {
    let room: Room = this.addForm.value as Room;
    let str_json: string = JSON.stringify(room);
    let formData = new FormData();
    formData.append('sjson', str_json);

    this.roomService.create(formData).then(
      (res: any) => { 
        if (res.result) {
          this.router.navigate(['room']);
        } else {
          alert('Failed');
        }
      },
      err => {
        alert('Failed');
        console.log(err);
      }
    );
  }
}


