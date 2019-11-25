import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ClienteService } from "../cliente.service";

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss']
})
export class ClienteDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private clienteService: ClienteService) { }

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
