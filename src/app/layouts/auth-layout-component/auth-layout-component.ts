import { Component, input } from '@angular/core';

@Component({
  selector: 'app-auth-layout-component',
  imports: [],
  templateUrl: './auth-layout-component.html'
})
export class AuthLayoutComponent {
  namePage = input<string>('');
  messagePage = input<string>('');
}
