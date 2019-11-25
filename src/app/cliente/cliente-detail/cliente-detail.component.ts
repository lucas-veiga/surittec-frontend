import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ClienteService } from "../cliente.service";
import { faEdit, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss']
})
export class ClienteDetailComponent implements OnInit, OnDestroy {

  faEdit = faEdit;
  faTimesCircle = faTimesCircle;
  faSpinner = faSpinner;
  loading: boolean;
  cliente;
  routeSub: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: any) => {
        this.loading = true;
        this.clienteService.getCliente(params['id'])
          .pipe(finalize(() => this.loading = false))
          .subscribe(
            (response) => this.cliente = response
          );
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  delete() {
    this.clienteService.delete(this.cliente.id).subscribe(
      (_) => {
        this.clienteService.listUpdated.next();
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    );
  }
}
