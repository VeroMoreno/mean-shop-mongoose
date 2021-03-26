// import { ngfactoryFilePath } from "@angular/compiler/src/aot/util";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { PerfilComponent } from "../usuarios/componentes/perfil/perfil.component";
import { CommonTiendaComponent } from "./componentes/common-tienda/common-tienda.component";
import { MenuComponent } from "./componentes/menu/menu.component";

@NgModule({
    declarations: [
      MenuComponent,
      CommonTiendaComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(TiendaModule.rutasCommonTienda)
    ],
    exports: [
      CommonTiendaComponent
    ]
  })
export class TiendaModule {

    public static rutasCommonTienda = [
        {
          path      : 'perfil',
          component : PerfilComponent
        },
        /*{
          path      : 'catalago',
          component : CatalogoComponent
        },
        {
          path      : 'cesta',
          component : CestaComponent
        }  */
      ]
}