import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageSquare, Menu, Search, User, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from 'react-router-dom';

const Contact = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b sticky top-0 bg-background z-50">
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
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
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

      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center">Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>+34 900 123 456</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>info@perfumes.com</span>
                </div>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Nombre" />
                  <Input placeholder="Email" type="email" />
                </div>
                <Input placeholder="Asunto" />
                <Textarea placeholder="Mensaje" className="min-h-[150px]" />
                <Button className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;