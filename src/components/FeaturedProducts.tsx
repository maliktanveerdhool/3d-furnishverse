
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types/product";
import { toast } from "sonner";

// Updated product data with real images
const products: Product[] = [
  {
    id: 1,
    name: "Scandinavian Lounge Chair",
    price: 699,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    category: "Chairs",
    featured: true
  },
  {
    id: 2,
    name: "Modern Coffee Table",
    price: 449,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    category: "Tables",
    featured: true
  },
  {
    id: 3,
    name: "Nordic Sofa",
    price: 1299,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    category: "Sofas",
    featured: true,
    description: "Three-seater sofa with a timeless Nordic design. Features comfortable cushions with removable covers and solid wooden legs.",
    colors: ["Beige", "Light Gray", "Dark Blue"],
    dimensions: {
      width: 220,
      height: 85,
      depth: 95
    },
    inStock: true,
    modelPath: "/models/sofa.glb"
  },
  {
    id: 4,
    name: "Minimalist Bookshelf",
    price: 499,
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    category: "Storage",
    featured: true,
    description: "A sleek, minimalist bookshelf that combines style and functionality. Made from high-quality oak with a natural finish.",
    colors: ["Oak", "Walnut", "White"],
    dimensions: {
      width: 120,
      height: 180,
      depth: 40
    },
    inStock: true,
    modelPath: "/models/bookshelf.glb"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-gray-600">Our most popular pieces, handpicked for you</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">View All Products</Button>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast.success(`${product.name} added to cart`, {
      description: "Item successfully added to your cart"
    });
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast.success(`${product.name} added to wishlist`, {
      description: "Item saved to your wishlist"
    });
  };
  
  return (
    <Link to={`/products/${product.id}`}>
      <Card 
        className="overflow-hidden transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-64 bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-2">
              <Button size="sm" variant="secondary" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button size="icon" variant="ghost" className="bg-white rounded-full" onClick={handleWishlist}>
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <CardContent className="pt-4">
          <div className="text-sm text-gray-500 mb-1">{product.category}</div>
          <h3 className="font-medium text-lg">{product.name}</h3>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-0">
          <span className="font-medium">${product.price}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default FeaturedProducts;
