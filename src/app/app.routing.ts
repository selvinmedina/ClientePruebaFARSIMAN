// Importar los modulos del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

// Importar los componentes a los cuales les quiero hacer una pagina exclusiva

// Array de rutas
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
];

// Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
