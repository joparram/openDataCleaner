import { Component, HostListener, Input, ViewChild, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { GridOptions, IDatasource, IGetRowsParams, ColDef } from 'ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable, Subscription } from 'rxjs';
import { of } from 'rxjs';
import { QuoteService } from './quote.service';
import { ImportService } from '@app/@shared/services/import.service';
import { DatabaseExporterService } from '@app/@shared/services/databaseexporter.service';
import { ExporterService } from '@app/@shared/services/exporter.service';

import { ProcessorService } from '@app/@shared/services/processor.service';
import { MenuService } from '@app/@shared/services/menu.service';
import { PaginatedDataService } from '@app/@shared/services/paginateddata.service';
import { DataService } from '@app/@shared/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionComponent } from '@app/@shared/models/action-component';
import { ActionDialogComponent } from '@shared/components/component-dialog/action-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  public columnDefs: any[];
  public rowData: any[];
  public gridOptions: any;
  public info: string;
  types: any;
  rowFunctions: any[];
  columnFunctions: any[];
  selectedColumn: any;
  selectedRow: any;
  dialogRef: any;
  minRow: number = 0;
  maxRow: number = 100;
  dataSubscription: Subscription = new Subscription();

  menuItems: any[] = [
    {
      title: 'Cambiar Tipo',
      menu: [
        {
          title: 'int',
          function: () => console.log('hello world!'),
        },
        {
          title: 'float',
        },
        {
          title: 'string',
        },
      ],
    },
    {
      title: 'Borrar Columna',
    },
  ];
  headersPrueba = [
    {
      name: '_id',
      field: '_id',
    },
    {
      name: 'index',
      field: 'index',
    },
    {
      name: 'guid',
      field: 'guid',
    },
    {
      name: 'isActive',
      field: 'isActive',
    },
    {
      name: 'balance',
      field: 'balance',
    },
    {
      name: 'age',
      field: 'age',
    },
    {
      name: 'eyeColor',
      field: 'eyeColor',
    },
    {
      name: 'name',
      field: 'name',
    },

    {
      name: 'gender',
      field: 'gender',
    },
    {
      name: 'company',
      field: 'company',
    },
    {
      name: 'email',
      field: 'email',
    },
    {
      name: 'phone',
      field: 'phone',
    },
  ];
  datatest = [
    {
      _id: '60610589dbe5d177076fa290',
      index: 0,
      guid: '4ea66085-ebc6-4ace-95bd-b8608979be9d',
      isActive: false,
      balance: '$1,118.44',
      age: 32,
      eyeColor: 'green',
      name: 'Morse Patrick',
      gender: 'male',
      company: 'BLEEKO',
      email: 'morsepatrick@bleeko.com',
      phone: '+1 (877) 498-3405',
    },
    {
      _id: '60610589ca3e3149f5ce619c',
      index: 1,
      guid: 'c4c69cd8-c857-4f73-8002-a269f50927d5',
      isActive: true,
      balance: '$2,278.31',
      age: 29,
      eyeColor: 'brown',
      name: 'Bishop Miller',
      gender: 'male',
      company: 'MEDICROIX',
      email: 'bishopmiller@medicroix.com',
      phone: '+1 (980) 447-2723',
    },
    {
      _id: '60610589a2120883cb79b8d4',
      index: 2,
      guid: 'a2668708-39d4-47f0-ac1e-36a709ac38d5',
      isActive: false,
      balance: '$1,233.26',
      age: 26,
      eyeColor: 'brown',
      name: 'Berry Burton',
      gender: 'male',
      company: 'XLEEN',
      email: 'berryburton@xleen.com',
      phone: '+1 (920) 421-2710',
    },
    {
      _id: '606105894ad20287a4190da0',
      index: 3,
      guid: 'a75b3040-76b7-4144-91f6-ecbb3365f86f',
      isActive: true,
      balance: '$3,196.89',
      age: 34,
      eyeColor: 'green',
      name: 'Allison Berry',
      gender: 'female',
      company: 'COMTREK',
      email: 'allisonberry@comtrek.com',
      phone: '+1 (818) 430-2756',
    },
    {
      _id: '60610589d5b05f7a324edf2a',
      index: 4,
      guid: '651d6e9d-26bf-44e0-a4c5-c03798fb6b53',
      isActive: false,
      balance: '$2,457.40',
      age: 34,
      eyeColor: 'blue',
      name: 'Juanita Pollard',
      gender: 'female',
      company: 'SUSTENZA',
      email: 'juanitapollard@sustenza.com',
      phone: '+1 (861) 432-2806',
    },
    {
      _id: '60610589ff093f015f5c3a80',
      index: 5,
      guid: 'c19d8557-e088-4a64-9cdd-85af36fd3293',
      isActive: false,
      balance: '$2,405.14',
      age: 39,
      eyeColor: 'blue',
      name: 'Mathews Mayo',
      gender: 'male',
      company: 'OPTICALL',
      email: 'mathewsmayo@opticall.com',
      phone: '+1 (822) 465-2800',
    },
    {
      _id: '6061058989ea19845a419a94',
      index: 6,
      guid: '03047e2e-e64f-4475-abb0-e0f60981db71',
      isActive: false,
      balance: '$1,996.66',
      age: 24,
      eyeColor: 'blue',
      name: 'Paul Chang',
      gender: 'male',
      company: 'COMCUBINE',
      email: 'paulchang@comcubine.com',
      phone: '+1 (902) 537-2407',
    },
    {
      _id: '60610589a1e2b1f9142e9fa1',
      index: 7,
      guid: '7baaf3c5-523f-4c9e-8c0e-669e9e051821',
      isActive: false,
      balance: '$2,173.83',
      age: 21,
      eyeColor: 'brown',
      name: 'Deleon Larsen',
      gender: 'male',
      company: 'RODEOMAD',
      email: 'deleonlarsen@rodeomad.com',
      phone: '+1 (945) 540-2343',
    },
    {
      _id: '60610589d5ead223e26f2277',
      index: 8,
      guid: '1a504b0a-d5f1-46f7-b3e2-d2cc38dcbfce',
      isActive: true,
      balance: '$1,842.43',
      age: 28,
      eyeColor: 'green',
      name: 'Valencia Blankenship',
      gender: 'male',
      company: 'ZOLAREX',
      email: 'valenciablankenship@zolarex.com',
      phone: '+1 (889) 484-2720',
    },
    {
      _id: '6061058989ea19845a419a94',
      index: 6,
      guid: '03047e2e-e64f-4475-abb0-e0f60981db71',
      isActive: false,
      balance: '$1,996.66',
      age: 24,
      eyeColor: 'blue',
      name: 'Paul Chang',
      gender: 'male',
      company: 'COMCUBINE',
      email: 'paulchang@comcubine.com',
      phone: '+1 (902) 537-2407',
    },
    {
      _id: '60610589a1e2b1f9142e9fa1',
      index: 7,
      guid: '7baaf3c5-523f-4c9e-8c0e-669e9e051821',
      isActive: false,
      balance: '$2,173.83',
      age: 21,
      eyeColor: 'brown',
      name: 'Deleon Larsen',
      gender: 'male',
      company: 'RODEOMAD',
      email: 'deleonlarsen@rodeomad.com',
      phone: '+1 (945) 540-2343',
    },
    {
      _id: '60610589d5ead223e26f2277',
      index: 8,
      guid: '1a504b0a-d5f1-46f7-b3e2-d2cc38dcbfce',
      isActive: true,
      balance: '$1,842.43',
      age: 28,
      eyeColor: 'green',
      name: 'Valencia Blankenship',
      gender: 'male',
      company: 'ZOLAREX',
      email: 'valenciablankenship@zolarex.com',
      phone: '+1 (889) 484-2720',
    },
  ];

  @ViewChild('grid') grid: AgGridAngular;

  constructor(
    private quoteService: QuoteService,
    private importService: ImportService,
    private processorService: ProcessorService,
    private menuService: MenuService,
    private dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private paginateddataservice: PaginatedDataService,
    private dataService: DataService,
    private databaseexporterService: DatabaseExporterService,
    private exporterService: ExporterService
  ) {
    this.menuService.menu$.subscribe((event) => {
      switch (event.action) {
        case 'import':
          this.importService.get().subscribe((component: ActionComponent) => {
            this.importDialog(component);
          });
          break;
        case 'process':
          this.processorService.get().subscribe((component: ActionComponent) => {
            this.processorDialog(component);
          });
          break;
        case 'data':
          this.dataService.get().subscribe((component: ActionComponent) => {
            this.dataDialog(component);
          });
          break;
        case 'export':
          this.exporterService.get().subscribe((component: ActionComponent) => {
            this.exporterDialog(component);
          });
          break;
        case 'databaseexporter':
          this.databaseexporterService.get().subscribe((component: ActionComponent) => {
            this.databaseExporterDialog(component);
          });
          break;
        default:
          break;
      }
    });
    this.paginateddataservice.columns$.subscribe((columns: any) => {
      console.log(columns);
      this.columnDefs = columns;
    });
    this.paginateddataservice.data$.subscribe((data: any) => {
      console.log(data);
    });
    this.paginateddataservice.types$.subscribe((types: any) => {
      this.types = types;
      console.log(this.types);
    });
    this.rowFunctions = [
      {
        name: 'Eliminar Fila',
        updated: 'Elimina una fila del dataset',
      },
    ];
    this.columnFunctions = [
      {
        name: 'Eliminar propiedad',
        updated: 'Elimina una columna',
      },
    ];

    this.gridOptions = {
      rowSelection: 'single',
      cacheBlockSize: 100,
      maxBlocksInCache: 1,
      rowModelType: 'infinite',
      pagination: true,
      paginationAutoPageSize: false,
      onCellValueChanged: (e: any) => this.updateCellValue(e),
      onCellFocused: (e: any) => {
        this.selectedColumn = e.column.colId;
        this.selectedRow = e.rowIndex;
      },
      defaultColDef: {
        cellStyle: (params: any) => {
          if (params.colDef === this.selectedColumn) {
            return { 'background-color': '#b7e4ff' };
          }
        },
        editable: true,
        // make every column use 'text' filter by default
        filter: 'agTextColumnFilter',
      },
    };
  }
  getSelectedColumnType() {
    if (this.types != undefined) {
      return this.types[this.selectedColumn];
    }
  }

  click(event: any) {
    this.menuService.updateMenuEvents(event);
  }
  updateCellValue(e: any) {
    let dataForm = {
      column: e.colDef.field,
      row: e.rowIndex,
      action: 'updateCell',
      value: e.value,
    };
    this.dataService
      .post(dataForm, { startRow: this.minRow, endRow: this.maxRow })
      .subscribe((data: any) => this.paginateddataservice.updateDataEvents(data));
  }
  onGridReady(params: any) {
    console.log('onGridReady');
    var datasource = {
      getRows: (params: IGetRowsParams) => {
        this.dataSubscription.unsubscribe();
        this.info = 'Getting datasource rows, start: ' + params.startRow + ', end: ' + params.endRow;
        console.log(this.info);
        this.dataSubscription = this.paginateddataservice.data$.subscribe((data: any) => {
          this.rowData = data;
          params.successCallback(this.rowData);
          this.ref.detectChanges();
        });
        this.paginateddataservice.get({ startRow: params.startRow, endRow: params.endRow }).subscribe((data: any) => {
          this.paginateddataservice.updateDataEvents(data);
        });
      },
    };
    params.api.setDatasource(datasource);
  }

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }

  /*DIALOGS*/
  private importDialog(component: ActionComponent) {
    this.dialogRef = this.dialog.open(ActionDialogComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.component = component;
    this.dialogRef.afterClosed().subscribe((confirm: any) => {
      if (confirm) {
        this.importService
          .post(confirm, { startRow: this.minRow, endRow: this.maxRow })
          .subscribe((data: any) => this.paginateddataservice.updateDataEvents(data));
      }
    });
  }
  private processorDialog(component: ActionComponent) {
    this.dialogRef = this.dialog.open(ActionDialogComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.component = component;
    this.dialogRef.afterClosed().subscribe((dataForm: any) => {
      if (dataForm) {
        dataForm.column = this.selectedColumn;
        dataForm.row = this.selectedRow;
        this.processorService
          .post(dataForm, { startRow: this.minRow, endRow: this.maxRow })
          .subscribe((data: any) => this.paginateddataservice.updateDataEvents(data));
      }
    });
  }
  private dataDialog(component: ActionComponent) {
    this.dialogRef = this.dialog.open(ActionDialogComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.component = component;
    this.dialogRef.afterClosed().subscribe((dataForm: any) => {
      if (dataForm) {
        dataForm.column = this.selectedColumn;
        dataForm.row = this.selectedRow;
        this.dataService
          .post(dataForm, { startRow: this.minRow, endRow: this.maxRow })
          .subscribe((data: any) => this.paginateddataservice.updateDataEvents(data));
      }
    });
  }
  private databaseExporterDialog(component: ActionComponent) {
    this.dialogRef = this.dialog.open(ActionDialogComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.component = component;
    this.dialogRef.afterClosed().subscribe((dataForm: any) => {
      if (dataForm) {
        dataForm.column = this.selectedColumn;
        dataForm.row = this.selectedRow;
        this.databaseexporterService
          .post(dataForm, { startRow: this.minRow, endRow: this.maxRow })
          .subscribe((data: any) => this.paginateddataservice.updateDataEvents(data));
      }
    });
  }
  private exporterDialog(component: ActionComponent) {
    this.dialogRef = this.dialog.open(ActionDialogComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.component = component;
    this.dialogRef.afterClosed().subscribe((dataForm: any) => {
      if (dataForm) {
        dataForm.column = this.selectedColumn;
        dataForm.row = this.selectedRow;
        this.exporterService.post(dataForm, { startRow: this.minRow, endRow: this.maxRow }).subscribe((data: any) => {
          const element = document.createElement('a');
          element.href = URL.createObjectURL(data.file);
          element.download = data.filename;
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
      }
    });
  }
  /*FIN DIALOGS*/
}
