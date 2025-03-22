
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeDViewer from "@/components/ThreeDViewer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";

// Mock product data
const productData: Product = {
  id: 1,
  name: "Scandinavian Lounge Chair",
  price: 699,
  image: "/placeholder.svg",
  category: "Chairs",
  description: "A comfortable lounge chair inspired by Scandinavian design. Features solid oak legs and high-quality upholstery.",
  colors: ["Light Gray", "Dark Gray", "Blue"],
  dimensions: {
    width: 70,
    height: 80,
    depth: 75
  },
  inStock: true
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(productData.colors?.[0] || "");

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <ThreeDViewer />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
              <div className="text-xl font-medium mb-4">${productData.price}</div>
              <p className="text-gray-600 mb-6">{productData.description}</p>
              
              {productData.colors && productData.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Color</h3>
                  <div className="flex space-x-4">
                    {productData.colors.map((color) => (
                      <button
                        key={color}
                        className={`px-4 py-2 border rounded-md ${
                          selectedColor === color
                            ? "border-black"
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
                <Button className="flex-1" size="lg">
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
                    Crafted with attention to detail, this chair combines style and comfort.
                    The frame is made from solid oak, and the cushions are filled with
                    high-density foam for optimal support.
                  </p>
                </TabsContent>
                <TabsContent value="dimensions" className="pt-4">
                  {productData.dimensions && (
                    <ul>
                      <li>Width: {productData.dimensions.width} cm</li>
                      <li>Height: {productData.dimensions.height} cm</li>
                      <li>Depth: {productData.dimensions.depth} cm</li>
                    </ul>
                  )}
                </TabsContent>
                <TabsContent value="shipping" className="pt-4">
                  <p>
                    We ship nationwide with delivery times ranging from 3-7 business days.
                    For bulky items, we offer white glove delivery service at an additional cost.
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
