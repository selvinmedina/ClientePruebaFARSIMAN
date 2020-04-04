import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Colaborador } from '../../models/colaborador.model';
import { TransportesService } from '../../services/transportes.services';
import { DataSource } from '@angular/cdk/table';
import { Transportista } from 'src/app/models/transportista.model';

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

  constructor(
    private _transportesService: TransportesService,
  ) { }

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

}
