import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { API } from 'environments/api';

@Injectable()
export class ShipmentService{
    constructor(private http:HttpClient) {
    }
    getAllShipment(){
        return this.http.get(`${API.BASE_URL}/api/v1/shipment`)
    }
}
