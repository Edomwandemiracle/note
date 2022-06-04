import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/core/notifications/notifications.service';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { CredentialsService } from '../credentials/credentials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  loginForm: FormGroup;
  
  constructor(private notify: NotificationsService, private fb: FormBuilder,
    private authService: AuthService, private router: Router, 
    private credentialsService: CredentialsService) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    this.authService.login(this.loginForm.value).subscribe(res => {
      if (res.status === 'success') {
        localStorage.clear();
        this.credentialsService.setCredentials(res.data);
        localStorage.setItem('userData', JSON.stringify(res.data));
        this.notify.publishMessages(res.message, 'success', 1);
        this.router.navigate(['/main']);
      } else {
        this.notify.publishMessages(res.message, 'danger', 1);
      }
    }, err => {
      this.notify.publishMessages(err.message, 'danger', 1);
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
