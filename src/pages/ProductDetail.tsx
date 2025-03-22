
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeDViewer from "@/components/ThreeDViewer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCw, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";
import { toast } from "sonner";

// Enhanced product data with real images
const products: Product[] = [
  {
    id: 1,
    name: "Scandinavian Lounge Chair",
    price: 699,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    category: "Chairs",
    description: "A comfortable lounge chair inspired by Scandinavian design. Features solid oak legs and high-quality upholstery that will complement any modern living space.",
    colors: ["Light Gray", "Dark Gray", "Blue"],
    dimensions: {
      width: 70,
      height: 80,
      depth: 75
    },
    inStock: true,
    modelPath: "/models/chair.glb"
  },
  {
    id: 2,
    name: "Modern Coffee Table",
    price: 449,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    category: "Tables",
    description: "Minimalist coffee table with a sleek design. Made from tempered glass and premium walnut, this table brings elegance to your living room.",
    colors: ["Walnut", "Oak", "Black"],
    dimensions: {
      width: 120,
      height: 45,
      depth: 60
    },
    inStock: true,
    modelPath: "/models/table.glb"
  },
  {
    id: 3,
    name: "Nordic Sofa",
    price: 1299,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    category: "Sofas",
    description: "Three-seater sofa with a timeless Nordic design. Features comfortable cushions with removable covers and solid wooden legs.",
    colors: ["Beige", "Light Gray", "Dark Blue"],
    dimensions: {
      width: 220,
      height: 85,
      depth: 95
    },
    inStock: true,
    modelPath: "/models/sofa.glb"
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the product based on the ID from the URL
    const productId = parseInt(id || "1");
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors?.[0] || "");
    }
    
    setIsLoading(false);
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    toast.success(`${product?.name} added to cart`, {
      description: `${quantity} x $${product?.price} - ${selectedColor}`
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <RotateCw className="h-10 w-10 text-gray-400" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24">
        <Navbar />
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl font-bold mb-6">Product Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <ThreeDViewer modelPath={product.modelPath} productImage={product.image} />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="text-2xl font-medium mb-4">${product.price}</div>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex space-x-4">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`px-4 py-2 border rounded-md ${
                          selectedColor === color
                            ? "border-black bg-black text-white"
                            : "border-gray-300"
                        }`}
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-10 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex space-x-4 mb-8">
                <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-3 text-gray-500" />
                  <span>Free shipping over $500</span>
                </div>
                <div className="flex items-center">
                  <RotateCw className="h-5 w-5 mr-3 text-gray-500" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-gray-500" />
                  <span>2-year warranty</span>
                </div>
              </div>
              
              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-4">
                  <p>
                    Crafted with attention to detail, this {product.category.toLowerCase().slice(0, -1)} combines style and comfort.
                    The frame is made from solid materials, and the design ensures durability and long-lasting beauty.
                  </p>
                </TabsContent>
                <TabsContent value="dimensions" className="pt-4">
                  {product.dimensions && (
                    <ul className="space-y-2">
                      <li>Width: {product.dimensions.width} cm</li>
                      <li>Height: {product.dimensions.height} cm</li>
                      <li>Depth: {product.dimensions.depth} cm</li>
                    </ul>
                  )}
                </TabsContent>
                <TabsContent value="shipping" className="pt-4">
                  <p>
                    We ship nationwide with delivery times ranging from 3-7 business days.
                    For bulky items, we offer white glove delivery service at an additional cost.
                    For this {product.category.toLowerCase().slice(0, -1)}, standard delivery takes approximately 5 business days.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
