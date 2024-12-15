import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, CreditCard, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = [
    {
      id: 1,
      name: "SET 9 AM POUR FEMME",
      price: 72.60,
      quantity: 1,
    },
    // ... más items del carrito
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Carrito de Compra
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>€{item.price.toFixed(2)}</TableCell>
                  <TableCell>€{(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold">
            Total: €{total.toFixed(2)}
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/payment/paypal')} className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Pagar con PayPal
            </Button>
            <Button onClick={() => navigate('/payment/crypto')} variant="outline" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Pagar con Crypto
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cart;