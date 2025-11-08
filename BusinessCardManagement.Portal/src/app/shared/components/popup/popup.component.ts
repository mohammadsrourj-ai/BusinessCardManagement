import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [NgClass],
  templateUrl: './popup.component.html',
  animations: [
    trigger('popupAnimation', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'scale(0.8)',
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
          transform: 'scale(0.8)',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition('void => visible', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease-out'),
      ]),
      transition('visible => hidden', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'scale(0.8)' })
        ),
      ]),
    ]),
  ],
})
export class PopupComponent {
  @Input() title: string | null = null;
  @Input() showCloseButton = false;
  @Input() popupVisible = false;
  @Input() showTitle = false;
  @Input() hasNoPadding = false;
  @Input() popupWidth: string = "50%";
  @Input() popupHeight: string = "50%";
  @Output() closeButtonEvint = new EventEmitter<void>();

  onCloseButtonClick() {
    this.closeButtonEvint.emit();
  }
}
