import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.login({ username: this.username, password: this.password })
      .subscribe(response => {
        localStorage.setItem('token', response.token); 
        this.router.navigate(['/dashboard']); 
      }, error => {
      });
  }
}
