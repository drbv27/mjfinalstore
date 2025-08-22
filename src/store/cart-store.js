import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  //crear el estado inicial
  items: [],

  //--ACCIONES
  addProduct: (product) => {
    const { items } = get();
    const existingProduct = items.findIndex((item) => item.id === product.id);

    if (existingProduct !== -1) {
      const updatedItems = [...items];
      updatedItems[existingProduct].quantity += 1;
      set({ items: updatedItems });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },
}));
