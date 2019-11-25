import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth/auth.service";
import { ClienteModule } from "./cliente/cliente.module";
import { AuthModule } from "./auth/auth.module";
import { TokenInterceptor } from "./interceptors/auth.interceptor";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ClienteModule,
    AuthModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule {
}
