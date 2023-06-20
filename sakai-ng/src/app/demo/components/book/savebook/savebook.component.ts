import { SlugifyPipe } from 'app/demo/service/slugify.pipe';
import { Component, OnInit } from '@angular/core';
import { Category } from 'app/demo/api/category';
import { Book } from 'app/demo/api/book';
import { CategoryService } from 'app/demo/service/category.service';
import { MessageService } from 'primeng/api';
import { BookService } from 'app/demo/service/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-savebook',
    templateUrl: './savebook.component.html',
    styleUrls: ['./savebook.component.scss'],
    providers: [SlugifyPipe, CategoryService, MessageService, BookService],
})
export class SavebookComponent implements OnInit {
    files = new Set<any>();
    categories!: Category[];
    selectedCategory!: Category;
    book: Book = {};
    submitted: boolean = false;
    id!:string;
    constructor(
        private slugifyPipe: SlugifyPipe,
        private categoryService: CategoryService,
        private bookService: BookService,
        private messageService: MessageService,
        private activeRoute: ActivatedRoute
    ) {
        this.id = this.activeRoute.snapshot.queryParamMap.get('id')!;
        if(this.id){
            this.getDetailBook(this.id);
        }
    }

    ngOnInit(): void {
        this.initDataForCategory();

    }
    initDataForCategory() {
        this.categoryService.getCategory().subscribe((data) => {
            this.categories = data;
        });
    }
    getDetailBook(id:string){
        this.bookService.getBookById(id).subscribe((data)=>{
            this.book = data;
        })
    }
    genarateSlug(event: any) {
        this.book.slug = this.slugifyPipe.transform(event.target.value);
    }
    onUpload(event: any) {
        for (let file of event.files) {
            this.files.add(file);
        }
        this.messageService.add({
            severity: 'info',
            summary: 'File Uploaded',
            detail: '',
        });
    }
    saveBook() {
        this.submitted = true;
        if (this.book.id) {
            this.bookService.updateBook(this.book, this.files).subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Book Updated',
                        life: 3000,
                    });
                    this.book = {};
                    this.files.clear();
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
        } else {
            this.bookService.createBook(this.book, this.files).subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Book Created',
                        life: 3000,
                    });
                    this.book = {};
                    this.files.clear();
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
        }
        this.submitted = false;

    }
}
