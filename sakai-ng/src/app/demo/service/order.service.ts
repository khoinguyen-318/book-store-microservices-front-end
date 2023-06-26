import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "environments/api";

@Injectable()
export class OrderService{
    constructor(private http: HttpClient) { }

    getAllOrder(){
        return this.http.get<any>(`${API.BASE_URL}/api/v1/orders`)
    }

    changeStatus(orderId:string,status:string){
        return this.http.patch<any>(`${API.BASE_URL}/api/v1/orders/${orderId}`,status)
    }
}
