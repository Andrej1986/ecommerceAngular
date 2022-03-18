import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getProductList(currentCategoryId: number): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/products/search/findByCategoryId?id=${currentCategoryId}&size=100`;
    return this.httpClient.get<GetProductsResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductListPaginate(currentCategoryId: number, page: number, size: number): Observable<GetProductsResponse> {
    const searchUrl: string = `${this.baseUrl}/products/search/findByCategoryId?id=${currentCategoryId}&page=${page}&size=${size}`;
    return this.httpClient.get<GetProductsResponse>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const searchUrl: string = `${this.baseUrl}/product-category`;
    return this.httpClient.get<GetProductCategoriesResponse>(searchUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  searchProducts(theKeyword: string | null): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/products/search/findByNameContaining?name=${theKeyword}`;
    return this.httpClient.get<GetProductsResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

getProductById(id: number): Observable<Product>{
  return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`);
}
}


interface GetProductsResponse {
  _embedded: {
    products: Product[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetProductCategoriesResponse {
  _embedded: {
    productCategory: ProductCategory[]
  }
}

