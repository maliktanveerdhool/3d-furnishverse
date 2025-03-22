
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types/product";

// Mock product data
const products: Product[] = [
  {
    id: 1,
    name: "Minimalist Sofa",
    price: 899,
    image: "/placeholder.svg",
    category: "Sofas"
  },
  {
    id: 2,
    name: "Wooden Coffee Table",
    price: 349,
    image: "/placeholder.svg",
    category: "Tables"
  },
  {
    id: 3,
    name: "Scandinavian Chair",
    price: 249,
    image: "/placeholder.svg",
    category: "Chairs"
  },
  {
    id: 4,
    name: "Modern Bookshelf",
    price: 499,
    image: "/placeholder.svg",
    category: "Storage"
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
  
  return (
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
            <Button size="sm" variant="secondary">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button size="icon" variant="ghost" className="bg-white rounded-full">
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
  );
};

export default FeaturedProducts;
