import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-save-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './save-contact.component.html',
})
export class SaveContactComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailId: new FormControl('')    
  });
  @Input() id : number = 0;
  @Output() saveEvent = new EventEmitter<boolean>();
  submitted = false;
  title: string = 'Save';
  contact?: Contact;
  isData : boolean = false;

  constructor(private formBuilder: FormBuilder, private contectService: ContactService) {}  

  getContact(){
    this.title = this.id == 0 ? 'Save' : 'Edit';
    if(this.id > 0){
      this.contectService.getContact(this.id).subscribe({
      next:(response:Contact) => {
        this.contact = response;
        this.formSetValues();
        this.isData = true;
      },
      error:(error:HttpErrorResponse) => { console.log('there was an issue getting contact')}
    }); 
    }else{
      this.isData = true;
    }
  }

  ngOnInit(): void {
    this.getContact();
    this.form = this.formBuilder.group(
      {
        firstName: [this.contact?.firstName, Validators.required],
        lastName: [this.contact?.lastName, Validators.required],
        emailId: [this.contact?.emailId, [Validators.required, Validators.email]]
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if(this.id > 0) {
      this.contectService.updateContact(this.id, this.form.value).subscribe({
        next:(response:boolean) => {
          this.saveEvent.emit(response);
        },
        error:(error:HttpErrorResponse) => {
          this.saveEvent.emit(false);
        }
      });
    }else{
      this.contectService.saveContact(this.form.value).subscribe({
        next:(response:boolean) => {
          this.saveEvent.emit(response);
        },
        error:(error:HttpErrorResponse) => {
          this.saveEvent.emit(false);
        }
      }); 
    }
    
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.isData = false;
  }

  formSetValues(){
    if(this.contact){
      this.form.setValue({
        firstName: this.contact.firstName,
        lastName: this.contact.lastName,
        emailId: this.contact.emailId,
      });
    }    
  }
}
