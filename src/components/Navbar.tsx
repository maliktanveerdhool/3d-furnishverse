
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 px-6 shadow-sm fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl">MINT</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-gray-500 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-gray-500 transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-gray-500 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-gray-500 transition-colors">Contact</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart size={20} />
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute w-full left-0 px-6 py-4 shadow-md">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="hover:text-gray-500 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-gray-500 transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-gray-500 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-gray-500 transition-colors">Contact</Link>
            <div className="flex space-x-4 pt-2">
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
