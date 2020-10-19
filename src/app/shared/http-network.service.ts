import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { Receipe } from '../receipe/receipe.model';

@Injectable({
  providedIn: 'root'
})
export class HttpNetworkService {

  constructor(private httpClient: HttpClient) { }

  postData(url : string, data: any) {

    return this.httpClient.post(url, data);

  }

  putData(url : string, data: any) {

    return this.httpClient.put(url, data);

  }

  getData(url: string, params?: Object) {

    let param = new HttpParams();

    for(let query in params)
      param = param.set(query,params[query]);
    
    return this.httpClient.get<any>(url, {
      params: param
    });
  }

}
