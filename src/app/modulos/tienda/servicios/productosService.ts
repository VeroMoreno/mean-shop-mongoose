import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ConfiguracionUtil } from "src/app/util/configuracionUtil";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class ProductosService {
  public constructor(private httpClient:HttpClient) {
  }

  public listarProductos():Observable<any> {
    return this.httpClient.get(ConfiguracionUtil.urlServidor + '/productos')
  }
}