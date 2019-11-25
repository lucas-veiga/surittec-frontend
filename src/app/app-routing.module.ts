import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from "./cliente/cliente.component";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { AuthComponent } from "./auth/auth.component";
import { ClienteDetailComponent } from "./cliente/cliente-detail/cliente-detail.component";
import { ClienteFormComponent } from "./cliente/cliente-form/cliente-form.component";
import { CanLogGuard } from "./guards/can-log.guard";


const routes: Routes = [
  {
    path: 'cliente', component: ClienteComponent, canActivate: [AuthenticationGuard], children: [
      {path: 'new', component: ClienteFormComponent, canActivate: [AuthenticationGuard]},
      {path: ':id', component: ClienteDetailComponent, canActivate: [AuthenticationGuard]},
      {path: ':id/edit', component: ClienteFormComponent, canActivate: [AuthenticationGuard]}
    ]
  },
  {path: 'login', component: AuthComponent, canActivate: [CanLogGuard]},
  {path: '', redirectTo: '/cliente', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
