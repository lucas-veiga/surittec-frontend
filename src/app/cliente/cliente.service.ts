import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable, Subject } from "rxjs";

export interface Estado {
  id: number;
  sigla: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  resourceUrl = `${environment.baseUrl}/api/clientes`;
  listUpdated = new Subject();

  constructor(private http: HttpClient) { }

  public getClientes() {
    return this.http.get(this.resourceUrl, {observe: "body"});
  }

  public getCliente(id: number) {
    return this.http.get(`${this.resourceUrl}/${id}`, {observe: "body"});
  }

  delete(id: number) {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  public saveCliente(cliente) {
    return this.http.post(this.resourceUrl, cliente);
  }

  public updateCliente(cliente) {
    return this.http.put(this.resourceUrl, cliente);
  }

  public consultaCep(cep: string) {
    return this.http.get(`//viacep.com.br/ws/${cep}/json`);
  }

  public getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>('assets/json/estadosbr.json');
  }
}
