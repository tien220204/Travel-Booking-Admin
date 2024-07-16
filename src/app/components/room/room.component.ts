import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Room } from '../../entities/room.entity';

@Component({
  selector: 'app-room',
  standalone: true,
  templateUrl: './room.component.html',
  imports: [CommonModule, FormsModule, RouterLink],
  host: { 'collision-id': 'RoomComponent' }
})
export class RoomComponent implements OnInit {
  rooms!: Room[];

  constructor(
    private roomService: RoomService,
    public router: Router
  ) {}

  ngOnInit() {

    this.roomService.findAll().then(
      res => {
        this.rooms = res as Room[];
      },
      err => {
        console.log(err);
      }
    );
  }
}
