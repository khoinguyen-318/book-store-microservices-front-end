import { Order } from 'app/demo/api/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/demo/service/order.service';
import { Table } from 'primeng/table';
import { ExportFileService } from 'app/demo/service/export-file.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService,ExportFileService,MessageService]
})
export class OrderComponent implements OnInit{
    constructor(private orderService:OrderService,
                private exportFileService:ExportFileService,
                private messageService: MessageService){}
    ngOnInit(): void {
        this.refreshData();
        this.cols = [
            { field: 'orderId', header: 'ID' },
            { field: 'customer', header: 'Customer' },
            { field: 'address', header: 'Address' },
            { field: 'phone', header: 'Phone' },
            { field: 'paymentMethod', header: 'Method' },
            { field: 'totalPrice', header: 'Price' },
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    orders: Order[] =[];
    cols: any[] = [];
    exportColumns!: any[];
    rowsPerPageOptions = [5, 10, 20];

    refreshData(){
        this.orderService.getAllOrder().subscribe((data)=>{
            this.orders = data;
        })
    }
    changeStatus(orderId:string,status:string){
        this.orderService.changeStatus(orderId,status).subscribe(()=>{
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: `Change to ${status} successful`, life: 3000 });
            this.refreshData();
        },(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
        }
        )
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    exportExcel(){
        this.exportFileService.exportExcel(this.orders,'order');
    }
    exportPdf(){
        this.exportFileService.exportPdf(this.exportColumns,this.orders,'order');
    }

}
