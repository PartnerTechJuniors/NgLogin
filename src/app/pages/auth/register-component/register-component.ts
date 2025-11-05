import { AuthLayoutComponent } from '@layouts/auth-layout-component/auth-layout-component';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register-component',
  imports: [AuthLayoutComponent, RouterLink],
  templateUrl: './register-component.html',
  styles: ``,
})
export class RegisterComponent {

}
