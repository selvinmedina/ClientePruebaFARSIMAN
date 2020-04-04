import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Colaborador } from '../../models/colaborador.model';
import { TransportesService } from '../../services/transportes.services';
import { DataSource, } from '@angular/cdk/table';
import { Transportista } from 'src/app/models/transportista.model';
import { Viajes } from 'src/app/models/viajes-colaboradores.model';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css'],
  providers: [TransportesService]
})
export class ViajesComponent implements OnInit {

  public colaboradores: Colaborador[];
  public transportistas: Transportista[];
  public transportista: Transportista;

  public displayedColumns: string[] = ['select', 'id', 'descripcion'];
  public dataSource;
  selection = new SelectionModel<Colaborador>(true, []);
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  minDate: Date;
  maxDate: Date;
  private viajes: Viajes;
  fecha: string;
  mostrarAlerta: boolean;
  correcto: boolean;

  constructor(
    // tslint:disable-next-line: variable-name
    private _transportesService: TransportesService,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(2019, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    this._transportesService.getColaboradores().subscribe(
      res => {
        this.colaboradores = res;
        this.dataSource = new MatTableDataSource<Colaborador>(this.colaboradores);
      }
    );

    this.transportista = {
      id: '',
      nombre: ''
    };

    this._transportesService.getTransportista().subscribe(
      val => {
        this.transportistas = val;
      }
    );

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {
    this.dataSource = new MatTableDataSource(this.colaboradores);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Colaborador): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  enviarData() {
    this.mostrarAlerta = false;
    this.viajes = {
      colaboradores: this.selection.selected,
      fecha: this.fecha,
      transportista: this.transportista.id,
      usuario: +localStorage.getItem('id')
    };

    // Validar
    if (this.viajes.colaboradores.length > 0 &&
      this.viajes.fecha &&
      this.viajes.transportista &&
      this.viajes.usuario) {
      this._transportesService.guardarColaboradores(this.viajes)
        .subscribe(res => {
          if (res) {
            this.correcto = true;
          } else {
            this.correcto = false;
          }
        });
    } else {
      this.mostrarAlerta = true;
    }
    // console.log(this.selection._selection.entries());
  }

}
