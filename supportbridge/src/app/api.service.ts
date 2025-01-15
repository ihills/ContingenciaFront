// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {} // Inyecta HttpClient

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tickets`, ticket);
  }

  getTickets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tickets`);
  }
}
