import { AfterViewInit, Component, OnChanges, SimpleChanges } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements AfterViewInit {

  constructor(private contactService: ContactService){  }
  ngAfterViewInit(): void {
    this.getContacts();
  }
  contacts: Contact[] | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    //this.getContacts();
  }

  getContacts(){
    this.contactService.getContacts()
    .subscribe({
      next:(response: Contact[]) => {
        this.contacts = response;
      }
    })  
  }
}
