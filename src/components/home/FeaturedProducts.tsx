import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

export const FeaturedProducts = () => {
  const { addItem } = useCart();

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
  );
};