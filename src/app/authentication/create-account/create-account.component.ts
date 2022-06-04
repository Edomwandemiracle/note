import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/core/notifications/notifications.service';
import { AuthService } from 'src/app/core/services/authentication/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  createAccountForm: FormGroup;

  constructor(private notify: NotificationsService, private authService: AuthService, 
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initcreateAccountForm();
  }

  initcreateAccountForm() {
    this.createAccountForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    this.authService.createAccount(this.createAccountForm.value).subscribe(res => {
      if (res.status === 'success') {
        this.notify.publishMessages(res.message, 'success', 1);
        this.router.navigate(['/auth/login']);
      } else {
        this.notify.publishMessages(res.message, 'danger', 1);
      }
    });
  }

}
