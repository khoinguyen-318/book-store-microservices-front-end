import { Category } from './../api/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'environments/api';

@Injectable()
export class CategoryService {

    constructor(private http: HttpClient) { }

    getCategory() {
        return this.http.get<any>(`${API.BASE_URL}/api/v1/category`);
    }

    getCategoryById(id:string) {
        return this.http.get<any>(`${API.BASE_URL}/api/v1/category/${id}`)
    }
    createCategory(category:Category){
        return this.http.post(`${API.BASE_URL}/api/v1/category`,category);
    }
    updateCategory(category:Category){
        return this.http.put(`${API.BASE_URL}/api/v1/category/${category.id}`,category);
    }
    deleteCategory(id:string){
        return this.http.delete(`${API.BASE_URL}/api/v1/category/${id}`);
    }
}
