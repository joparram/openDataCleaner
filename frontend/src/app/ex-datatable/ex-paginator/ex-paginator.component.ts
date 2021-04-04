import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-paginator',
  templateUrl: './ex-paginator.component.html',
  styleUrls: ['./ex-paginator.component.scss'],
})
export class ExPaginatorComponent implements OnInit {
  blockSize: number = 100;
  firstRow: number = 1;
  lastRow: number = 100;
  totalRows: number = undefined;
  totalPages: number = undefined;
  page: number = 1;

  constructor() {}

  ngOnInit(): void {}

  calcFirstLastRows(): void {
    this.lastRow = this.page * this.blockSize;
    this.firstRow = (this.page - 1) * this.blockSize + 1;
  }

  next(): void {
    if (this.totalPages !== undefined) {
      if (this.page < this.totalPages) {
        this.page++;
      }
    } else {
      this.page++;
    }
    this.calcFirstLastRows();
  }

  previous(): void {
    if (this.page > 1) {
      this.page--;
    }
    this.calcFirstLastRows();
  }

  first(): void {
    this.page = 1;
    this.calcFirstLastRows();
  }
  last(): void {
    if (this.totalPages !== undefined) {
      this.page = this.totalPages;
      this.calcFirstLastRows();
    }
  }
}
