// Importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { ViajesComponent } from './components/viajes/viajes.component';

// Importar los componentes a los cuales les quiero hacer una pagina exclusiva

// Array de rutas
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'colaborador', component: ColaboradorComponent },
  { path: 'viajes', component: ViajesComponent },
];

// Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
