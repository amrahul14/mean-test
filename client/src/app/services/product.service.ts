import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.productsSubject.next(products))
    );
  }

  createProduct(product: Omit<Product, '_id'>): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(newProd => this.productsSubject.next([...this.productsSubject.value, newProd]))
    );
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap(updated => {
        const list = this.productsSubject.value.map(p => (p._id === id ? updated : p));
        this.productsSubject.next(list);
      })
    );
  }

  deleteProduct(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const list = this.productsSubject.value.filter(p => p._id !== id);
        this.productsSubject.next(list);
      })
    );
  }
}
