import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { DeleteDialogComponent } from '../landing-page/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    LoaderComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    LoaderComponent,
    AlertComponent,
  ],
})
export class SharedModule {}
