import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleIncreaseQuantity = (id: string, currentQuantity: number) => {
    updateQuantity({ id, quantity: currentQuantity + 1 });
  };

  const handleDecreaseQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity <= 1) {
      removeFromCart(id);
    } else {
      updateQuantity({ id, quantity: currentQuantity - 1 });
    }
  };

  const handleCheckout = () => {
    // Mock checkout process
    alert("Compra finalizada com sucesso! Obrigado por escolher moda sustentável.");
    clearCart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle data-testid="text-cart-title">Carrinho de Compras</DialogTitle>
        </DialogHeader>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-text-muted" data-testid="text-cart-empty">
              Seu carrinho está vazio
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
                  data-testid={`cart-item-${item.id}`}
                >
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                    data-testid={`img-cart-item-${item.id}`}
                  />
                  <div className="flex-1">
                    <h4 
                      className="font-medium text-sm"
                      data-testid={`text-cart-item-name-${item.id}`}
                    >
                      {item.product.name}
                    </h4>
                    <p 
                      className="text-text-muted text-xs"
                      data-testid={`text-cart-item-size-${item.id}`}
                    >
                      Tamanho: {item.product.size}
                    </p>
                    <p 
                      className="text-primary font-bold"
                      data-testid={`text-cart-item-price-${item.id}`}
                    >
                      R$ {item.product.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-8 h-8 rounded-full p-0"
                      onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                      data-testid={`button-decrease-quantity-${item.id}`}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span 
                      className="font-medium"
                      data-testid={`text-cart-item-quantity-${item.id}`}
                    >
                      {item.quantity}
                    </span>
                    <Button
                      size="sm"
                      className="w-8 h-8 rounded-full bg-primary text-white p-0 hover:bg-primary/90"
                      onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                      data-testid={`button-increase-quantity-${item.id}`}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span 
                  className="text-2xl font-bold text-primary"
                  data-testid="text-cart-total"
                >
                  R$ {cartTotal.toFixed(2)}
                </span>
              </div>
              <Button 
                className="w-full bg-success text-white py-4 rounded-lg font-bold text-lg hover:bg-success/90"
                onClick={handleCheckout}
                data-testid="button-checkout"
              >
                Finalizar Compra
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
