import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Header } from '../models/header';

@Component({
  selector: 'ex-datatable',
  templateUrl: './ex-datatable.component.html',
  styleUrls: ['./ex-datatable.component.scss'],
})
export class ExDatatableComponent implements OnInit {
  cellStyle: string = 'ex-cell-default';
  @Input()
  headers: Header[] = [] as Header[];

  @Input()
  rows: any[] = [];

  @Input()
  menuItems: any[] = [];

  index: number = 0;

  constructor() {}

  onCellDoubleClick() {
    this.cellStyle = 'ex-cell-edit';
  }

  onCellBlur() {
    this.cellStyle = 'ex-cell-default';
  }

  onCellFocus() {}

  ngOnInit(): void {}
}
