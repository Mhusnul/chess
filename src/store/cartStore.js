import { create } from "zustand";
import { persist } from "zustand/middleware";

// Cart store menggunakan Zustand dengan persisten storage
const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      isCartOpen: false,

      // Actions
      addToCart: (book) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === book.id);

        if (existingItem) {
          // Jika item sudah ada, tambah quantity
          set({
            items: currentItems.map((item) =>
              item.id === book.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // Jika item baru, tambah ke cart
          set({
            items: [...currentItems, { ...book, quantity: 1 }],
          });
        }
      },

      removeFromCart: (bookId) => {
        set({
          items: get().items.filter((item) => item.id !== bookId),
        });
      },

      updateQuantity: (bookId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(bookId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === bookId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set({ isCartOpen: !get().isCartOpen });
      },

      closeCart: () => {
        set({ isCartOpen: false });
      },

      openCart: () => {
        set({ isCartOpen: true });
      },

      // Computed values
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemQuantity: (bookId) => {
        const item = get().items.find((item) => item.id === bookId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "chess-cart-storage", // nama key di localStorage
      partialize: (state) => ({ items: state.items }), // hanya simpan items di localStorage
    }
  )
);

export default useCartStore;
