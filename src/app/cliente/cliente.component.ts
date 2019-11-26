import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { ClienteService } from "./cliente.service";
import { finalize } from "rxjs/operators";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { ActivationStart, NavigationStart, Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  faSpinner = faSpinner;
  loading = false;
  clientes;
  @ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;

  constructor(private router: Router,
              private authService: AuthService,
              private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.clienteService.listUpdated.subscribe((_) => this.getClientes());
    this.getClientes();
    this.router.events.subscribe(e => {
      console.log(e);
      if (e instanceof ActivationStart && e.snapshot.outlet === "cliente")
        this.outlet.deactivate();
    });
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
