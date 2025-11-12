import { DarkThemeSelectorService } from '@services/dark-theme-selector-service';
import { Component, inject, input, signal } from '@angular/core';
import { LucideAngularModule, SunIcon, MonitorIcon, MoonIcon} from 'lucide-angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './theme-toggle.html',
  styles: ``,
})
export class ThemeToggle {
    readonly SunIcon = SunIcon;
    readonly MoonIcon = MoonIcon;
    readonly MonitorIcon = MonitorIcon;
    darkThemeSelectorService = inject(DarkThemeSelectorService);
    openDropdownTheme = signal(false);
    extraClasses = input('');
}
