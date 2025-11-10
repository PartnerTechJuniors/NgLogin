import { AuthService } from '@/app/services/auth';
import { User, UserService } from '@/app/services/user';
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
  private userService = inject(UserService);
  authService = inject(AuthService);
  me = signal<User | null>(null);

  toggleDropdownUser(){
    this.openDropdownProfile.set(!this.openDropdownProfile());
  }

  toggleSidebar(){
    this.openSidebar.set(!this.openSidebar());
  }

  async ngOnInit(){
    (await this.userService.getMe()).subscribe({
      next: async (data) => {
        this.me.set(data);
      }
    })
  }
}
