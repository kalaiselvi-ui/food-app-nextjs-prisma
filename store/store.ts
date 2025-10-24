import { create } from "zustand";

export interface cartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: string | null;
  imageUrl?: string | null;
  quantity: number;
}
export interface CartStore {
  cart: cartItem[];
  addToCart: (item: Omit<cartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
}

export const useStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (newItem) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cart: [...state.cart, { ...newItem, quantity: 1 }],
      };
    }),
  removeFromCart: (id: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  incrementQuantity: (id: string) =>
    set((state) => {
      return {
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }),
  decrementQuantity: (id: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));
