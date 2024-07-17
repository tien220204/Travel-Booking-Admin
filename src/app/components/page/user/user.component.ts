import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserDto } from '../../../DTO/userDto.dto';
import { UserAPIService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  imports: [FormsModule, RouterLink],
  host: { 'collision-id': 'UserComponent' }
})
export class UserComponent implements OnInit {

  users: UserDto[];

  constructor(
    private userApiService: UserAPIService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userApiService.findAll().then(
      res => {
        this.users = res as UserDto[];
      },
      err => {
        console.error('Error loading users:', err);
      }
    );
  }

  delete(id: number) {
    const result = confirm('Are you sure you want to delete this user?');
    if (result) {
      this.userApiService.delete(id).then(
        res => {
          if (res) {
            this.loadUsers(); 
          } else {
            alert('Failed to delete user');
          }
        },
        err => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user');
        }
      );
    }
  }

  recover(id: string) {
    this.userApiService.recover(id).then(
      res => {
        if (res) {
          this.loadUsers();
        } else {
          alert('Failed to recover user');
        }
      },
      err => {
        console.error('Error recovering user:', err);
        alert('Failed to recover user');
      }
    );
  }
}