export interface Book {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  price?: number;
  imagesUrl?: string[];
  categoryId?: string;
  author?: string[];
  publisher?: string;
  series?: string;
  pageCount?: number;
  publicationDate?: Date;
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
  activated?: string;
}
