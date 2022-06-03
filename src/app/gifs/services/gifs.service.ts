import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apikey: string= "Mijf8dzMYIn073id8QcnFtXOMoELqBIG"; 
  private _servicioUrl: string = "https://api.giphy.com/v1/gifs";
 
  private _historial: string[] = [];
  public resultado: Gif[] = [];

  get historial(): string[] 
  {
    return [...this._historial];
  } 

  //siempre es lo primero que se ejecuta
  constructor( private http: HttpClient) 
  {
    //  if(localStorage.getItem('historial') && localStorage.getItem('resultado'))
    // {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    //   this.resultado = JSON.parse(localStorage.getItem('resultado')!);
    // }

     this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
     this.resultado = JSON.parse(localStorage.getItem('resultado')!) || [];
    
  }

  buscarTermino(query: string):void
  {
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query))
    {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0,10);
      
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
            .set('q', query)
            .set('api_key', this._apikey)
            .set('limit', '15');
    
    // this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search?q=${query}&api_key=${this._apikey}&limit=${this._limit}`)
    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, { params }).subscribe( resp => {
      this.resultado = resp.data;
      localStorage.setItem('resultado', JSON.stringify(this.resultado));
      //console.log(this.resultado);
    })



    //peticion a api con javascript
    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=Mijf8dzMYIn073id8QcnFtXOMoELqBIG&q=tomate&limit=10`).then( response => {
    //   response.json().then( resp => {
    //     console.log(resp);
    //   });
    // });
  }
}
