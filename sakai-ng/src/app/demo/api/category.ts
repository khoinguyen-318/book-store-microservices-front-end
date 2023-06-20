export interface Category {
    id?: string;
    name?: string;
    slug?: string;
    createdAt?:Date;
    createdBy?:string;
    modifiedAt?:Date;
    modifiedBy?:string;
    activated?: string;
}
