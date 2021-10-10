import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { modeloApi } from 'src/app/Modelos/modeloApi';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {
  api: string;

  constructor(private http: HttpClient) { }
  getPosition(): Promise<any>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  getLocationInfo(variable:string){
    let respuesta: Observable<any>;
    this.api = "https://discover.search.hereapi.com/v1/discover?at="
    +sessionStorage.getItem('latitude')+","+sessionStorage.getItem('longitud')+"&q="+variable+"&limit=5&apiKey=wq41dQhfd3C_Ge2JVFyTm1DtL3bhVBDe_4HP_cxuPkU";
    respuesta = this.http.get<modeloApi>(this.api).pipe(catchError(this.handleError));
    return respuesta;
  }
  private handleError(error:any){
    return throwError(error);
  }
  
}
