import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactManagerPage } from './contact-manager';

@NgModule({
  declarations: [
    ContactManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactManagerPage),
  ],
})
export class ContactManagerPageModule {}
