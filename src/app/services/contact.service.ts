import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = environment.baseUrl;
  }
  private baseUrl:string;

  getContacts() : Observable<Contact[]> {
    const requestUrl = `${this.baseUrl}/contact/get`;
    return this.httpClient.get<Contact[]>(requestUrl);
  }

  getContact(id: number) : Observable<Contact> {
    const requestUrl = `${this.baseUrl}/contact/get/${id}`;
    return this.httpClient.get<Contact>(requestUrl);
  }

  saveContact(contact: Contact) : Observable<boolean> {
    const requestUrl = `${this.baseUrl}/contact/save`;
    return this.httpClient.post<boolean>(requestUrl, contact);
  }

  updateContact(id: number, contact: Contact) : Observable<boolean> {
    const requestUrl = `${this.baseUrl}/contact/update/${id}`;
    return this.httpClient.post<boolean>(requestUrl, contact);
  }

  deleteContact(id: number) : Observable<boolean> {
    const requestUrl = `${this.baseUrl}/contact/delete/${id}`;
    return this.httpClient.delete<boolean>(requestUrl);
  }
}
