import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onProductClick, onAddToCart }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <Card 
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden cursor-pointer"
      onClick={() => onProductClick(product)}
      data-testid={`card-product-${product.id}`}
    >
      <img 
        src={product.imageUrl} 
        alt={product.name}
        className="w-full h-32 object-cover"
        data-testid={`img-product-${product.id}`}
      />
      <div className="p-3">
        <h4 
          className="font-medium text-sm text-text-primary truncate"
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h4>
        <p 
          className="text-xs text-text-muted mt-1"
          data-testid={`text-product-condition-${product.id}`}
        >
          {product.condition}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span 
            className="text-primary font-bold text-lg"
            data-testid={`text-product-price-${product.id}`}
          >
            R$ {product.price}
          </span>
          <Button
            size="sm"
            className="bg-primary text-white px-2 py-1 rounded text-xs hover:bg-primary/90"
            onClick={handleAddToCart}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
