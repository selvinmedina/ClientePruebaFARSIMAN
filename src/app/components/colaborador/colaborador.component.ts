import { Component, OnInit } from '@angular/core';
import { TransportesService } from '../../services/transportes.services';
import { Sucursal } from 'src/app/models/sucursal.model';
import { Colaborador } from 'src/app/models/colaborador.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css'],
  providers: [TransportesService]
})
export class ColaboradorComponent implements OnInit {

  public sucursales: Array<Sucursal>;
  public colaboradores: Array<Colaborador>;
  public sucursal: string;
  public colaborador: string;
  public distancia: number;
  public idUsuario: string;
  public exito: boolean;
  public mensaje: boolean;

  constructor(
    // tslint:disable-next-line: variable-name
    private _transportesService: TransportesService,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._transportesService.getSucursales().subscribe(
      res => {
        this.sucursales = res;
      }
    );
    this._transportesService.getColaboradores().subscribe(
      res => {
        this.colaboradores = res;
      }
    );
    this.sucursal = '';
    this.colaborador = '';

    this.idUsuario = localStorage.getItem('id');
    if (!localStorage.getItem('id')) {
      this._router.navigate(['']);
    }
    this.exito = false;
    this.mensaje = false;
  }

  onSubmit() {
    // Validacion
    if (this.colaborador !== '' && this.sucursal !== '' && this.distancia) {
      this._transportesService.actualizarColaborador(this.colaborador, this.sucursal, this.distancia)
        .subscribe(res => {
          if (res === 'ok') {
            this.openSnackBar(`¡Se ha actualizado exitosamente!`, 'ok');
            this.mensaje = false;
            this.exito = true;
          } else {
            this.exito = false;
          }
        });
    } else {
      this.exito = false;
      this.mensaje = true;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
