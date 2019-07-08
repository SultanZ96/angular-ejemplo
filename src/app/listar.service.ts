import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class ListarService {

  private baseUrl = 'https://envoledev.vendorpro.cl:443/ComisionesKBI/auth';

  constructor(private http: HttpClient) { }

  getReporteComisionesRRHHH(idPeriodo:number, idEmpresa:number ):Observable<any>{
    return this.http.get(`${this.baseUrl}/listarVentasRRHH/${idPeriodo}/${idEmpresa}`);
  }
  getColumnMarcasList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listarColumnasRRHH`);
  }
}