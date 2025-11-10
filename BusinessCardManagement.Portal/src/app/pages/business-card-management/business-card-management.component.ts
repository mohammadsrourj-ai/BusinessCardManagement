import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { PagedRequest, ToastType } from '../../shared/types/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { BusinessCardManagementService } from '../../shared/services/business-card-management.service';
import { BusinessCard, BusinessCardForm, FileType, GetAllBusinessCardRequest } from '../../shared/types/business-card-management';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../shared/services/toast.service';
import { PopupComponent } from '../../shared/components/popup/popup.component';

@Component({
  selector: 'app-business-card-management',
  standalone: true,
  imports: [PaginationComponent, LoadingComponent, CommonModule, FormsModule, PopupComponent,NgClass],
  templateUrl: './business-card-management.component.html'
})
export class BusinessCardManagementComponent implements OnInit {

  @ViewChild('pager') pager!: PaginationComponent;

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

  businessCardIdToDelete: number = 0;

  totalItems: number = 0;
  deleteConfermationPopupVisible: boolean = false;
  addNewPopupVisible: boolean = false;

  createBusinessCardForm: BusinessCardForm = {
    Name: "",
    Gender: "",
    DateOfBirth: "",
    Email: "",
    Phone: "",
    Photo: null,
    Address: ""
  };
  businessCardFormNameValidation: boolean = false;
  businessCardFormGenderValidation: boolean = false;
  businessCardFormDateOfBirthValidation: boolean = false;
  businessCardFormEmailValidation: boolean = false;
  businessCardFormPhoneValidation: boolean = false;
  businessCardFormAddressValidation: boolean = false;
  createBusinessCardPopupValidationMassage: string = '';
  constructor(private businessCardManagement: BusinessCardManagementService, private toastService: ToastService) { }

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
        this.toastService.show('Something went wrong', ToastType.Eroor)
        console.error(err.error);
      }
    });
  }

  deleteBusinessCard() {
    this.isLoading = true;
    this.businessCardManagement.DeleteBusinessCard(this.businessCardIdToDelete).subscribe({
      next: (response: any) => {
        this.toastService.show("Business card deleted successfully", ToastType.Success)
        this.closeDeleteConfermationPopup();
        this.isLoading = false;
        this.resetFilters();
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.show(err.error, ToastType.Eroor)
        this.closeDeleteConfermationPopup();
      }
    });
  }


  showDeleteConfermationPopup(businessCardId: number) {
    this.businessCardIdToDelete = businessCardId;
    this.deleteConfermationPopupVisible = true;
  }

  closeDeleteConfermationPopup() {
    this.businessCardIdToDelete = 0;
    this.deleteConfermationPopupVisible = false;
  }

  showCreateBusinessCardPopup() {
    this.addNewPopupVisible = true;
  }

  createBusinessCard() {

    this.businessCardFormNameValidation = false;
    this.businessCardFormGenderValidation = false;
    this.businessCardFormDateOfBirthValidation = false;
    this.businessCardFormEmailValidation = false;
    this.businessCardFormPhoneValidation = false;
    this.businessCardFormAddressValidation = false;
    this.createBusinessCardPopupValidationMassage= '';

    var isValid: boolean = true;

    if (!this.createBusinessCardForm.Name.trim()) {
      isValid = false;
      this.businessCardFormNameValidation = true;
    }

    if (!this.createBusinessCardForm.Gender.trim()) {
      isValid = false;
      this.businessCardFormGenderValidation = true;
    }

    if (!this.createBusinessCardForm.DateOfBirth.trim()) {
      isValid = false;
      this.businessCardFormDateOfBirthValidation = true;
    }

    if (!this.createBusinessCardForm.Phone.trim()) {
      isValid = false;
      this.businessCardFormPhoneValidation = true;
    }

    if (!this.createBusinessCardForm.Email.trim()) {
      isValid = false;
      this.businessCardFormEmailValidation = true;
    }

    if (!this.createBusinessCardForm.Address.trim()) {
      isValid = false;
      this.businessCardFormAddressValidation = true;
    }

    if (!isValid) {
      this.createBusinessCardPopupValidationMassage = "Field/s is required";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.createBusinessCardForm.Email)) {
      this.businessCardFormEmailValidation = true;
      this.createBusinessCardPopupValidationMassage = "Invalid email address";
      return;
    }

    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phoneRegex.test(this.createBusinessCardForm.Phone)) {
      this.businessCardFormPhoneValidation = true;
      this.createBusinessCardPopupValidationMassage = "Invalid phone number";
      return;
    }


    this.isLoading = true;
    this.businessCardManagement.addNewBusinessCard(this.createBusinessCardForm).subscribe({
      next: (response: any) => {
        this.toastService.show("Business card created successfully", ToastType.Success)
        this.closeCreateBusinessCardPopup();
        this.isLoading = false;
        this.resetFilters();
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.show(err.error, ToastType.Eroor)
        this.closeCreateBusinessCardPopup();
      }
    });
  }

  closeCreateBusinessCardPopup() {
    this.createBusinessCardForm = {
      Name: "",
      Gender: "",
      DateOfBirth: "",
      Email: "",
      Phone: "",
      Photo: null,
      Address: ""
    };

    this.businessCardFormNameValidation = false;
    this.businessCardFormGenderValidation = false;
    this.businessCardFormDateOfBirthValidation = false;
    this.businessCardFormEmailValidation = false;
    this.businessCardFormPhoneValidation = false;
    this.businessCardFormAddressValidation = false;
    this.createBusinessCardPopupValidationMassage = '';

    this.addNewPopupVisible = false;
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
          this.toastService.show('Something went wrong', ToastType.Eroor)
          console.error(err.error);
        }
      });
  }

  exportAllCSV() {
    this.exportFileType = FileType.Csv;

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

  search() {
    this.pagedRequest = {
      PageNumber: 1,
      PageSize: 10
    }
    this.pager.reset();
    this.getBusinessCards();
  }

  resetFilters() {
    this.businessCardRequest = {
      Name: null,
      Gender: null,
      DateOfBirth: null,
      Email: null,
      Phone: null
    };
    this.pagedRequest = {
      PageNumber: 1,
      PageSize: 10
    }
    this.pager.reset();
    this.getBusinessCards();
  }



  onPhotoSelected(event: any) {
    this.createBusinessCardPopupValidationMassage = "";
    const input = event.target; 
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      this.createBusinessCardPopupValidationMassage = "Only JPG, JPEG, PNG, and GIF images are allowed.";
      this.createBusinessCardForm.Photo = null;
      input.value = "";
      return;
    }
    input.value = "";
    const reader = new FileReader();
    reader.onload = () => {
      this.createBusinessCardForm.Photo = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  deletePhoto() {
    this.createBusinessCardForm.Photo = null;
  }
}
