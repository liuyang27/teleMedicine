import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordDetailPageRoutingModule } from './record-detail-routing.module';

import { RecordDetailPage } from './record-detail.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordDetailPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [RecordDetailPage]
})
export class RecordDetailPageModule {}
