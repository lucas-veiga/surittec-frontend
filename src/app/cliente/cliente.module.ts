import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from "./cliente.component";
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { RouterModule } from "@angular/router";
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IsAdminDirective } from './is-admin.directive';


@NgModule({
  declarations: [ClienteComponent, ClienteDetailComponent, ClienteFormComponent, IsAdminDirective],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    FontAwesomeModule
  ]
})
export class ClienteModule { }
