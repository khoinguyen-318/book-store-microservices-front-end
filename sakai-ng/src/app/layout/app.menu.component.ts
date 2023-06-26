import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { API } from 'environments/api';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'Managements',
                items: [
                    {
                        label: 'Category',
                        icon: 'pi pi-fw pi-folder',
                        routerLink: ['/category'],
                    },
                    {
                        label: 'Book',
                        icon: 'pi pi-fw pi-file',
                        items: [
                            {
                                label: 'Add book',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/book/add'],
                            },
                            {
                                label: 'List book',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/book'],
                            },
                        ],
                    },
                    {
                        label: 'Order',
                        icon: 'pi pi-fw pi-shopping-cart',
                        items: [
                            {
                                label: 'List Order',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/order'],
                            },
                            {
                                label: 'Order created',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/order/created'],
                            },
                            {
                                label: 'Order rejected',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/order/rejected'],
                            },
                            {
                                label: 'Order canceled',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/order/canceled'],
                            },
                            {
                                label: 'Order completed',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/order/completed'],
                            },
                        ],
                    },
                    // {
                    //     label: 'User',
                    //     icon: 'pi pi-fw pi-users',
                    //     items: [
                    //         {
                    //             label: 'Order created',
                    //             icon: 'pi pi-fw pi-plus',
                    //             routerLink: ['/order/created'],
                    //         },
                    //         {
                    //             label: 'Order rejected',
                    //             icon: 'pi pi-fw pi-list',
                    //             routerLink: ['/order/rejected'],
                    //         },
                    //         {
                    //             label: 'Order canceled',
                    //             icon: 'pi pi-fw pi-list',
                    //             routerLink: ['/order/canceled'],
                    //         },
                    //         {
                    //             label: 'Order completed',
                    //             icon: 'pi pi-fw pi-list',
                    //             routerLink: ['/order/completed'],
                    //         },
                    //     ],
                    // },
                    {
                        label: 'Shipping',
                        icon: 'pi pi-fw pi-truck',
                        items: [
                            {
                                label: 'Order created',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/order/created'],
                            },
                            {
                                label: 'Order rejected',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/order/rejected'],
                            },
                            {
                                label: 'Order canceled',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/order/canceled'],
                            },
                            {
                                label: 'Order completed',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/order/completed'],
                            },
                        ],
                    },
                    {
                        label: 'Slide',
                        icon: 'pi pi-fw pi-sliders-h',
                        routerLink: ['/slider'],
                    }
                ],
            },
            {
                label: 'Utilities',
                items: [
                    {
                        label: 'Axon server',
                        icon: 'pi pi-fw pi-server',
                        url: [API.AXON],
                        target: '_blank',
                    },
                    {
                        label: 'Keycloak',
                        icon: 'pi pi-fw pi-key',
                        url: [API.KEYCLOAK],
                        target: '_blank',
                    },
                    {
                        label: 'Mongo express',
                        icon: 'pi pi-fw pi-table',
                        url: [API.MONGOEXPRESS],
                        target: '_blank',
                    },
                    {
                        label: 'Zipkin',
                        icon: 'pi pi-fw pi-cog',
                        url: [API.ZIPKIN],
                        target: '_blank',
                    },
                    {
                        label: 'Prometheus',
                        icon: 'pi pi-fw pi-chart-line',
                        url: [API.PROMETHEUS],
                        target: '_blank',
                    },
                    {
                        label: 'Grafana',
                        icon: 'pi pi-fw pi-chart-bar',
                        url: [API.GRAFANA],
                        target: '_blank',
                    },
                    {
                        label: 'PgAdmin4',
                        icon: 'pi pi-fw pi-prime',
                        url: [API.PGADMIN],
                        target: '_blank',
                    },
                ],
            },
        ];
    }
}
