import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  
  logout() {
    // Lógica para cerrar sesión (puedes agregar lo que necesites aquí)
    console.log('Cerrando sesión...');
    
    // Ejemplo: eliminar token del localStorage
    localStorage.removeItem('token');
    
    // Redirigir al login (si usas router)
    // this.router.navigate(['/login']);
  }
}
