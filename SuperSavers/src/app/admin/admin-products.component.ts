import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  allProducts: Product[] = [];
  message = '';
  editingId: number | null = null;

  // Form for adding new product
  newId: number | null = null;
  newName = '';
  newDescription = '';
  newPrice: number | null = null;
  newPackSize = 1;
  newStock: number | null = null;
  newCategory = '';

  // Form for editing
  editId: number | null = null;
  editName = '';
  editDescription = '';
  editPrice: number | null = null;
  editPackSize = 1;
  editStock: number | null = null;

  // Form for adding stock
  addStockProductId: number | null = null;
  addStockQuantity = 1;

  categories: string[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.allProducts = this.productService.getAll();
  }

  loadCategories(): void {
    this.categories = Array.from(new Set(this.allProducts.map(p => p.category))).sort();
  }

  addProduct(): void {
    this.message = '';
    if (this.newId === null || !this.newName || !this.newDescription || this.newPrice === null || this.newStock === null || !this.newCategory) {
      this.message = 'All fields are required.';
      return;
    }

    const newProduct: Product = {
      id: this.newId,
      name: this.newName,
      description: this.newDescription,
      price: this.newPrice,
      packSize: this.newPackSize,
      quantity: this.newStock,
      category: this.newCategory
    };

    this.productService.addProduct(newProduct);
    this.message = `✓ Product '${this.newName}' added successfully.`;
    this.resetAddForm();
    this.loadProducts();
    this.loadCategories();
  }

  resetAddForm(): void {
    this.newId = null;
    this.newName = '';
    this.newDescription = '';
    this.newPrice = null;
    this.newPackSize = 1;
    this.newStock = null;
    this.newCategory = '';
  }

  startEdit(product: Product): void {
    this.editingId = product.id;
    this.editId = product.id;
    this.editName = product.name;
    this.editDescription = product.description;
    this.editPrice = product.price;
    this.editPackSize = product.packSize;
    this.editStock = product.quantity;
  }

  saveEdit(): void {
    this.message = '';
    const product = this.allProducts.find(p => p.id === this.editingId);
    if (product && this.editPrice !== null && this.editStock !== null) {
      product.name = this.editName;
      product.description = this.editDescription;
      product.price = this.editPrice;
      product.packSize = this.editPackSize;
      product.quantity = this.editStock;
      this.message = `✓ Product '${this.editName}' updated successfully.`;
      this.editingId = null;
    } else {
      this.message = '✗ Failed to update product.';
    }
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  deleteProduct(id: number, name: string): void {
    if (confirm(`Are you sure you want to delete '${name}'?`)) {
      this.message = '';
      const index = this.allProducts.findIndex(p => p.id === id);
      if (index !== -1) {
        this.allProducts.splice(index, 1);
        this.message = `✓ Product '${name}' deleted successfully.`;
        this.loadCategories();
      }
    }
  }

  addStockToProduct(): void {
    this.message = '';
    if (this.addStockProductId === null || this.addStockQuantity < 1) {
      this.message = 'Please select a product and enter quantity.';
      return;
    }

    const product = this.allProducts.find(p => p.id === this.addStockProductId);
    if (product) {
      product.quantity += this.addStockQuantity;
      this.message = `✓ Added ${this.addStockQuantity} units to '${product.name}'. New stock: ${product.quantity}`;
      this.addStockProductId = null;
      this.addStockQuantity = 1;
    } else {
      this.message = '✗ Product not found.';
    }
  }

  getCategoriesForNewProduct(): string[] {
    return this.categories.length > 0 ? this.categories : [''];
  }

  getProductsByCategory(category: string): Product[] {
    return this.allProducts.filter(p => p.category === category);
  }

  getAllCategories(): string[] {
    return Array.from(new Set(this.allProducts.map(p => p.category))).sort();
  }
}
