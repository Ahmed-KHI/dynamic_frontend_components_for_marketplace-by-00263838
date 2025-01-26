// cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discount: number; // Add discount field
}

const initialState: CartState = {
  items: [],
  discount: 0, // Initialize discount to 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = []; // Clear the cart by setting items to an empty array
      state.discount = 0; // Reset discount when clearing cart
    },
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload; // Set discount value
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, hydrateCart, clearCart, setDiscount } = cartSlice.actions;
export default cartSlice.reducer;
