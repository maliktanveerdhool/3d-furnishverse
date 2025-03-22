
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MINT</h3>
            <p className="text-gray-400 mb-4">
              Quality furniture for modern living. Designed with care, built to last.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-gray-300">
                <Facebook size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-gray-300">
                <Instagram size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-gray-300">
                <Twitter size={20} />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop/living-room" className="text-gray-400 hover:text-white transition-colors">Living Room</Link></li>
              <li><Link to="/shop/bedroom" className="text-gray-400 hover:text-white transition-colors">Bedroom</Link></li>
              <li><Link to="/shop/dining" className="text-gray-400 hover:text-white transition-colors">Dining</Link></li>
              <li><Link to="/shop/office" className="text-gray-400 hover:text-white transition-colors">Office</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/sustainability" className="text-gray-400 hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mint Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
