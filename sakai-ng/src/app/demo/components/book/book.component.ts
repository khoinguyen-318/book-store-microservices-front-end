import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'app/demo/api/book';
import { BookService } from 'app/demo/service/book.service';
import { ExportFileService } from 'app/demo/service/export-file.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    providers: [MessageService, ExportFileService, BookService],
})
export class BookComponent implements OnInit {
    constructor(
        private exportFileService: ExportFileService,
        private bookService: BookService,
        private messageService: MessageService,
        private router:Router
    ) {}

    responsiveOptions!: any[];
    images!: any[];
    books: Book[] = [];
    book: Book = {};
    cols: any[] = [];
    exportColumns!: any[];
    totalRecords!: number;
    deleteBookDialog: boolean = false;
    detailBookDialog: boolean = false;

    ngOnInit(): void {
        this.refreshData();
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'title', header: 'Title' },
            { field: 'slug', header: 'Slug' },
            { field: 'description', header: 'description' },
            { field: 'price', header: 'price' },
            { field: 'imagesUrl', header: 'imagesUrl' },
            { field: 'categoryId', header: 'categoryId' },
            { field: 'author', header: 'author' },
            { field: 'publisher', header: 'publisher' },
            { field: 'series', header: 'series' },
            { field: 'pageCount', header: 'pageCount' },
            { field: 'publicationDate', header: 'publicationDate' },
            { field: 'createdAt', header: 'Created At' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'modifiedAt', header: 'Modified At' },
            { field: 'modifiedBy', header: 'Modified By' },
            { field: 'activated', header: 'Activated' },
        ];
        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
    }
    refreshData(event?: any) {
        if (event !== undefined) {
            this.bookService
                .getBook(event.first, event.rows)
                .subscribe((data) => {
                    this.books = data;
                    this.totalRecords = data.length;
                });
        }
        else{
            this.bookService
                .getBook(0, 10)
                .subscribe((data) => {
                    this.books = data;
                    this.totalRecords = data.length;
                });
        }
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
    editBook(book: Book) {
        this.book = { ...book };
        this.router.navigate(['/book/add'],{
            queryParams: {id: this.book.id}
        })
    }
    deleteBook(book: Book) {
        this.deleteBookDialog = true;
        this.book = { ...book };
    }
    detail(book: Book) {
        this.detailBookDialog = true;
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5,
            },
            {
                breakpoint: '768px',
                numVisible: 3,
            },
            {
                breakpoint: '560px',
                numVisible: 1,
            },
        ];
        this.book = { ...book };
        this.images = this.book.imagesUrl!;
    }
    confirmDelete() {
        this.deleteBookDialog = false;
        this.bookService.deleteBook(this.book.id!).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Deleted Successful',
                    life: 3000,
                });
                this.refreshData();
            },
            (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err,
                    life: 3000,
                });
            }
        );
        this.book = {};
    }
    exportExcel() {
        this.exportFileService.exportExcel(this.books, 'book');
    }
    exportPdf() {
        this.exportFileService.exportPdf(
            this.exportColumns,
            this.books,
            'book'
        );
    }
}
