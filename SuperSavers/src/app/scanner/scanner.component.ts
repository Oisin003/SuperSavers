import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  // Form fields
  productId: number | null = null;
  list = '';
  description = '';
  price: number | null = null;
  soldAs = 1;
  stock: number | null = null;
  
  categories: string[] = [];
  result?: Product;
  message = '';
  usedIdsByCategory = new Map<string, Set<number>>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    const all = this.productService.getAll();
    this.categories = Array.from(new Set(all.map(p => p.category))).sort();
    if (this.categories.length) this.list = this.categories[0];
    
    // Track which IDs are used per category
    this.categories.forEach(cat => {
      this.usedIdsByCategory.set(cat, new Set());
    });
    all.forEach(p => {
      const catSet = this.usedIdsByCategory.get(p.category);
      if (catSet) catSet.add(p.id);
    });
  }

  onAddProduct(): void {
    this.message = '';

    // Validation
    if (this.productId === null || this.productId === undefined || !this.list || !this.description || this.price === null || this.stock === null) {
      this.message = 'Please fill in all fields: #, List, Description, Price, and Stock.';
      return;
    }

    const prodId = Number(this.productId);
    if (isNaN(prodId) || prodId < 1) {
      this.message = 'Product # must be a positive number.';
      return;
    }

    console.log('Creating product with ID:', prodId, 'Raw value:', this.productId);

    // Check if ID already exists in this category only
    const catSet = this.usedIdsByCategory.get(this.list);
    if (catSet && catSet.has(prodId)) {
      this.message = `Product # ${prodId} is already in use in the ${this.list} category. Please use a different number.`;
      return;
    }

    if (this.price < 0) {
      this.message = 'Price cannot be negative.';
      return;
    }

    if (this.stock < 0) {
      this.message = 'Stock cannot be negative.';
      return;
    }

    if (this.soldAs < 1) {
      this.message = 'Sold As must be at least 1.';
      return;
    }

    // Create new product
    const newProduct: Product = {
      id: prodId,
      name: this.description,
      description: this.description,
      price: this.price,
      packSize: this.soldAs,
      quantity: this.stock,
      category: this.list
    };

    // Add to service
    this.productService.addProduct(newProduct);
    if (catSet) catSet.add(prodId);

    this.result = newProduct;
    this.message = `✓ Product added: ${newProduct.name} (# ${newProduct.id}) — ${newProduct.category}, Price: £${newProduct.price.toFixed(2)}, Stock: ${newProduct.quantity}`;

    // Reset form
    this.productId = null;
    this.description = '';
    this.price = null;
    this.soldAs = 1;
    this.stock = null;
  }
}
