import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../entidades/categoria';
import { CriterioBusquedaProducto } from '../../entidades/criterioBusquedaProducto';
import { Producto } from '../../entidades/producto';
import { CategoriasService } from '../../servicios/categoriasService';
import { FabricantesService } from '../../servicios/fabricantesService';
import { ProductosService } from '../../servicios/productosService';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html'
})

export class CatalogoComponent implements OnInit {

  public categorias:Categoria[]
  public criterio:CriterioBusquedaProducto = new CriterioBusquedaProducto()
  public productos:Producto[] //undefined
  public fabricantes:String[] //undefined

  constructor(private productosService:ProductosService,
              private categoriasService:CategoriasService,
              private fabricantesService:FabricantesService) {
    this.listarProductos()
    this.listarCategorias()
    this.listarFabricantes()
  }

  ngOnInit(): void {
  }

  public listarFabricantes():void {
    this.fabricantesService.listarFabricantes()
    .subscribe(
      fabricantes => this.fabricantes = fabricantes,
      error => { console.log(error) }
    )
  }

  public listarCategorias():void {
    this.categoriasService.listarCategorias()
      .subscribe(
        categorias => this.categorias = categorias,
        error => { console.log(error) }
      )
  }

  public listarProductos():void{
    this.productosService.listarProductos(this.criterio)
    .subscribe(
      productos => this.productos = productos,
      error => console.log(error)
    )
  }

  public vaciarCriterio():void{
    this.criterio = new CriterioBusquedaProducto()
  }

}
