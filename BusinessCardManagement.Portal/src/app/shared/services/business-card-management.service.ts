import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BusinessCardForm, FileType, GetAllBusinessCardRequest } from '../types/business-card-management';
import { PagedRequest } from '../types/common';

@Injectable({
  providedIn: 'root'
})
export class BusinessCardManagementService {

  private baseUrl = environment.apiUrl;
  private baseController = 'BusinessCards';

  constructor(private http: HttpClient) { }

  addNewBusinessCard(businessCardForm: BusinessCardForm) {

    let requestBody: any = {
      name: businessCardForm.Name,
      gender: businessCardForm.Gender,
      email: businessCardForm.Email,
      phone: businessCardForm.Phone,
      dateOfBirth: businessCardForm.DateOfBirth,
      address: businessCardForm.Address,
    };

    if (businessCardForm.Photo) {
      requestBody.photo = businessCardForm.Photo;
    }

    return this.http.post(`${this.baseUrl}/${this.baseController}`, requestBody
    );
  }

  importBusinessCards(file: File) {

    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/${this.baseController}/Import`, formData);
  }

  getBusinessCards(businessCardRequest: GetAllBusinessCardRequest, pagedRequest: PagedRequest) {
    let params = new HttpParams()
      .set('PageNumber', pagedRequest.PageNumber)
      .set('PageSize', pagedRequest.PageSize)

    if (businessCardRequest.Name) {
      params = params.set('Name', businessCardRequest.Name)
    }

    if (businessCardRequest.Gender) {
      params = params.set('Gender', businessCardRequest.Gender)
    }

    if (businessCardRequest.DateOfBirth) {
      params = params.set('DateOfBirth', businessCardRequest.DateOfBirth)
    }

    if (businessCardRequest.Email) {
      params = params.set('Email', businessCardRequest.Email)
    }

    if (businessCardRequest.Phone) {
      params = params.set('Phone', businessCardRequest.Phone)
    }

    return this.http.get(`${this.baseUrl}/${this.baseController}/All`, { params });
  }

  exportBusinessCards(fileType: FileType, businessCardRequest: GetAllBusinessCardRequest, pagedRequest: PagedRequest) {
    let params = new HttpParams()
      .set('PageNumber', pagedRequest.PageNumber)
      .set('PageSize', pagedRequest.PageSize)
      .set('FileType', fileType)

    if (businessCardRequest.Name) {
      params = params.set('Name', businessCardRequest.Name)
    }

    if (businessCardRequest.Gender) {
      params = params.set('Gender', businessCardRequest.Gender)
    }

    if (businessCardRequest.DateOfBirth) {
      params = params.set('DateOfBirth', businessCardRequest.DateOfBirth)
    }

    if (businessCardRequest.Email) {
      params = params.set('Email', businessCardRequest.Email)
    }

    if (businessCardRequest.Phone) {
      params = params.set('Phone', businessCardRequest.Phone)
    }

    return this.http.get(`${this.baseUrl}/${this.baseController}/Export`, { params });
  }

  DeleteBusinessCard(businessCardId: number) {
    return this.http.delete(`${this.baseUrl}/${this.baseController}/${businessCardId}`
    );
  }
}
