import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const isLoggedIn = !!localStorage.getItem('token'); // Verifica si hay un token

    if (isLoggedIn) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false; // Bloquea el acceso
    }
  }
}
