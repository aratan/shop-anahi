import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const Navigation = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      navigate('/');
    }
  };

  return (
    <nav className="border-b fixed top-0 left-0 right-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
            <img 
              src="https://lasalhajasdetoledoymas.com/cdn/shop/files/Screenshot_20231214_090808_ad92fa08-082b-4d36-9beb-876727ffa229.jpg" 
              className="w-15 h-8" 
              alt="Logo" 
            />
            <Link to="/" className="ml-4 text-2xl font-serif">LUXURY SCENTS</Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/catalog"><Button variant="ghost">Catálogo</Button></Link>
            <Link to="/new-arrivals"><Button variant="ghost">Novedades</Button></Link>
            <Link to="/contact"><Button variant="ghost">Contact</Button></Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                  {items.reduce((acc, item) => acc + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        {showSearch && (
          <div className="py-2">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>
    </nav>
  );
};