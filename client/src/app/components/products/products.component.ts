import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, WeatherComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  showForm = false;
  editingId: string | null = null;
  loading = false;
  error = '';
  formError = '';

  formData: Omit<Product, '_id'> = { name: '', price: 0, description: '' };

  constructor(private productService: ProductService) {
    this.products$ = this.productService.products$;
  }

  ngOnInit(): void {
    this.loading = true;
    this.productService.loadProducts().subscribe({
      next: () => { this.loading = false; },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to load products';
      }
    });
  }

  openForm(): void {
    this.showForm = true;
    this.editingId = null;
    this.formData = { name: '', price: 0, description: '' };
    this.formError = '';
  }

  editProduct(product: Product): void {
    this.showForm = true;
    this.editingId = product._id!;
    this.formData = { name: product.name, price: product.price, description: product.description };
    this.formError = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.showForm = false;
    this.editingId = null;
    this.formData = { name: '', price: 0, description: '' };
    this.formError = '';
  }

  saveProduct(): void {
    if (!this.formData.name.trim() || !this.formData.description.trim() || this.formData.price < 0) {
      this.formError = 'All fields are required and price must be non-negative';
      return;
    }
    this.formError = '';

    const action$ = this.editingId
      ? this.productService.updateProduct(this.editingId, this.formData)
      : this.productService.createProduct(this.formData);

    action$.subscribe({
      next: () => this.cancelEdit(),
      error: err => { this.formError = err.error?.message || 'Operation failed'; }
    });
  }

  deleteProduct(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      error: err => { this.error = err.error?.message || 'Delete failed'; }
    });
  }
}
