import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private getproductapiURL = 'http://localhost:5000/api/users/get-product';
  private addproductapiURL = 'http://localhost:5000/api/users/add-product';
 private updateproductapiURL = 'http://localhost:5000/api/users/update-product/';
  constructor(private http: HttpClient) {}
  getProducts(authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.get(this.getproductapiURL, { headers });
  }

  addProducts(data: any, authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.post(this.addproductapiURL, data, { headers });
  }
   updateProduct(id: string, data: any, authToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
    return this.http.put(`${this.updateproductapiURL}${id}`, data, { headers });
  }
}
