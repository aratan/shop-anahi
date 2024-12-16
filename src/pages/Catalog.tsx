import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { searchProducts, type Product } from "@/utils/search";
import { Link } from "react-router-dom";

const products: Product[] = [
  {
    id: 1,
    name: "SET 9 AM POUR FEMME",
    price: 72.60,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "SET CLUB DE NUIT ICONIC",
    price: 99.22,
    originalPrice: 108.90,
    image: "/placeholder.svg",
    onSale: true
  },
  // ... más productos aquí
];

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addItem } = useCart();
  const { toast } = useToast();

  const filteredProducts = searchTerm ? searchProducts(products, searchTerm) : products;

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    toast({
      title: "Producto añadido",
      description: `${product.name} se ha añadido al carrito`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-serif">LUXURY SCENTS</Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/catalog" className="text-foreground/80 hover:text-foreground">Catálogo</Link>
              <Link to="/new-arrivals" className="text-foreground/80 hover:text-foreground">Novedades</Link>
              <Link to="/contact" className="text-foreground/80 hover:text-foreground">Contacto</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-serif">Catálogo de Perfumes</h1>
        
        {/* Search Section */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar por nombre o precio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Puedes buscar por nombre de producto o por precio (ej: "70" mostrará productos cercanos a 70€)
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <CardTitle className="mt-4 font-serif">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    {product.originalPrice ? (
                      <>
                        <span className="text-lg font-bold text-red-600">€{product.price}</span>
                        <span className="text-sm line-through ml-2">€{product.originalPrice}</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold">€{product.price}</span>
                    )}
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Agregar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
