// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getUser(id: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/getuser`, id);
  }
  
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tickets`, ticket);
  }

  getCatalogue(): Observable<any> {
    return this.http.get(`${this.apiUrl}/catalogue`);
  }

  getCompanies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/companies`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getSubcategory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/subcategory`);
  }
  
  getSubstate(): Observable<any> {
    return this.http.get(`${this.apiUrl}/substate`);
  }
  
  getIncidenttype(): Observable<any> {
    return this.http.get(`${this.apiUrl}/incidenttype`);
  }
  
  getDomains(): Observable<any> {
    return this.http.get(`${this.apiUrl}/domains`);
  }

  getSysUsers(companyID : any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sysusers`, companyID);
  }

  getPriority(): Observable<any> {
    return this.http.get(`${this.apiUrl}/priority`);
  }

  getTickets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tickets`);
  }

}
