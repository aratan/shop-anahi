import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, ShoppingCart, Menu, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { searchProducts } from "@/utils/search";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;  // Add this optional property
  originalPrice?: number;
}

const newProducts = [
  {
    id: "1",
    name: "BADEE HONOR Y GLORIA- Unisex",
    price: 40.17,
    originalPrice: 67.64,
    image: "/placeholder.svg",
    isNew: true
  },
  {
    id: "2",
    name: "SET 9 AM POUR FEMME",
    price: 72.60,
    originalPrice: 89.99,
    image: "/placeholder.svg",
    isNew: true
  },
  {
    id: "3",
    name: "SET CLUB DE NUIT ICONIC",
    price: 99.22,
    originalPrice: 108.90,
    image: "/placeholder.svg",
    isNew: true
  }
];

const formatPrice = (price: number): string => {
  return price.toString();  // Convert number to string explicitly
};

const NewArrivals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addItem, items } = useCart();
  const navigate = useNavigate();

  const filteredProducts = searchProducts(newProducts, searchTerm);

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
                  placeholder="Buscar novedades..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

      <div className="container mx-auto py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Novedades</h1>
        
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron productos</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
                    {product.isNew && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        Nuevo
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-red-600">€{product.price}</span>
                      <span className="text-sm line-through ml-2">€{product.originalPrice}</span>
                    </div>
                    <Button 
                      className="flex items-center gap-2"
                      onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                      })}
                    >
                      <Package className="h-4 w-4" />
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
