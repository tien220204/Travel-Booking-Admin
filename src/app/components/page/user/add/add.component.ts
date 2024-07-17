import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAPIService } from '../../../../services/user.service';
import { UserDto } from '../../../../DTO/userDto.dto';

@Component({
  selector: 'app-add-user',
  standalone: true,
  templateUrl: './add.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'AddUserComponent' }
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userApiService: UserAPIService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: [false],
      isHide: [false]
    });
  }

  save() {
    if (this.addForm.valid) {
      let user: Partial<UserDto> = this.addForm.value;
      let formData = new FormData();
      
      for (let key in user) {
        if (user.hasOwnProperty(key)) {
          formData.append(key, user[key]);
        }
      }

      this.userApiService.create(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/user']); 
          } else {
            alert('Failed to add user');
          }
        },
        err => {
          alert('Failed to add user');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields correctly');
    }
  }
}