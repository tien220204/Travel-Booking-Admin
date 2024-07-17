import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserAPIService } from '../../../../services/user.service';
import { UserDto } from '../../../../DTO/userDto.dto';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  templateUrl: './edit.component.html',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  host: { 'collision-id': 'EditUserComponent' }
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userApiService: UserAPIService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.editForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: [false],
      isHide: [false]
    });

    this.loadUser();
  }

  loadUser() {
    this.userApiService.findById(this.userId).then(
      (res: UserDto) => {
        this.editForm.patchValue(res);
      },
      err => {
        console.error('Error loading user:', err);
        alert('Failed to load user data');
      }
    );
  }

  save() {
    if (this.editForm.valid) {
      let user: Partial<UserDto> = this.editForm.value;
      let formData = new FormData();
      
      for (let key in user) {
        if (user.hasOwnProperty(key)) {
          formData.append(key, user[key]);
        }
      }
      formData.append('userId', this.userId);

      this.userApiService.update(formData).then(
        res => {
          if (res) {
            this.router.navigate(['/user']); 
          } else {
            alert('Failed to update user');
          }
        },
        err => {
          alert('Failed to update user');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all required fields correctly');
    }
  }
}