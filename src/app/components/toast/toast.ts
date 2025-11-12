import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastNotify } from '@services/toast';
import { LucideAngularModule, CheckCircle2, XCircle, XIcon, MessageCircleWarningIcon, InfoIcon } from 'lucide-angular';

@Component({
  selector: 'app-toast',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './toast.html'
})
export class Toast {
  toastService = inject(ToastNotify);

  readonly CheckCircle2 = CheckCircle2;
  readonly XCircle = XCircle;
  readonly XIcon = XIcon;
  readonly MessageCircleWarningIcon = MessageCircleWarningIcon;
  readonly InfoIcon = InfoIcon;
}
