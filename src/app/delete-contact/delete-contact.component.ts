import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-contact',
  standalone: true,
  imports: [],
  templateUrl: './delete-contact.component.html'
})
export class DeleteContactComponent {
  @Input() id: number = 0;
  @Output() deleteEvent = new EventEmitter<boolean>();

  constructor(private contactService: ContactService){}

  deleteContact(){
    this.contactService.deleteContact(this.id)
    .subscribe({
      next:(response:boolean) => {
        this.deleteEvent.emit(response);
      },
      error:(error:HttpErrorResponse) => {
        this.deleteEvent.emit(false);
      }
    })  
  }

}
