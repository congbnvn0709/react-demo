export interface ResponseLogin {
  id: number;
  username: string;
  role: string;
  fullName: string;
  userAgent: string;
  token: string;
}

export interface IProduct {
  createDate: string;
  createBy: string;
  updateDate?: string;
  updateBy?: string;
  id: number;
  name: string;
  image: string;
  price: number;
  status: string;
  shippingUnit: string;
  productType: string;
}

export interface ISearchProduct {
  name: string;
  page: number;
  size: number;
  sortField: string;
  sortType: string;
  productType: string[] | [];
}

export interface ResponseSearchProduct<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}