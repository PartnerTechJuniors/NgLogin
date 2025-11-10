import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User, UserService, UpdateUserRequest } from '@services/user';
import { AdminLayoutComponent } from "@/app/layouts/admin-layout-component/admin-layout-component";
import { countries } from '@/app/data/static';

@Component({
  selector: 'app-users',
  imports: [FormsModule, AdminLayoutComponent],
  templateUrl: './users.html',
  styles: ``,
})
export class Users {
  // Signals
  users = signal<User[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  searchTerm = signal<string>('');

  // Modal states
  showEditModal = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);
  selectedUser = signal<User | null>(null);

  // Edit form data
  editForm = signal<UpdateUserRequest>({});

  // Lista de países
  public countries = signal<string[]>(countries);

  // Computed - Usuarios filtrados
  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.users();

    return this.users().filter(user =>
      user.username.toLowerCase().includes(term) ||
      user.firstname.toLowerCase().includes(term) ||
      user.lastname.toLowerCase().includes(term) ||
      user.country.toLowerCase().includes(term)
    );
  });

  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        if (error.status === 0) {
          this.errorMessage.set('No se pudo conectar con el servidor.');
        } else if (error.status === 401) {
          this.errorMessage.set('No autorizado. Por favor inicia sesión nuevamente.');
        } else {
          this.errorMessage.set('Error al cargar los usuarios.');
        }
      }
    });
  }

  openEditModal(user: User): void {
    this.selectedUser.set(user);
    this.editForm.set({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      country: user.country,
      role: user.role,
      enabled: user.enabled
    });
    this.showEditModal.set(true);
    this.clearMessages();
  }

  closeEditModal(): void {
    this.showEditModal.set(false);
    this.selectedUser.set(null);
    this.editForm.set({});
  }

  updateUser(): void {
    const user = this.selectedUser();
    if (!user) return;

    this.isLoading.set(true);
    this.clearMessages();

    this.userService.updateUser(user.id, this.editForm()).subscribe({
      next: () => {
        this.successMessage.set('Usuario actualizado exitosamente');
        this.loadUsers();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        if (error.status === 400) {
          this.errorMessage.set('Datos inválidos. Verifica la información.');
        } else if (error.status === 404) {
          this.errorMessage.set('Usuario no encontrado.');
        } else {
          this.errorMessage.set('Error al actualizar el usuario.');
        }
      }
    });
    
    this.closeEditModal();
  }

  toggleUserEnabled(user: User): void {
    this.clearMessages();

    const updatedEnabled = !user.enabled;

    this.userService.updateUser(user.id, { enabled: updatedEnabled }).subscribe({
      next: () => {
        // Actualizar el usuario en la lista local
        this.users.update(users =>
          users.map(u => u.id === user.id ? { ...u, enabled: updatedEnabled } : u)
        );
        this.successMessage.set(`Usuario ${updatedEnabled ? 'habilitado' : 'deshabilitado'} exitosamente`);
        setTimeout(() => this.clearMessages(), 3000);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set('Error al cambiar el estado del usuario.');
        setTimeout(() => this.clearMessages(), 3000);
      }
    });
  }

  changeUserRole(user: User, newRole: 'USER' | 'ADMIN'): void {
    this.clearMessages();

    this.userService.updateUser(user.id, { role: newRole }).subscribe({
      next: () => {
        // Actualizar el usuario en la lista local
        this.users.update(users =>
          users.map(u => u.id === user.id ? { ...u, role: newRole } : u)
        );
        this.successMessage.set('Rol actualizado exitosamente');
        setTimeout(() => this.clearMessages(), 3000);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set('Error al cambiar el rol del usuario.');
        setTimeout(() => this.clearMessages(), 3000);
      }
    });
  }

  openDeleteModal(user: User): void {
    this.selectedUser.set(user);
    this.showDeleteModal.set(true);
    this.clearMessages();
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false);
    this.selectedUser.set(null);
  }

  confirmDelete(): void {
    const user = this.selectedUser();
    if (!user) return;

    this.isLoading.set(true);
    this.clearMessages();

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.successMessage.set('Usuario eliminado exitosamente');
        this.loadUsers();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.set(false);
        if (error.status === 404) {
          this.errorMessage.set('Usuario no encontrado.');
        } else {
          this.errorMessage.set('Error al eliminar el usuario.');
        }
      }
    });

    this.closeDeleteModal();
  }

  clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  updateEditForm(field: keyof UpdateUserRequest, value: any): void {
    this.editForm.update(form => ({ ...form, [field]: value }));
  }
}
