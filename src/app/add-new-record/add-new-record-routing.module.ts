import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewRecordPage } from './add-new-record.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewRecordPageRoutingModule {}
