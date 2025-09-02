import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ShoppingCart, Leaf, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import { ProductDetailModal } from "@/components/product-detail-modal";
import { CartModal } from "@/components/cart-modal";
import { CategoryFilter } from "@/components/category-filter";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  
  const { addToCart, cartCount } = useCart();
  const { toast } = useToast();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["/api/products", selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory !== "todos") {
        params.append("category", selectedCategory);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json() as Promise<Product[]>;
    },
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (productId: string) => {
    addToCart({ productId }, {
      onSuccess: () => {
        toast({
          title: "Produto adicionado ao carrinho!",
          description: "Continue navegando para encontrar mais peças únicas.",
        });
      },
      onError: () => {
        toast({
          title: "Erro ao adicionar produto",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Leaf className="text-primary text-xl h-6 w-6" />
            <h1 className="text-lg font-bold text-primary">Brechó Online</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              data-testid="button-search"
            >
              <Search className="text-text-muted h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setIsCartModalOpen(true)}
              data-testid="button-cart"
            >
              <ShoppingCart className="text-text-muted h-5 w-5" />
              {cartCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  data-testid="text-cart-count"
                >
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="bg-white px-4 py-3 border-b" data-testid="search-bar">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar roupas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              data-testid="input-search"
            />
          </div>
        </div>
      )}

      {/* Category Filter */}
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="px-4 pb-20">
        {/* Featured Banner */}
        <div className="my-4 relative rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=200" 
            alt="Vintage clothing store" 
            className="w-full h-32 object-cover"
            data-testid="img-banner"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-lg font-bold">Moda Sustentável</h2>
              <p className="text-sm">Encontre peças únicas para o seu estilo</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Produtos em Destaque</h3>
            <Button variant="ghost" className="text-primary text-sm font-medium">
              Ver todos
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-text-muted">Carregando produtos...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-muted">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3" data-testid="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sustainability Message */}
        <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <Recycle className="text-success text-xl h-6 w-6" />
            <div>
              <h4 className="font-semibold text-success">Compra Sustentável</h4>
              <p className="text-sm text-green-700">
                Cada peça comprada ajuda a reduzir o desperdício têxtil e protege o meio ambiente.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </div>
  );
}
