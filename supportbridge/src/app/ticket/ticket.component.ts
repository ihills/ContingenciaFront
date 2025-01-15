import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service'; // Asegúrate de importar tu servicio API
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
})
export class TicketComponent {
  ticketForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.ticketForm = this.fb.group({
      user_id: [null, Validators.required], // Campo para user_id
      title: ['', Validators.required], // Campo para título
      description: ['', Validators.required], // Campo para descripción
      status: ['Open'], // Campo para estado, por defecto 'Open'
    });
  }

  submit() {
    if (this.ticketForm.valid) {
      this.apiService.createTicket(this.ticketForm.value).subscribe(response => {
        console.log('Ticket creado:', response);
        this.router.navigate(['/tickets']); // Redirige a la lista de tickets después de crear
      }, error => {
        console.error('Error al crear el ticket:', error);
      });
    }
  }
}
