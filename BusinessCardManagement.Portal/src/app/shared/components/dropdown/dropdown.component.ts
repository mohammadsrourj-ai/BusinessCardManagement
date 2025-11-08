import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownItem } from '../../types/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() showLabel: boolean = false;
  @Input() label: string = "";
  @Input() items: DropdownItem[] = [];
  @Input() showRequiredBoarder: boolean = false;
  @Input() labelLocationInRow: boolean = false;
  @Output() OnSelectItemEvent = new EventEmitter<DropdownItem>();
  @Input() selectedItem: DropdownItem = {
    Text: "",
    Value: 0
  }

  onSelectItem(item: DropdownItem) {
    this.selectedItem = item;
    this.OnSelectItemEvent.emit(this.selectedItem);
  }
}
