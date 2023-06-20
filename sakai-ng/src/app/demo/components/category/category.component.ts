import { ExportFileService } from './../../service/export-file.service';
import { Component } from '@angular/core';
import { Category } from 'app/demo/api/category';
import {CategoryService } from 'app/demo/service/category.service';
import { SlugifyPipe } from 'app/demo/service/slugify.pipe';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [MessageService,ExportFileService,SlugifyPipe]
})
export class CategoryComponent {
    categoryDialog: boolean = false;

    deleteCategoryDialog: boolean = false;

    categories: Category[] = [];

    category: Category = {};

    submitted: boolean = false;

    cols: any[] = [];

    exportColumns!: any[];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private slugifyPipe: SlugifyPipe,private exportFileService:ExportFileService,private categoryService: CategoryService, private messageService: MessageService) { }

    ngOnInit() {
        this.refreshData();

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'name', header: 'Category name' },
            { field: 'slug', header: 'Slug' },
            { field: 'createdAt', header: 'Created At' },
            { field: 'createdBy', header: 'Created By' },
            { field: 'modifiedAt', header: 'Modified At' },
            { field: 'modifiedBy', header: 'Modified By' },
            { field: 'activated', header: 'Activated' }
        ];
        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }
    refreshData(){
        this.categoryService.getCategory().subscribe((data)=>{
            this.categories = data;
        });
    }

    openNew() {
        this.category = {};
        this.submitted = false;
        this.categoryDialog = true;
    }

    editCategory(Category: Category) {
        this.category = { ...Category };
        this.categoryDialog = true;
    }

    deleteCategory(Category: Category) {
        this.deleteCategoryDialog = true;
        this.category = { ...Category };
    }
    confirmDelete() {
        this.deleteCategoryDialog = false;
        this.categoryService.deleteCategory(this.category.id!).subscribe(()=>{
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted Successful', life: 3000 });
            this.refreshData();
        },(err)=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
        })
        this.category = {};
    }

    hideDialog() {
        this.categoryDialog = false;
        this.submitted = false;
    }
    genarateSlug(event:any){
        this.category.slug = this.slugifyPipe.transform(event.target.value);
    }

    saveCategory() {
        this.submitted = true;

        if (this.category.name?.trim()) {
            if (this.category.id) {
                // @ts-ignore
                this.categoryService.updateCategory(this.category).subscribe(()=>{
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
                    this.refreshData();
                },(err)=>{
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                })
            } else {
                // @ts-ignore
                this.categoryService.createCategory(this.category).subscribe(()=>{
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
                    this.refreshData();
                },(err)=>{
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                })
            }
            this.categories = [...this.categories];
            this.categoryDialog = false;
            this.category = {};
        }
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    exportExcel(){
        this.exportFileService.exportExcel(this.categories,'category');
    }
    exportPdf(){
        this.exportFileService.exportPdf(this.exportColumns,this.categories,'category');
    }

}
