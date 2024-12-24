import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleStripeCheckout = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('stripe-checkout', {
        body: {
          items,
          successUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/cart`,
        },
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al procesar el pago. Por favor, inténtalo de nuevo.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-serif mb-4">Tu carrito está vacío</h2>
        <Button onClick={() => navigate('/')}>Continuar comprando</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-2xl font-serif mb-8">Tu Carrito</h2>
      
      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">€{item.price}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.id)}
              className="text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-serif">Total:</span>
          <span className="text-xl font-bold">€{total.toFixed(2)}</span>
        </div>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button
            className="flex-1 bg-black hover:bg-gray-800"
            onClick={handleStripeCheckout}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Pagar con tarjeta
          </Button>
          <Button
            className="flex-1"
            onClick={() => navigate('/payment/paypal')}
          >
            Pagar con PayPal
          </Button>
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => navigate('/payment/crypto')}
          >
            Pagar con Crypto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;