import { Component } from '@angular/core';
import { AuthLayoutComponent } from '@layouts/auth-layout-component/auth-layout-component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-component',
  imports: [AuthLayoutComponent, RouterLink],
  templateUrl: './login-component.html',
  styles: ``,
})
export class LoginComponent {

}
