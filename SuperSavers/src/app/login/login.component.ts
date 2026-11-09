import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
