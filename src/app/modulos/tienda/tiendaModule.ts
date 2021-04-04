import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { PerfilComponent } from "../usuarios/componentes/perfil/perfil.component";
import { CatalogoComponent } from "./componentes/catalogo/catalogo.component";
import { CestaComponent } from "./componentes/cesta/cesta.component";
import { CommonTiendaComponent } from "./componentes/common-tienda/common-tienda.component";
import { MenuComponent } from "./componentes/menu/menu.component";
import { ProductoComponent } from "./componentes/producto/producto.component";

@NgModule({
    declarations: [
      MenuComponent,
      CestaComponent,
      CatalogoComponent,
      ProductoComponent,
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
    {
      path      : 'catalogo',
      component : CatalogoComponent
    },
    /*{
      path      : 'cesta',
      component : CestaComponent
    }  */
  ]
}