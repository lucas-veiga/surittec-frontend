import { Component, OnInit } from '@angular/core';
import { Credentials } from "./credentials";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  credentials = new Credentials();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.credentials);
  }
}
