import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { PagedRequest } from '../../shared/types/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { BusinessCardManagementService } from '../../shared/services/business-card-management.service';
import { BusinessCard, FileType, GetAllBusinessCardRequest } from '../../shared/types/business-card-management';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-card-management',
  standalone: true,
  imports: [PaginationComponent, LoadingComponent, CommonModule],
  templateUrl: './business-card-management.component.html'
})
export class BusinessCardManagementComponent implements OnInit {


  isLoading: boolean = false;
  pagedRequest: PagedRequest = {
    PageNumber: 1,
    PageSize: 10
  }

  businessCards: BusinessCard[] = [];

  businessCardRequest: GetAllBusinessCardRequest = {
    Name: null,
    DateOfBirth: null,
    Email: null,
    Gender: null,
    Phone: null
  }

  exportBusinessCardRequest: GetAllBusinessCardRequest = {
    Name: null,
    DateOfBirth: null,
    Email: null,
    Gender: null,
    Phone: null
  }

  exportFileType: FileType = FileType.Csv;
  exportPagedRequest: PagedRequest = {
    PageNumber: 1,
    PageSize: 10
  };

  totalItems: number = 0;
  constructor(private businessCardManagement: BusinessCardManagementService) { }

  ngOnInit(): void {
    this.getBusinessCards();
  }

  getBusinessCards() {

    this.isLoading = true;
    this.businessCardManagement.getBusinessCards(this.businessCardRequest, this.pagedRequest).subscribe({
      next: (response: any) => {
        this.businessCards = response.responseData.items;
        this.totalItems = response.responseData.totalCount;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Something went wrong', err);
      }
    });
  }

  exportBusinessCards() {
    this.isLoading = true;
    this.businessCardManagement.exportBusinessCards(this.exportFileType, this.businessCardRequest, this.exportPagedRequest)
      .subscribe({
        next: (response: Blob) => {
          this.isLoading = false;

          const fileURL = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = fileURL;

          a.download = `businesscards.${this.exportFileType.toString().toLowerCase()}`;
          a.click();

          window.URL.revokeObjectURL(fileURL);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Something went wrong', err);
        }
      });
  }

  exportAllCSV() {
    this.exportFileType= FileType.Csv;

    this.exportPagedRequest = {
      PageNumber: 1,
      PageSize: this.totalItems
    };

    this.exportBusinessCardRequest = {
      Name: null,
      DateOfBirth: null,
      Email: null,
      Gender: null,
      Phone: null
    };

    this.exportBusinessCards();
  }

  exportAllXML() {
    this.exportFileType = FileType.Xml;
    this.exportPagedRequest = {
      PageNumber: 1,
      PageSize: this.totalItems
    };

    this.exportBusinessCardRequest = {
      Name: null,
      DateOfBirth: null,
      Email: null,
      Gender: null,
      Phone: null
    };

    this.exportBusinessCards();
  }

  exportPageCSV() {
    this.exportFileType = FileType.Csv;
    this.exportPagedRequest = this.pagedRequest;
    this.exportBusinessCardRequest = this.businessCardRequest;
    this.exportBusinessCards();
  }

  exportPageXML() {
    this.exportFileType = FileType.Xml;
    this.exportPagedRequest = this.pagedRequest;
    this.exportBusinessCardRequest = this.businessCardRequest;
    this.exportBusinessCards();
  }




  onPageChange(pagedRequest: PagedRequest) {
    this.pagedRequest = pagedRequest;
    this.getBusinessCards();
  }
}
