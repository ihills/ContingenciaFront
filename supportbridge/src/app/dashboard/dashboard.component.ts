import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  dTickets:any;

  constructor(private apiService: ApiService) {}

  ngOnInit(){
    this.loadTickets();
  }

  loadTickets() {
    this.apiService.getTickets().subscribe(
      (data) => {
        this.dTickets = data;
      },
      (error) => {
      }
    );
  }
}
