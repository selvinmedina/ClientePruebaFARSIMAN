import { Component, OnInit } from '@angular/core';
import { TransportesService } from '../../services/transportes.services';
import { Transportista } from 'src/app/models/transportista.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers: [TransportesService]
})
export class ReporteComponent implements OnInit {

  public displayedColumns: string[] = [
    'Id',
    'NombreColaborador',
    'Distancia',
    'NombreUsuarioViaje',
    'NombreColaborador',
    'TotalPorColaborador',
  ];

  public dataSource;
  transportistas: Transportista[];
  transportista: Transportista;
  fecha1: string;
  fecha2: string;
  resultado: any;
  nombreTransportista: string;
  totalTransportista: number;
  cantidad: number;

  constructor(
    private _transportesService: TransportesService
  ) { }

  ngOnInit(): void {
    this._transportesService.getTransportista().subscribe(
      val => {
        this.transportistas = val;
      }
    );
    this.transportista = {
      id: '',
      nombre: ''
    };
  }

  generarReporte() {

    if (this.fecha1 && this.fecha2 && this.transportista.id !== '') {
      this._transportesService.obtenerReporte(this.fecha1, this.fecha2, this.transportista).subscribe(
        res => {
          this.resultado = JSON.parse(res);
          this.cantidad = this.resultado.Colaborador.length;
          this.nombreTransportista = this.resultado.TotalTransportista.NombreTransportista;
          this.totalTransportista = this.resultado.TotalTransportista.TotalTransportista;
          this.dataSource = new MatTableDataSource<any>(this.resultado.Colaborador);
        }
      );

    }
  }

}
