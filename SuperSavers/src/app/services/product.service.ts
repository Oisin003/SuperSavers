import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Baked Beans', description: 'Baked Beans 400g tin', price: 0.85, packSize: 1, quantity: 240, category: 'Food' },
    { id: 2, name: 'Washing Up Liquid', description: 'Washing Up Liquid 500ml', price: 1.99, packSize: 1, quantity: 120, category: 'Household' },
    { id: 3, name: 'Poly Bag 1kg', description: 'Polyethylene Bags 1kg pack', price: 3.50, packSize: 1, quantity: 400, category: 'Powders&Plastics' },
    { id: 4, name: 'Dog Kibble 10kg', description: 'Dog Kibble 10kg bag', price: 29.99, packSize: 1, quantity: 70, category: 'Pet Food' },
    { id: 5, name: 'Car Shampoo', description: 'Car Shampoo 1L', price: 6.49, packSize: 1, quantity: 150, category: 'Car Care' },
    { id: 6, name: 'Shampoo', description: 'Shampoo 250ml', price: 4.25, packSize: 1, quantity: 300, category: 'Toiletries' },
    { id: 7, name: 'Toilet Roll Pack', description: 'Toilet Roll 9-pack', price: 8.99, packSize: 9, quantity: 500, category: 'Toilet Roll' },
    { id: 8, name: 'Corn Flakes', description: 'Corn Flakes 750g box', price: 2.99, packSize: 1, quantity: 200, category: 'Cereals' },
    { id: 9, name: 'Coke 6-pack', description: 'Coke 6 pack original can 350ml', price: 4.50, packSize: 6, quantity: 180, category: 'Food' },
    { id: 10, name: 'Pepsi 6-pack', description: 'Pepsi 6 pack 330ml cans', price: 4.25, packSize: 6, quantity: 160, category: 'Food' },
    { id: 11, name: 'Tomato Soup', description: 'Tomato Soup 400g', price: 0.95, packSize: 1, quantity: 220, category: 'Food' },
    { id: 12, name: 'Rice 5kg', description: 'White Rice 5kg bag', price: 9.99, packSize: 1, quantity: 80, category: 'Food' },
    { id: 13, name: 'Pasta 1kg', description: 'Spaghetti 1kg', price: 1.29, packSize: 1, quantity: 180, category: 'Food' },
    { id: 14, name: 'Sugar 1kg', description: 'Granulated Sugar 1kg', price: 1.49, packSize: 1, quantity: 210, category: 'Food' },
    { id: 15, name: 'Laundry Powder 2kg', description: 'Laundry Powder 2kg', price: 7.49, packSize: 1, quantity: 90, category: 'Household' },
    { id: 16, name: 'Dishwasher Tablets 30', description: 'Dishwasher Tablets 30-pack', price: 12.99, packSize: 30, quantity: 60, category: 'Household' },
    { id: 17, name: 'Bin Bags 50', description: 'Black Bin Bags 50-pack', price: 6.99, packSize: 50, quantity: 140, category: 'Powders&Plastics' },
    { id: 18, name: 'Cling Film 300m', description: 'Cling Film 300m roll', price: 5.49, packSize: 1, quantity: 110, category: 'Powders&Plastics' },
    { id: 19, name: 'Cat Food 2kg', description: 'Cat Food 2kg', price: 8.99, packSize: 1, quantity: 95, category: 'Pet Food' },
    { id: 20, name: 'Bird Seed 5kg', description: 'Wild Bird Seed 5kg', price: 14.99, packSize: 1, quantity: 35, category: 'Pet Food' },
    { id: 21, name: 'Car Wax', description: 'Car Wax Paste 300ml', price: 9.49, packSize: 1, quantity: 45, category: 'Car Care' },
    { id: 22, name: 'Wheel Cleaner', description: 'Wheel Cleaner 500ml', price: 7.25, packSize: 1, quantity: 60, category: 'Car Care' },
    { id: 23, name: 'Toothpaste', description: 'Toothpaste 100ml', price: 2.49, packSize: 1, quantity: 260, category: 'Toiletries' },
    { id: 24, name: 'Hand Soap', description: 'Liquid Hand Soap 300ml', price: 1.99, packSize: 1, quantity: 240, category: 'Toiletries' },
    { id: 25, name: 'Kitchen Roll 2-pack', description: 'Kitchen Roll 2-pack', price: 3.49, packSize: 2, quantity: 210, category: 'Household' },
    { id: 26, name: 'Muesli 1kg', description: 'Muesli 1kg box', price: 3.99, packSize: 1, quantity: 130, category: 'Cereals' },
    { id: 27, name: 'Special K 500g', description: 'Special K 500g', price: 3.49, packSize: 1, quantity: 110, category: 'Cereals' },
    { id: 28, name: 'Face Wipes 30', description: 'Face Wipes 30-pack', price: 2.99, packSize: 30, quantity: 150, category: 'Toiletries' },
    { id: 29, name: 'Paper Plates 20', description: 'Disposable Paper Plates 20-pack', price: 2.50, packSize: 20, quantity: 75, category: 'Household' },
    { id: 30, name: 'Cooking Oil 1L', description: 'Vegetable Oil 1L', price: 2.25, packSize: 1, quantity: 190, category: 'Food' },
    { id: 31, name: 'Instant Coffee 200g', description: 'Instant Coffee 200g jar', price: 4.99, packSize: 1, quantity: 140, category: 'Food' },
    { id: 32, name: 'Savoury Biscuits 300g', description: 'Savoury Biscuits 300g tin', price: 2.49, packSize: 1, quantity: 160, category: 'Food' },
    { id: 33, name: 'Aluminium Foil 50m', description: 'Aluminium Foil 50m', price: 3.99, packSize: 1, quantity: 120, category: 'Powders&Plastics' },
    { id: 34, name: 'Fabric Softener 1L', description: 'Fabric Softener 1L', price: 4.99, packSize: 1, quantity: 85, category: 'Household' },
    { id: 35, name: 'Dog Treats 500g', description: 'Dog Treats 500g', price: 5.99, packSize: 1, quantity: 150, category: 'Pet Food' }
  ];

  /**
   * Mimic a barcode scanner: find or create a product by barcode, update its
   * category and quantity, and place it at the requested position within that
   * category ordering.
   *
   * barcode: numeric id or product name
   * category: target category string (must match existing category labels)
   * position: 1-based position within the category list
   * qty: quantity to add (defaults to 1)
   */
  scanAndPlace(barcode: string, category: string, position: number, qty: number = 1, setAbsolute: boolean = false): Product {
    // try to resolve by numeric id first
    let product: Product | undefined;
    const asId = Number(barcode);
    if (!isNaN(asId)) {
      product = this.products.find(p => p.id === asId);
    }
    if (!product) {
      product = this.products.find(p => p.name.toLowerCase() === barcode.toLowerCase());
    }

    if (product) {
      // update category and quantity (add or set depending on setAbsolute)
      product.category = category;
      if (setAbsolute) {
        product.quantity = qty;
      } else {
        product.quantity = (product.quantity || 0) + qty;
      }
      this.moveProductToCategoryPosition(product, category, position);
      return product;
    }

    // create a new product when barcode not found
    const newId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    const newProduct: Product = {
      id: newId,
      name: barcode,
      description: barcode,
      price: 0,
      packSize: 1,
      quantity: qty,
      category
    };

    this.insertProductAtCategoryPosition(newProduct, category, position);
    return newProduct;
  }

  private moveProductToCategoryPosition(product: Product, category: string, position: number) {
    // remove existing instance
    const currentIndex = this.products.findIndex(p => p.id === product.id);
    if (currentIndex !== -1) this.products.splice(currentIndex, 1);
    // insert at desired position within category
    this.insertProductAtCategoryPosition(product, category, position);
  }

  private insertProductAtCategoryPosition(product: Product, category: string, position: number) {
    // gather indices of items in the target category
    const catIndices = this.products
      .map((p, i) => ({ p, i }))
      .filter(x => x.p.category === category)
      .map(x => x.i);

    let insertAt = this.products.length; // default append
    if (catIndices.length === 0) {
      // If no items currently in category, append to end
      insertAt = this.products.length;
    } else {
      if (position <= 1) {
        insertAt = catIndices[0];
      } else if (position > catIndices.length) {
        insertAt = catIndices[catIndices.length - 1] + 1;
      } else {
        insertAt = catIndices[position - 1];
      }
    }

    // clamp
    insertAt = Math.max(0, Math.min(insertAt, this.products.length));
    this.products.splice(insertAt, 0, product);
  }

  getByCategory(category: string): Product[] {
    return this.products
      .filter(p => p.category === category)
      .sort((a, b) => a.id - b.id);
  }

  // return all products (useful for tools and services)
  getAll(): Product[] {
    return this.products;
  }

  // find a product by id
  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // increase stock for a product by id, returns updated product or undefined
  addStock(id: number, qty: number): Product | undefined {
    const p = this.getProductById(id);
    if (!p) return undefined;
    p.quantity = (p.quantity || 0) + qty;
    return p;
  }

  // Add a new product directly to the product list
  addProduct(product: Product): Product {
    this.products.push(product);
    return product;
  }
}
