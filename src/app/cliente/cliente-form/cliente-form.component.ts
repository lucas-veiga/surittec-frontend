import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ClienteService } from "../cliente.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private clienteService: ClienteService) {
  }

  cliente;
  routeSub: Subscription;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: any) => {
        this.clienteService.getCliente(params['id']).subscribe(
          (response) => this.cliente = response
        );
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
