import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const newProducts = [
  {
    id: 1,
    name: "BADEE HONOR Y GLORIA- Unisex",
    price: 40.17,
    originalPrice: 67.64,
    image: "/placeholder.svg",
    isNew: true
  },
  // ... más productos nuevos aquí
];

const NewArrivals = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Novedades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
                {product.isNew && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    Nuevo
                  </span>
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
                <Button className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
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

export default NewArrivals;