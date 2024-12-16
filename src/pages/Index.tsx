import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, User, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 29, seconds: 46 });
  const { addItem, items } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showUserValidation, setShowUserValidation] = useState(false);
  const [username, setUsername] = useState("");

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // User validation query
  const { data: users, isLoading: isValidating } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      return response.json();
    },
    enabled: showUserValidation && username.length > 0
  });

  const validateUser = () => {
    if (users && users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
      toast({
        title: "Success!",
        description: "User validated successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      });
    }
  };

  const featuredProducts = [
    {
      id: "1",
      name: "SET 9 AM POUR FEMME",
      price: 72.60,
      image: "https://divinafraganciacr.com/cdn/shop/files/9AM-MUJER-100ML-EDP-AFNAN.jpg"
    },
    {
      id: "2",
      name: "SET CLUB DE NUIT ICONIC",
      price: 99.22,
      originalPrice: 108.90,
      image: "https://fraganzi.com/cdn/shop/files/regalopremiundiadelpadre.jpg",
      onSale: true
    },
    {
      id: "3",
      name: "BADEE HONOR Y GLORIA",
      price: 40.17,
      originalPrice: 67.64,
      image: "https://www.perfumesmalaga.es/2469-large_default/bade-e-al-oud-honor-glory-lattafa-perfumes-unisex.jpg",
      onSale: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b fixed top-0 left-0 right-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
              <img src="https://lasalhajasdetoledoymas.com/cdn/shop/files/Screenshot_20231214_090808_ad92fa08-082b-4d36-9beb-876727ffa229.jpg?v=1704297589&width=150"></img>
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
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowUserValidation(!showUserValidation)}
              >
                <User className="h-5 w-5" />
              </Button>
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
          {showUserValidation && (
            <div className="py-2 flex gap-2">
              <Input
                type="text"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1"
              />
              <Button onClick={validateUser} disabled={isValidating}>
                {isValidating ? "Validating..." : "Validate"}
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with fixed top margin to account for fixed nav */}
      <div className="relative bg-[#9b87f5]/10 py-24 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-serif tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              PERFUMES ÁRABES
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Fragancias Orientales de Dubái, inspiradas en las mil y una noches. Vive la sensualidad y exotismo.
            </p>
            
            {/* Sale Timer */}
            <div className="mt-8">
              <p className="text-lg font-semibold text-primary">Hurry up!</p>
              <p className="text-sm text-gray-500">Sale ends in:</p>
              <div className="flex justify-center gap-8 mt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-sm text-gray-500">Mins</div>
                </div>
                <div className="text-2xl font-bold">:</div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-sm text-gray-500">Secs</div>
                </div>
              </div>
            </div>

            <Button className="mt-8 text-lg px-8 py-3" size="lg">
              Shop now!
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-2xl font-serif mb-8">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="aspect-square relative mb-4">
                <img src={product.image} alt={product.name} className="object-cover w-full h-full rounded-md" />
                {product.onSale && (
                  <Badge className="absolute top-2 right-2 bg-red-500">SALE</Badge>
                )}
              </div>
              <h4 className="font-medium">{product.name}</h4>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-lg font-semibold">€{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">€{product.originalPrice}</span>
                )}
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image
                })}
              >
                Agregar al carrito
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-serif text-lg mb-4">About Us</h4>
              <p className="text-sm text-gray-500">
                Luxury fragrances and accessories for the discerning customer.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Shipping Information</li>
                <li>Returns & Exchanges</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon">
                  <i className="fab fa-facebook"></i>
                </Button>
                <Button variant="ghost" size="icon">
                  <i className="fab fa-instagram"></i>
                </Button>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Newsletter</h4>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <Button className="w-full mt-2">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;