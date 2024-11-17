import { AfterViewInit, Component, ElementRef, OnInit, SimpleChanges, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';
import { NgFor, NgIf } from '@angular/common';
import { SaveContactComponent } from "../save-contact/save-contact.component";
import { DeleteContactComponent } from "../delete-contact/delete-contact.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor, NgIf, SaveContactComponent, DeleteContactComponent],
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit, AfterViewInit {

  constructor(private contactService: ContactService, private ref: ElementRef, private modalService : NgbModal){  }  

  @ViewChild(SaveContactComponent) saveComponent?: SaveContactComponent;
  
  contacts: Contact[] | undefined;
  currentId: number = 0;
  deleteModel?: HTMLElement;
  saveModel?: HTMLElement;
  alertType: string = '';
  alertMessage: string = '';
  isAlert: boolean = false;

  ngOnInit(): void {
    this.getContacts();
  }

  ngAfterViewInit(): void {
    this.deleteModel = this.ref.nativeElement.querySelector("#deleteContactModelPopup");
    this.saveModel = this.ref.nativeElement.querySelector("#saveContactModelPopup");
  }

  getContacts(){
    this.contactService.getContacts()
    .subscribe({
      next:(response: Contact[]) => {
        this.contacts = response;
      }
    }); 
  }

  setCurrentId(id:number){
    this.currentId = id;
    this.isAlert = false;
    let backDropElem = document.getElementsByClassName('modal-backdrop')[0] as HTMLElement;
    backDropElem.style.display = 'block';
  }

  saveContact(id:number){
    this.setCurrentId(id);
    if(this.saveComponent != null)
    {
      this.saveComponent.id = id;
      this.saveComponent.getContact();
    }

  }

  deleteModelClose(){
    this.closeModel(this.deleteModel);
    this.getContacts();
  }

  saveModelClose(){
    this.closeModel(this.saveModel);
    this.getContacts();
  }

  closeModel(element?: HTMLElement){
    if(element){
      element.style.display = 'none';
      document.body.classList.remove('modal-open');
      let backDropElem = document.getElementsByClassName('modal-backdrop')[0] as HTMLElement;
      backDropElem.style.display = 'none';
    }    
  }

  deleteMessage(isSuccess: any){
    this.alertMessage = isSuccess ? 'Contact successfully deleted!!' :'There was an issue deleting contact!!';
    this.alertType = isSuccess ? 'alert-primary' : 'alert-danger';
    this.isAlert = true;
    this.deleteModelClose();
  }

  saveMessage(isSuccess: any){
    this.saveModelClose();
    this.alertMessage = isSuccess ? 'Contact successfully Saved!!' :'There was an issue saving contact!!';
    this.alertType = isSuccess ? 'alert-primary' : 'alert-danger';
    this.isAlert = true;
  }
}
