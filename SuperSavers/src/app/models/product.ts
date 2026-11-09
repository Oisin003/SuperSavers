export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // price in euros
  packSize: number; // quantity sold as (e.g., 6 for a 6-pack)
  quantity: number; // current stock count
  category: string;
}
