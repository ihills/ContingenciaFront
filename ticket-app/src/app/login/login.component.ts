import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login() {
    // Simulación de autenticación (deberías usar un servicio real)
    if (this.username === 'user' && this.password === 'password') {
      localStorage.setItem('user', JSON.stringify({ username: this.username }));
      this.router.navigate(['/dashboard']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
