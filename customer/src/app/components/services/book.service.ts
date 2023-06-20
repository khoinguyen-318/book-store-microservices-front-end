import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/api';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBook(page?:number,size?:number,sort?:string){
    const params = new HttpParams();
    params.set('page',page!==undefined?page:0);
    params.set('size',size!==undefined?size:20);
    params.set('sort',sort!==undefined?sort:'title');
    return this.http.get<any>(`${API.BASE_URL}/api/v1/books`,{params});
  }
  getDetailBook(bookId:string){
    return this.http.get<any>(`${API.BASE_URL}/api/v1/books/book/${bookId}`);
  }
  getAllBookByCategory(categoryId:string,page?:number,size?:number,sort?:string){
    const params = new HttpParams();
    params.set('page',page!==undefined?page:0);
    params.set('size',size!==undefined?size:20);
    params.set('sort',sort!==undefined?sort:'title');
    return this.http.get<any>(`${API.BASE_URL}/api/v1/books/category/${categoryId}`,{params});
  }
  getAllBookByPublisher(publisher:string,page?:number,size?:number,sort?:string){
    const params = new HttpParams();
    params.set('page',page!==undefined?page:0);
    params.set('size',size!==undefined?size:20);
    params.set('sort',sort!==undefined?sort:'title');
    return this.http.get<any>(`${API.BASE_URL}/api/v1/books/publisher/${publisher}`,{params});
  }
  getAllBookBySeries(series:string,page?:number,size?:number,sort?:string){
    const params = new HttpParams();
    params.set('page',page!==undefined?page:0);
    params.set('size',size!==undefined?size:20);
    params.set('sort',sort!==undefined?sort:'title');
    return this.http.get<any>(`${API.BASE_URL}/api/v1/books/series/${series}`,{params});
  }
}
