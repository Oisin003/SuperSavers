export interface Order {
  /** Username that placed the order. */
  shop: string;
  /** Human-readable shop location, such as Longford or Castlebar. */
  shopLocation?: string;
  productId: number;
  productName: string;
  category: string;
  qty: number;
}
