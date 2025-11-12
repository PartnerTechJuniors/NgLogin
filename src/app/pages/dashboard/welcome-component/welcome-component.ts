import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminLayoutComponent } from "@/app/layouts/admin-layout-component/admin-layout-component";
import { User } from '@/app/types/users';
import { AuthService } from '@/app/services/auth';

@Component({
  selector: 'app-welcome-component',
  imports: [AdminLayoutComponent],
  templateUrl: './welcome-component.html',
  styles: ``,
})
export class WelcomeComponent implements OnInit{
  me = signal<User | null>(null);
  authService = inject(AuthService);

  ngOnInit(){
    this.me.set(this.authService.getUser());
  }
}
