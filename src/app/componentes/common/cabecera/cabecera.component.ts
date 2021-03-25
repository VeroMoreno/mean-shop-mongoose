import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html'
})
export class CabeceraComponent implements OnInit {

  public constructor(){
    console.log("Creando una instancia de CabeceraComponent")
  }

  ngOnInit(): void {
  }

}
