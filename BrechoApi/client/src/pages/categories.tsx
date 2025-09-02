import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import { ProductDetailModal } from "@/components/product-detail-modal";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

const categories = [
  { key: "camisetas", label: "Camisetas", icon: "👕" },
  { key: "calças", label: "Calças", icon: "👖" },
  { key: "vestidos", label: "Vestidos", icon: "👗" },
  { key: "jaquetas", label: "Jaquetas", icon: "🧥" },
];

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["/api/products", selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return [];
      
      const params = new URLSearchParams();
      params.append("category", selectedCategory);
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json() as Promise<Product[]>;
    },
    enabled: !!selectedCategory,
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
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Categorias</h1>
        
        {!selectedCategory ? (
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className="p-6 bg-white rounded-lg border border-gray-200 hover:border-primary transition-colors text-center"
                data-testid={`button-category-${category.key}`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-text-primary">{category.label}</h3>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {categories.find(c => c.key === selectedCategory)?.label}
              </h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary font-medium"
                data-testid="button-back-to-categories"
              >
                ← Voltar
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-text-muted">Carregando produtos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-muted">Nenhum produto encontrado nesta categoria</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
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
        )}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
