import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Leads} from '../models/leads';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://localhost:44389/leads';

  constructor (private httpClient: HttpClient) {}

  getLeads(): Observable<Leads[]> {
    return this.httpClient.get<Leads[]>(this.API_URL);
  }

 updateItem(leads: Leads): Observable<any> {
    return this.httpClient.put(this.API_URL, leads);
  }

}