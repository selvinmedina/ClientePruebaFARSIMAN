import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routing
import { appRoutingProviders, routing } from './app.Routing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { ViajesComponent } from './components/viajes/viajes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ColaboradorComponent,
    ViajesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
