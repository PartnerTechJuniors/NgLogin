import { Injectable, signal } from '@angular/core';

interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

@Injectable({
  providedIn: 'root'
})
export class ToastNotify {
  public notifies = signal<Toast[]>([]);

  displayToast(message: string, type: Toast['type'] = 'success', position: Toast['position'] = 'bottom') {
    this.notifies.set([]);
    const id = Date.now();
    const newToast: Toast = { id, message, type, position };
    
    this.notifies.update(prev => [...prev, newToast]);

    setTimeout(() => this.removeToast(id), 20000);
  }

  removeToast(id: number) {
    this.notifies.update(prev => prev.filter(t => t.id !== id));
  }

  clearAll() {
    this.notifies.set([]);
  }
}
