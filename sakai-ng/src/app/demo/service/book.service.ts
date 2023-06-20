import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'environments/api';
import { Book } from '../api/book';

@Injectable()
export class BookService {

    constructor(private http: HttpClient) { }

    getBook(page:number,size:number) {
        // console.log(`${API.BASE_URL}/api/v1/books?page=${page}&size=${size}`);
        return this.http.get<any>(`${API.BASE_URL}/api/v1/books?page=${page}&size=${size}`);
    }
    getBookById(id:string) {
        return this.http.get<any>(`${API.BASE_URL}/api/v1/books/book/${id}`)
    }
    createBook(book:Book,files:Set<any>){
        let formData = new FormData();
        let bookStr = JSON.stringify(book);
        formData.append("book",bookStr);
        for (const file of files) {
            formData.append("files",file);
        }
        return this.http.post(`${API.BASE_URL}/api/v1/books`,formData);
    }
    updateBook(book:Book,files:Set<any>){
        let formData = new FormData();
        let bookStr = JSON.stringify(book);
        formData.append("book",bookStr);
        for (const file of files) {
            formData.append("files",file);
        }
        return this.http.put(`${API.BASE_URL}/api/v1/books/${book.id}`,formData);
    }
    deleteBook(id:string){
        return this.http.delete(`${API.BASE_URL}/api/v1/books/${id}`);
    }
}
