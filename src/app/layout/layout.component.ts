import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    // tslint:disable-next-line: variable-name
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('id')) {
      this._router.navigate(['login']);
    }
  }

  redirigir(ruta) {
    this._router.navigate([ruta]);
  }

}
