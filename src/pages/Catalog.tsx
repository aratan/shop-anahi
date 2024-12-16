import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Package, Search, ShoppingCart, Menu, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  onSale?: boolean;
}

const Catalog = () => {
  const { addItem, items } = useCart();
  const navigate = useNavigate();

  const products: Product[] = [
    {
      id: "1",
      name: "SET 9 AM POUR FEMME",
      price: 72.60,
      image: "/placeholder.svg"
    },
    {
      id: "2",
      name: "SET CLUB DE NUIT ICONIC",
      price: 99.22,
      originalPrice: 108.90,
      image: "/placeholder.svg",
      onSale: true
    },
    {
      id: "3",
      name: "BADEE HONOR Y GLORIA",
      price: 40.17,
      originalPrice: 67.64,
      image: "/placeholder.svg",
      onSale: true
    }
  ];

  const addToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b fixed top-0 w-full bg-background z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
              <Link to="/" className="ml-4 text-2xl font-serif">LUXURY SCENTS</Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/catalog"><Button variant="ghost">Catálogo</Button></Link>
              <Link to="/new-arrivals"><Button variant="ghost">Novedades</Button></Link>
              <Link to="/contact"><Button variant="ghost">Contact</Button></Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="pl-10"
                />
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              </div>
              <Button variant="ghost" size="icon">
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
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-2xl font-serif mb-8">Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="aspect-square relative mb-4">
                <img src={product.image} alt={product.name} className="object-cover w-full h-full rounded-md" />
                {product.onSale && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">SALE</span>
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
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;