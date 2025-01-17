import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
})

export class TicketComponent implements OnInit {
  ticketForm: FormGroup;
  dCategories : any;
  dCompanies : any;
  dSubcategory : any; 
  dSubstate : any;
  dIncidenttype : any;
  dDomains : any;
  dPriority : any;
  dUserData : any;

  vUser_id : any; 
  vUserName : any; 
  vTitle : any;
  vDescription : any; 
  vStatus : any;
  vCreated_at : any;
  vCompanyid : any; 
  vCategoryid : any;
  vSubcategoryid : any; 
  vSubstateid : any; 
  vPriorityid : any;
  vIncidenttypeid : any; 
  vDomainid : any;
  vUpdated_at : any;
  vShortDesc : any;
  
  currentUser: any;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.ticketForm = this.fb.group({
      user_id: [null, Validators.required],
      title: [''],
      status: [''],
      categoryid: [null, Validators.required],
      companyid: [null, Validators.required],
      subcategoryid: [null, Validators.required],
      substateid: [null, Validators.required],
      priorityid: [null, Validators.required],
      incidenttypeid: [null, Validators.required],
      domainid: [null, Validators.required],
      created_at: [''],
      updated_at: [''],
      shortdesc: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadUserData();
    this.loadCompanies();
    this.loadCategories();
    this.loadSubcategory();
    this.loadSubstate();
    this.loadIncidenttype();
    this.loadDomains();
    this.loadPriority(); 
  }

  loadUserData() {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUser = jwtDecode(token); 
      this.vUser_id = this.currentUser.id;
      this.loadUser();
      this.ticketForm.patchValue({ user_id: this.vUserName });
    }
  }

  submit() {
    this.ticketForm.patchValue({ user_id: this.vUser_id });
  
    if (this.ticketForm.valid) {
      this.apiService.createTicket(this.ticketForm.value).subscribe(
        response => {
          this.successMessage = 'Ticket guardado correctamente!';
          this.errorMessage = ''; 
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 3000);
        },
        error => {
          this.errorMessage = 'Error al guardar el ticket. Por favor, verifica los datos.';
          this.successMessage = ''; 
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
      this.successMessage = '';
    }
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(
      (data) => {
        this.dCategories = data; 
      },
      (error) => {
      }
    );
  }

  loadCompanies() {
    this.apiService.getCompanies().subscribe(
      (data) => {
        this.dCompanies = data;
      },
      (error) => {
      }
    );
  }

  loadUser() {
    this.apiService.getUser({ userid: this.vUser_id }).subscribe(
      (data) => {
        this.dUserData = data;
        this.vUser_id = this.dUserData[0].id;
        this.vUserName = this.dUserData[0].username;
      },
      (error) => {
      }
    );
  }

  loadSubcategory() {
    this.apiService.getSubcategory().subscribe(
      (data) => {
        this.dSubcategory = data;
      },
      (error) => {
      }
    );
  }
  
  loadSubstate() {
    this.apiService.getSubstate().subscribe(
      (data) => {
        this.dSubstate = data;
      },
      (error) => {
      }
    );
  }

  loadIncidenttype() {
    this.apiService.getIncidenttype().subscribe(
      (data) => {
        this.dIncidenttype = data;
      },
      (error) => {
      }
    );
  }
  
  loadDomains() {
    this.apiService.getDomains().subscribe(
      (data) => {
        this.dDomains = data;
      },
      (error) => {
      }
    );
  }
  
  loadPriority() {
    this.apiService.getPriority().subscribe(
      (data) => {
        this.dPriority = data;
      },
      (error) => {
      }
    );
  }

}
