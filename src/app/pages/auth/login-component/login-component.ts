import { Component, inject } from '@angular/core';
import { AuthLayoutComponent } from '@layouts/auth-layout-component/auth-layout-component';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AuthService, LoginRequest } from '@services/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-component',
  imports: [AuthLayoutComponent, RouterLink, FormsModule],
  templateUrl: './login-component.html',
  styles: ``,
})
export class LoginComponent {
  formData: LoginRequest = {
    username: '',
    password: ''
  };
  
  rememberMe: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  authService = inject(AuthService);

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';

    // Validaciones
    if (!this.formData.username || !this.formData.password) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.formData).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.navigateToDashboard();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
        } else if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
        } else if (error.status === 404) {
          this.errorMessage = 'Usuario no encontrado.';
        } else {
          this.errorMessage = error.error?.message || 'Error al iniciar sesión. Intenta nuevamente.';
        }
      }
    });
  }
}