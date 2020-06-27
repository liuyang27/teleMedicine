import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewRecordPageRoutingModule } from './add-new-record-routing.module';

import { AddNewRecordPage } from './add-new-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewRecordPageRoutingModule
  ],
  declarations: [AddNewRecordPage]
})
export class AddNewRecordPageModule {}
