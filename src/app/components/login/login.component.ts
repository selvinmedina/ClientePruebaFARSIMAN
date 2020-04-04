import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login.model';
import { TransportesService } from '../../services/transportes.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [TransportesService]
})
export class LoginComponent implements OnInit {
  public login: Login;
  public nombreUsuario: string;
  public password: string;
  public cargando: boolean;
  public mensajeError: string;
  public loginIncorrecto: boolean;

  constructor(
    private _transportesService: TransportesService,
    private _router: Router
  ) {
    this.login = {
      nombreUsuario: 'selvinmedina',
      password: '123456'
    };
    this.cargando = false;
    this.mensajeError = 'El Usuario o la Contraseña son incorrectos';
    this.loginIncorrecto = false;
  }

  ngOnInit(): void {
  }

  onSubmit(e) {
    this.cargando = true;
    this._transportesService.login(this.login)
      .subscribe(res => {
        // Si el usuario es incorrecto
        console.log(res);
        if (!res.usu_Id) {
          this.loginIncorrecto = true;
          localStorage.removeItem('id');
          this.cargando = false;
          return;
        } else {
          console.log(res);
          localStorage.setItem('id', res.usu_Id);
          this._router.navigate(['colaborador']);
        }

        this.cargando = false;
      });

  }

}
