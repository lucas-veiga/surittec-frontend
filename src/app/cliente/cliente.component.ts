import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { ClienteService } from "./cliente.service";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  clientes;

  constructor(private authService: AuthService,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      (response) => this.clientes = response
    );
  }
}
