import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/environments/api';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    getCategory() {
        return this.http.get<any>(`${API.BASE_URL}/api/v1/category`);
    }

    getCategoryById(id:string) {
        return this.http.get<any>(`${API.BASE_URL}/api/v1/category/${id}`)
    }
}
