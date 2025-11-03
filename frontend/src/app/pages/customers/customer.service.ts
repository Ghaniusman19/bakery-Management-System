import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private getcustomerapiURL = 'http://localhost:5000/api/users/get-customers';
  private addcustomerapiURL = 'http://localhost:5000/api/users/add-Customer';
  private updatecustomerapiURL = 'http://localhost:5000/api/users/update-customer/';

  constructor(private http: HttpClient) {}
  getCustomer(authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get(this.getcustomerapiURL, { headers });
  }

  addcustomer(data: any, authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.post(this.addcustomerapiURL, data, { headers });
  }
  updatecustomer(id: string, data: any, authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.put(`${this.updatecustomerapiURL}${id}`, data, { headers });
  }
  searchCustomer(searchText: string, authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    return this.http.get(`http://localhost:5000/api/users/search-customers?name=${searchText}`, {
      headers,
    });
  }
}
