import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-layout-component',
  imports: [RouterLink, NgClass],
  templateUrl: './admin-layout-component.html',
  styles: ``,
})
export class AdminLayoutComponent {
  openDropdownProfile = signal(false);

  toggleDropdown(){
    this.openDropdownProfile.set(!this.openDropdownProfile());
  }

}
