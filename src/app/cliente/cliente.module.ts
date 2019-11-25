import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from "./cliente.component";
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { RouterModule } from "@angular/router";
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import {NgxMaskModule} from 'ngx-mask';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [ClienteComponent, ClienteDetailComponent, ClienteFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgxMaskModule.forChild(),
    FormsModule
  ]
})
export class ClienteModule { }
