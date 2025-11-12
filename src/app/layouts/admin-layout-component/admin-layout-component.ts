import { AuthService } from '@/app/services/auth';
import { UserService } from '@/app/services/user';
import { User } from '@/app/types/users';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-layout-component',
  imports: [RouterLink, NgClass],
  templateUrl: './admin-layout-component.html',
  styles: ``,
})
export class AdminLayoutComponent implements OnInit{
  openDropdownProfile = signal(false);
  openSidebar = signal(false);
  authService = inject(AuthService);
  me = signal<User | null>(null);

  toggleDropdownUser(){
    this.openDropdownProfile.set(!this.openDropdownProfile());
  }

  toggleSidebar(){
    this.openSidebar.set(!this.openSidebar());
  }

  ngOnInit(){
    this.me.set(this.authService.getUser());
  }
}
