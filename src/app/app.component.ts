import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactListComponent } from "./contact-list/contact-list.component";
import { SaveContactComponent } from "./save-contact/save-contact.component";
import { DeleteContactComponent } from "./delete-contact/delete-contact.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactListComponent, SaveContactComponent, DeleteContactComponent],
  providers:[
    HttpClient
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'r-system-contacts-app';
}
