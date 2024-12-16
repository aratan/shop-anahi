import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  onSale?: boolean;
}

const Catalog = () => {
  const { addItem } = useCart();

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
      quantity: 1  // Add this line to fix the type error
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
  );
};

export default Catalog;
