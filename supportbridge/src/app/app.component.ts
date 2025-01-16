import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  
  constructor(private router: Router) {} 

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then(success => {
      if (success) {
      } else {
      }
    }).catch(err => {
      alert('Error al eliminar token');
    });
  }
}
