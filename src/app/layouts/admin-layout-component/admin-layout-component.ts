import { AuthService } from '@/app/services/auth';
import { User } from '@/app/types/users';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ThemeToggle } from "@components/theme-toggle/theme-toggle";
import { LucideAngularModule, LayoutDashboardIcon, UsersRound} from 'lucide-angular';
import { Toast } from "@components/toast/toast";

@Component({
  selector: 'app-admin-layout-component',
  imports: [RouterLink, NgClass, ThemeToggle, LucideAngularModule, Toast],
  templateUrl: './admin-layout-component.html',
  styles: ``,
})
export class AdminLayoutComponent implements OnInit{
  openDropdownProfile = signal(false);
  openSidebar = signal(false);
  authService = inject(AuthService);
  me = signal<User | null>(null);

  menuItems = signal([
    { name: 'Dashboard', path: '/dashboard/welcome', icon: LayoutDashboardIcon, roles: ['ADMIN','USER']},
    { name: 'Usuarios', path: '/dashboard/users', icon: UsersRound, roles: ['ADMIN'] }
  ]);

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
