import { AuthLayoutComponent } from '@layouts/auth-layout-component/auth-layout-component';
import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AuthService, RegisterRequest } from '@services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { countries } from '@/app/data/static';

@Component({
  selector: 'app-register-component',
  imports: [AuthLayoutComponent, RouterLink, FormsModule],
  templateUrl: './register-component.html',
  styles: ``,
})
export class RegisterComponent {
  currentStep: number = 1;
  public countries = signal<string[]>(countries);

  formData: RegisterRequest = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    country: ''
  };
  
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private authService: AuthService) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  nextStep(): void {
    this.errorMessage = '';

    // Validaciones del paso 1
    if (!this.formData.firstname || !this.formData.lastname || !this.formData.country) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    if (this.formData.firstname.length < 2) {
      this.errorMessage = 'El nombre debe tener al menos 2 caracteres';
      return;
    }

    if (this.formData.lastname.length < 2) {
      this.errorMessage = 'El apellido debe tener al menos 2 caracteres';
      return;
    }

    this.currentStep = 2;
  }

  previousStep(): void {
    this.errorMessage = '';
    this.currentStep = 1;
  }

  onSubmit(): void {
    this.errorMessage = '';

    // Validaciones del paso 2
    if (!this.formData.username || !this.formData.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.username)) {
      this.errorMessage = 'Por favor, ingresa un correo electrónico válido';
      return;
    }

    if (this.formData.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (this.formData.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.formData).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.navigateToDashboard();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
        } else if (error.status === 400) {
          this.errorMessage = 'Datos inválidos. Verifica la información ingresada.';
        } else if (error.status === 409) {
          this.errorMessage = 'El usuario ya existe. Intenta con otro correo.';
        } else {
          this.errorMessage = error.error?.message || 'Error al registrar. Intenta nuevamente.';
        }
      }
    });
  }
}