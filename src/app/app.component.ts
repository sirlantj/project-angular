import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data.service';
import {HttpClient} from '@angular/common/http';
import {Leads} from './models/leads';
import {Observable} from 'rxjs';
import {NotificationService} from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  listLeadsSourceResponse: Observable<Leads[]>;
  leadsSourceResponse: Observable<Leads>;
  leadsSource: Leads[] = [];
  leadsRequest: Leads;

  constructor(public httpClient: HttpClient,
              public dataService: DataService,
              private notifyService : NotificationService) {}
 
  ngOnInit() {
    this.getLeads(false);
  }

 tabChanged(event: any) {
    const label = event.tab.textLabel;
    console.log(label);

    if(label == "Invited")
    {
      return this.getLeads(false);
    }
    else if(label == "Accepted")
    {
      return this.getLeads(true);
    }
  }

  getLeads(accepted: boolean) {
    this.listLeadsSourceResponse = this.dataService.getLeads();  
    this.listLeadsSourceResponse.subscribe((leadsData: Leads[]) => {
      if (!accepted) {
        this.leadsSource = leadsData.filter(lead => lead.status == null || lead.status === "");
      }
      else {
        this.leadsSource = leadsData.filter(lead => lead.status == "A");
      }
      
    });
  }

  updateLead(id: string, category: number, contact: number, suburb: string, 
    price: number, status: string, description: string, dataCreated: string): void {
    this.leadsRequest = { 
      id: id,
      categoryId: category,
      contactId: contact,
      suburb: suburb,
      price: price,
      status: status,
      description: description,
      dateCreated: dataCreated
    };
  
    this.dataService.updateItem(this.leadsRequest)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getLeads(false);
          this.notifyService.showSuccess('Successfully', 3000);
          },
          error: (e) => this.notifyService.showError('Error occurred. Details: ' + e.name + ' ' + e.message, 8000)
      });
  }
}
