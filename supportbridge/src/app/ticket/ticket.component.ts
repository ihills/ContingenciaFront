import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
interface Company {
  companyid: string;
  company_name: string;
}

interface Catalogue {
  cat_id: number;
  cat_name: string;
  cat_service: string;
  cat_environment: string;
  cat_platform: string;
  cat_specification: string;
  cat_assigment_group: string;
  cat_impact: number | null;
  cat_urgency: number | null;
  cat_sys_id: string;
  cat_company: string;
}
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
})

export class TicketComponent implements OnInit {
  
  companyControl: FormControl = new FormControl('');
  filteredCompanies: Company[] = []; 

  ticketForm: FormGroup;
  dCategories : any;
  dCompanies : any;
  dSubcategory : any; 
  dSubstate : any;
  dCatalogue : any;
  dIncidenttype : any;
  dSysUsers : any;
  dDomains : any;
  dPriority : any;
  dUserData : any;
  v_plnned_rut : any;
  v_company_id : any;

  vUser_id : any; 
  vUserName : any; 
  vTitle : any;
  vDescription : any; 
  vStatus : any;
  vCreated_at : any;
  vCompanyid : any; 
  vCategoryid : any;
  showUserSelection: boolean = false;
  vSubcategoryid : any; 
  vSubstateid : any; 
  vCatalogue: any;
  vPriorityid : any;
  vIncidenttypeid : any; 
  vDomainid : any;
  vUpdated_at : any;
  vShortDesc : any;
  currentUser: any;

  successMessage: string = '';
  errorMessage: string = '';

  cat_assigment_group: any[] = [];
  cat_environment: any[] = []; 
  cat_impact: any[] = []; 
  cat_platform: any[] = [];
  cat_service: any[] = []; 
  cat_specification: any[] = [];
  cat_sys_id: any[] = []; 
  cat_urgency: any[] = [];
  selectedCatalog:any;
  sysUsers:any;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.ticketForm = this.fb.group({
      user_id: [null],
      incidenttypeid: [null],
      created_at: [''],
      updated_at: [''],
      shortdesc: [''],
      description: [''],
      cat_id:[''],
      planned_for:[''],
      contact_type:[''],
      applicant:[''],
      companyid:[''],
      planned_rut:[''],
      phone_number:[''],
      planned_email:[''],
      planned_charge:['']
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
    this.loadCatalogue();
    this.loadPriority(); 

    this.companyControl = new FormControl(); 

    this.companyControl.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged()
    ).subscribe(value => {
      if (value && value.length >= 3) {
        this.filterCompanies(value);
      } else {
        this.filteredCompanies = [];
      }
    });

  }
  
  filterCompanies(searchTerm: string) {
    this.filteredCompanies = this.dCompanies.filter((company: Company) =>
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onCatalogChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = Number(selectElement.value);
    this.getCatalogByID(selectedId);

  }

  getCatalogByID(selectedId:any){
    this.selectedCatalog = this.dCatalogue.find((catalogo:any) => catalogo.cat_id === selectedId);
    
    if (this.selectedCatalog) {
    } else {
    }
  }

  searchApplicant() {
    this.sysUsers = [];
    const v_plnned_rut = this.ticketForm.value.planned_rut;
    const v_company_id = this.ticketForm.value.companyid;
    this.apiService.getSysUsers({ company_id: v_company_id, employee_number: v_plnned_rut }).subscribe(
      (data) => {
        this.sysUsers = data;

        if (this.sysUsers.length > 1) {
          this.showUserSelection = true;
        } else if (this.sysUsers.length === 1) {
          this.ticketForm.patchValue({ planned_for: this.sysUsers[0].user_name });
          this.ticketForm.patchValue({ planned_email: this.sysUsers[0].email });
          this.ticketForm.patchValue({ phone_number: this.sysUsers[0].mobile_phone });
          this.ticketForm.patchValue({ planned_charge: this.sysUsers[0].title });
        }
      },
      (error) => {
      }
    );
  }

  selectUser(user:any) {
    this.ticketForm.patchValue({ planned_for: user.user_name });
    this.ticketForm.patchValue({ planned_email: user.email });
    this.ticketForm.patchValue({ phone_number: user.mobile_phone });
    this.ticketForm.patchValue({ planned_charge: user.title });
  
  }

  acceptUserSelection() {

    this.showUserSelection = false;
  }

  cancelUserSelection() {
    this.showUserSelection = false;
  }

  selectCompany(company: any) {
    this.ticketForm.patchValue({
      companyid: company.companyid, 
    });
    this.companyControl.setValue(company.company_name); 
    this.filteredCompanies = [];
  }

  onInputChange() {
    
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
    this.ticketForm.patchValue({ applicant: this.ticketForm.value.planned_for });
    this.ticketForm.patchValue({ categoryid: 0 });
    this.ticketForm.patchValue({ domainid: 0 });
    this.ticketForm.patchValue({ priorityid: 0 });
    this.ticketForm.patchValue({ subcategoryid: 0 });
    this.ticketForm.patchValue({ substateid: 0 });


//    if (this.ticketForm.valid) {
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
//    } else {
//      this.errorMessage = 'Por favor, completa todos los campos requeridos.';
//      this.successMessage = '';
//    }
  }

  cancel(){
    this.router.navigate(['/dashboard']); 
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

  loadCatalogue() {
    this.apiService.getCatalogue().subscribe(
      (data) => {
        this.dCatalogue = data;
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
