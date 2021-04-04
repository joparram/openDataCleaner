import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExDatatableComponent } from './ex-datatable/ex-datatable.component';
import { DropdownButtonComponent } from './dropdown-button/dropdown-button.component';
import { ExPaginatorComponent } from './ex-paginator/ex-paginator.component';

@NgModule({
  declarations: [ExDatatableComponent, DropdownButtonComponent, ExPaginatorComponent],
  imports: [CommonModule],
  exports: [ExDatatableComponent],
})
export class ExDatatableModule {}
