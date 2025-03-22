
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  inStock?: boolean;
  featured?: boolean;
  colors?: string[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
}
