import { Component, input } from '@angular/core';
import { ThemeToggle } from "@/app/components/theme-toggle/theme-toggle";

@Component({
  selector: 'app-auth-layout-component',
  imports: [ThemeToggle],
  templateUrl: './auth-layout-component.html'
})
export class AuthLayoutComponent {
  namePage = input<string>('');
  messagePage = input<string>('');
}
