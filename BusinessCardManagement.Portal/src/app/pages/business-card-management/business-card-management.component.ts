import { Component } from '@angular/core';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { PagedRequest } from '../../shared/types/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-business-card-management',
  standalone: true,
  imports: [PaginationComponent, LoadingComponent],
  templateUrl: './business-card-management.component.html'
})
export class BusinessCardManagementComponent {
  isLoading: boolean = false;
  pagedRequest: PagedRequest = {
    PageNumber: 1,
    PageSize: 10
  }

  onOageChange(pagedRequest: PagedRequest) {
    this.pagedRequest = pagedRequest;
  }
}
