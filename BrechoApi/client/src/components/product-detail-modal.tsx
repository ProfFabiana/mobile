import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: string) => void;
}

export function ProductDetailModal({ product, isOpen, onClose, onAddToCart }: ProductDetailModalProps) {
  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle data-testid="text-product-detail-title">Detalhes do Produto</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
            data-testid="img-product-detail"
          />
          
          <div>
            <h4 
              className="text-xl font-bold text-text-primary"
              data-testid="text-product-detail-name"
            >
              {product.name}
            </h4>
            <p 
              className="text-secondary text-2xl font-bold"
              data-testid="text-product-detail-price"
            >
              R$ {product.price}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge 
              className="bg-success text-white"
              data-testid="badge-product-condition"
            >
              {product.condition}
            </Badge>
            <span 
              className="text-text-muted text-sm"
              data-testid="text-product-size"
            >
              Tamanho: {product.size}
            </span>
          </div>
          
          <div>
            <h5 className="font-semibold mb-2">Descrição</h5>
            <p 
              className="text-text-muted text-sm"
              data-testid="text-product-description"
            >
              {product.description}
            </p>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button 
              variant="outline"
              className="flex-1"
              data-testid="button-add-to-favorites"
            >
              <Heart className="w-4 h-4 mr-2" />
              Favoritar
            </Button>
            <Button 
              className="flex-1 bg-primary text-white hover:bg-primary/90"
              onClick={handleAddToCart}
              data-testid="button-add-to-cart-modal"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
