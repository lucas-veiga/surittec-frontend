import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  resourceUrl = `${environment.baseUrl}/clientes`;

  constructor(private http: HttpClient) { }

  public getClientes() {
    return this.http.get(this.resourceUrl, {observe: "body"});
  }

  public getCliente(id: number) {
    return this.http.get(`${this.resourceUrl}/${id}`, {observe: "body"});
  }
}
