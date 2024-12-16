export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  onSale?: boolean;
  isNew?: boolean;
}

export const searchProducts = (products: Product[], searchTerm: string): Product[] => {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  const searchPrice = parseFloat(normalizedSearch);

  return products.filter((product) => {
    // Search by name
    const nameMatch = product.name.toLowerCase().includes(normalizedSearch);
    
    // Search by price (exact or range)
    const priceMatch = !isNaN(searchPrice) && (
      product.price === searchPrice || 
      (product.price <= searchPrice + 5 && product.price >= searchPrice - 5)
    );

    return nameMatch || priceMatch;
  });
};