import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AceptacionTerminosComponent } from "./componentes/aceptacion-terminos/aceptacion-terminos.component";
import { CommonLoginComponent } from "./componentes/common-login/common-login.component";
import { LoginComponent } from "./componentes/login/login.component";
import { PerfilComponent } from "./componentes/perfil/perfil.component";
import { RegistroComponent } from "./componentes/registro/registro.component";

@NgModule({
    declarations: [
      LoginComponent,
      PerfilComponent,
      RegistroComponent,
      CommonLoginComponent,
      AceptacionTerminosComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(UsuariosModule.rutasMaquetacionLogin)
    ],
    exports: [
        PerfilComponent,
        CommonLoginComponent
    ]
  })
export class UsuariosModule {

    //Estas son las rutas para el router outlet que hay en MaquetacionLoginComponent
    public static rutasMaquetacionLogin = [
        {
          path      : 'login',
          component : LoginComponent
        },
        {
          path      : 'registro',
          component : RegistroComponent
        },
        {
          path      : 'aceptacion',
          component : AceptacionTerminosComponent
        }
    ]

}