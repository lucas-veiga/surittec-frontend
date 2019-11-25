import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Credentials } from "./credentials";
import { tap } from "rxjs/operators";
import * as jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";

export class JWT {
  sub: string;
  perfis: string[];
  exp: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  resourceUrl = `${environment.baseUrl}/login`;
  private authenticated = false;
  private tokenData: JWT;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public login(credentials: Credentials) {
    return this.http.post<string>(this.resourceUrl, credentials, {observe: "response"})
      .pipe(tap(res => this.getAuthorization(res)));
  }

  public isAuthenticated(): boolean {
    this.handleAuth(localStorage.getItem('token'));
    return this.authenticated;
  }

  public isAdmin(): boolean {
    return this.tokenData && this.tokenData.perfis.includes('ADMIN');
  }

  private getAuthorization(res: HttpResponse<string>) {
    const token = res.headers.get('Authorization').substr(7);
    this.handleAuth(token);
    this.router.navigate(['/']);
  }

  private handleAuth(token: string) {
    if (!token) return;
    localStorage.setItem('token', token);
    this.tokenData = this.decodeJWT(token);
    this.authenticated = true;
    this.setAutoLogout();
  }

  private setAutoLogout() {
    setTimeout(() => {
      this.authenticated = false;
      this.tokenData = null;
    }, this.tokenData.exp);
  }

  private decodeJWT(token: string): JWT {
    return jwt_decode(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.authenticated = false;
    this.tokenData = null;
    this.router.navigate(['/login']);
  }
}
