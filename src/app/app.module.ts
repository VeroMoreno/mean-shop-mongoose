import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@Angular/common/http';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/common/cabecera/cabecera.component';
import { PieComponent } from './componentes/common/pie/pie.component';
import { CommonTiendaComponent } from './modulos/tienda/componentes/common-tienda/common-tienda.component';
import { CommonLoginComponent } from './modulos/usuarios/componentes/common-login/common-login.component';

import { InterceptorJWT } from './interceptores/interceptorJWT';
import { UsuariosModule } from './modulos/usuarios/usuariosModule';
import { TiendaModule } from './modulos/tienda/tiendaModule';
@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PieComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,                     // para el [(NgModel)]
    HttpClientModule,               // para la conexion
    ReactiveFormsModule,
    RouterModule.forRoot(AppModule.rutasPrimerRouterOutlet),
    UsuariosModule,
    TiendaModule    // para los router outlet
  ],
  providers: [
    //Para registrar un interceptor HTTP:
    {
      provide : HTTP_INTERCEPTORS,
      useClass : InterceptorJWT,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    //Estas rutas son para la primera carpeta de la url
    public static rutasPrimerRouterOutlet = [
      {
        path      : '',
        redirectTo: '/usuarios/login',
        pathMatch : 'full'
      },
      {
        path      : 'usuarios',
        component : CommonLoginComponent,
        children  : UsuariosModule.rutasMaquetacionLogin
      },
      {
        path      : 'tienda',
        component : CommonTiendaComponent,
        children  : TiendaModule.rutasCommonTienda
      }
  ]
}
