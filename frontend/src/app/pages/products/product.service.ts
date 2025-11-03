import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private getproductapiURL = 'http://localhost:5000/api/users/get-product';
  constructor(private http: HttpClient) {}
  getProducts(authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get(this.getproductapiURL, { headers });
  }
}
