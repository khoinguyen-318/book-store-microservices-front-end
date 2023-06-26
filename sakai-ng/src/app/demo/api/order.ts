export interface Order {
    orderId: string;
    customer: string;
    address: string;
    phone: string;
    paymentMethod: string;
    totalPrice: number;
    orderDate: Date;
    status: {
        shipment: string;
        payment: string;
        order: string;
    };
}
