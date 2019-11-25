import { Component, OnInit } from '@angular/core';
import { Credentials } from "./credentials";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  credentials = new Credentials();
  errorMessage: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.credentials)
      .subscribe((_) => {},
        err => this.errorMessage = err.error.message);
  }
}
