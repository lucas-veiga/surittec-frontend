import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { ClienteService } from "./cliente.service";
import { finalize } from "rxjs/operators";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  faSpinner = faSpinner;
  loading = false;
  clientes;

  constructor(private authService: AuthService,
              private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.clienteService.listUpdated.subscribe((_) => this.getClientes());
    this.getClientes();
  }

  private getClientes() {
    this.loading = true;
    this.clienteService.getClientes()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (response) => this.clientes = response
      );
  }
}
