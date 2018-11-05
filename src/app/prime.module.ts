import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    DropdownModule,
    TableModule,
    RatingModule,
    DialogModule,
    ButtonModule
  ],
  exports: [
    DropdownModule,
    TableModule,
    RatingModule,
    DialogModule,
    ButtonModule
  ],

})
export class PrimeModule { }
