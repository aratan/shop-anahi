import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const products = [
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
    image: "/placeholder.svg"
  },
  // ... más productos aquí
];

const Catalog = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Catálogo de Perfumes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
              <CardTitle className="mt-4">{product.name}</CardTitle>
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
                <Button className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Agregar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Catalog;