import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { DropdownItem, PagedRequest } from '../../types/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass, DropdownComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;
  pageSizes: DropdownItem[] = [
    {
      Text: "10",
      Value:10
    },
    {
      Text: "20",
      Value: 20
    },
    {
      Text: "50",
      Value: 50
    },
    {
      Text: "100",
      Value: 100
    },
  ];
  pagedRequest: PagedRequest = {
    PageNumber: 1,
    PageSize:10
  }
  selectedItemInTotalDropdown: DropdownItem = {
    Text: "10",
    Value:10
  }

  @Output() pageChanged = new EventEmitter<PagedRequest>();

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
  }

  changePage(page: number) {
    if (!Number.isFinite(page)) return;
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pagedRequest = {
        PageNumber: this.currentPage,
        PageSize: this.itemsPerPage
      }

      this.pageChanged.emit(this.pagedRequest);
    }
  }

  toNumber(value: number | string): number {
    return typeof value === 'number' ? value : Number(value);
  }

  get pagesToShow(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: (number | string)[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);

    if (current > 3) {
      pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }

    pages.push(total);
    return pages;
  }



  onPageSizeChange(item: DropdownItem) {
    this.itemsPerPage = item.Value;
    this.currentPage = 1;
    this.pagedRequest = {
      PageNumber: this.currentPage,
      PageSize: this.itemsPerPage
    }
    this.pageChanged.emit(this.pagedRequest);
  }

  reset() {
    this.currentPage = 1;
    this.pagedRequest = {
      PageNumber: 1,
      PageSize: 10
    }
    this.selectedItemInTotalDropdown = {
      Text: "10",
      Value: 10
    }

    this.itemsPerPage = 10;
    this.currentPage = 1;
  }
}
