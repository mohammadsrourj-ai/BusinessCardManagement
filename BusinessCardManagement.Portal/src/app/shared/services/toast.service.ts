import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ToastType } from '../types/common';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private renderer: Renderer2;
  private container: HTMLElement | null = null;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private getContainer(): HTMLElement {
    if (!this.container) {
      this.container = document.getElementById('toast-container');
      if (!this.container) {
        this.container = document.body;
      }
    }
    return this.container;
  }

  show(message: string, type: ToastType) {
    const container = this.getContainer();

    const toast = this.renderer.createElement('div');
    const bgColor =
      type === ToastType.Success
        ? 'bg-success'
        : 'bg-danger';

    this.renderer.addClass(toast, 'd-flex');
    this.renderer.addClass(toast, 'justify-content-between');
    this.renderer.addClass(toast, 'align-items-center');
    this.renderer.addClass(toast, 'w-100');
    this.renderer.addClass(toast, bgColor);
    this.renderer.addClass(toast, 'text-white');
    this.renderer.addClass(toast, 'rounded');
    this.renderer.addClass(toast, 'rounded-5');
    this.renderer.addClass(toast, 'fw-bold');
    this.renderer.addClass(toast, 'px-4');
    this.renderer.addClass(toast, 'p-3');
    this.renderer.addClass(toast, 'fs-6');
    this.renderer.addClass(toast, 'my-1');

    this.renderer.setStyle(toast, 'opacity', '0');
    this.renderer.setStyle(toast, 'transition', 'opacity 0.3s ease');
    this.renderer.setStyle(toast, 'z-index', '1055');

    const messageDiv = this.renderer.createElement('div');
    const text = this.renderer.createText(message);
    this.renderer.appendChild(messageDiv, text);

    const buttonDiv = this.renderer.createElement('div');
    const closeBtn = this.renderer.createElement('button');
    this.renderer.addClass(closeBtn, 'bg-transparent');
    this.renderer.addClass(closeBtn, 'border-0');
    this.renderer.addClass(closeBtn, 'text-white');
    const icon = this.renderer.createElement('i');
    this.renderer.addClass(icon, 'fa-solid');
    this.renderer.addClass(icon, 'fa-xmark');
    this.renderer.appendChild(closeBtn, icon);
    this.renderer.appendChild(buttonDiv, closeBtn);

    this.renderer.appendChild(toast, messageDiv);
    this.renderer.appendChild(toast, buttonDiv);
    this.renderer.appendChild(container, toast);

    setTimeout(() => this.renderer.setStyle(toast, 'opacity', '1'), 50);

    closeBtn.addEventListener('click', () => this.destroyToast(toast));

    setTimeout(() => this.destroyToast(toast), 5000);
  }

  private destroyToast(toast: HTMLElement) {
    this.renderer.setStyle(toast, 'opacity', '0');
    setTimeout(() => {
      if (toast.parentNode) {
        this.renderer.removeChild(toast.parentNode, toast);
      }
    }, 300);
  }
}
