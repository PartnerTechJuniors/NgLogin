import { Component, inject } from '@angular/core';
import { AuthLayoutComponent } from '@layouts/auth-layout-component/auth-layout-component';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { AuthService, LoginRequest } from '@services/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastNotify } from '@/app/services/toast';

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
  toastNotifyService = inject(ToastNotify);

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
        this.authService.getInfoUser();
        this.toastNotifyService.displayToast('Inicio de sesión exitoso', 'success', 'left');
        this.authService.navigateToDashboard();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status === 0) {
          this.toastNotifyService.displayToast('No se pudo conectar con el servidor. Verifica tu conexión.', 'error', 'left');
        } else if (error.status === 401) {
          this.toastNotifyService.displayToast('Credenciales incorrectas. Verifica tu correo y contraseña.', 'error', 'left');
        } else if (error.status === 404) {
          this.toastNotifyService.displayToast('Usuario no encontrado.', 'error', 'left');
        } else {
          this.toastNotifyService.displayToast(error.error?.message || 'Error al iniciar sesión. Intenta nuevamente.', 'error', 'left');
        }
      }
    });
  }
}