import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../models/login.model';
import { Sucursal } from '../models/sucursal.model';
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

  getSucursales(): Observable<Sucursal> {
    return this._http.get<Sucursal>(`${this.url}/Sucursales`);
  }

}
