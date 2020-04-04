import { Component, OnInit } from '@angular/core';
import { TransportesService } from '../../services/transportes.services';
import { Sucursal } from 'src/app/models/sucursal.model';
import { Colaborador } from 'src/app/models/colaborador.model';
import { Router } from '@angular/router';

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

  constructor(
    private _transportesService: TransportesService,
    private _router: Router
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
      this._router.navigate(['/']);
    }
    this.exito = false;
  }

  onSubmit() {
    // Validacion
    if (this.colaborador !== '' && this.sucursal !== '' && this.distancia) {
      this._transportesService.actualizarColaborador(this.colaborador, this.sucursal, this.distancia)
        .subscribe(res => {
          if (res === 'ok') {
            this.exito = true;
          } else {
            this.exito = false;
          }
        });
    }
  }
}
