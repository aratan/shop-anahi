import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-lg mb-4">About Us</h4>
            <p className="text-sm text-gray-500">
              Luxury fragrances and accessories for the discerning customer.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Shipping Information</li>
              <li>Returns & Exchanges</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <i className="fab fa-facebook"></i>
              </Button>
              <Button variant="ghost" size="icon">
                <i className="fab fa-instagram"></i>
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-4">Newsletter</h4>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md"
              />
              <Button className="w-full mt-2">Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};