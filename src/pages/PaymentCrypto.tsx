import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const PaymentCrypto = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              Pago con Crypto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="mb-4">Total a pagar: €72.60</p>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  Pagar con Bitcoin
                </Button>
                <Button className="w-full" variant="outline">
                  Pagar con Ethereum
                </Button>
                <Button className="w-full" variant="outline">
                  Pagar con USDT
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCrypto;