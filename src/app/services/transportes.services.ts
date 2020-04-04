import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../models/login.model';
import { Sucursal } from '../models/sucursal.model';
import { Colaborador } from '../models/colaborador.model';
import { Transportista } from '../models/transportista.model';
import { Viajes } from '../models/viajes-colaboradores.model';
@Injectable()
export class TransportesService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  login(login: Login): Observable<Login> {
    if (login != null) {
      return this._http.post<Login>(`${this.url}/Login`, login);
    }
  }

  getSucursales() {
    return this._http.get<Array<Sucursal>>(`${this.url}/Sucursales`);
  }

  getColaboradores() {
    return this._http.get<Array<Colaborador>>(`${this.url}/Colaboradores`);
  }

  getTransportista() {
    return this._http.get<Array<Transportista>>(`${this.url}/Transportistas`);
  }

  actualizarColaborador(idColaborador, idSucursal, cantidadKilometros) {
    return this._http.put<string>(`${this.url}/Viajes`, {
      idColaborador, idSucursal, cantidadKilometros
    });
  }

  guardarColaboradores(viajes: Viajes) {
    return this._http.post(`${this.url}/Viajes`, viajes);
  }

  obtenerReporte(fecha1, fecha2, transportista) {
    const data = {
      fecha1,
      fecha2,
      transportista: transportista.id
    };
    return this._http.post<string>(`${this.url}/Reporte`, data);
  }
}
