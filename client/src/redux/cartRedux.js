import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    isFetching: false,
    error: false
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    clearCart(state) {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },

    // CREATE CART
    createCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createCartSuccess: (state, action) => {
      state.isFetching = false;
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    createCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // DELETE CART
    deleteCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCartSuccess: (state) => {
      state.isFetching = false;
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    deleteCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  },
});

export const { addProduct, clearCart, createCartStart, createCartSuccess, createCartFailure, deleteCartStart, deleteCartSuccess, deleteCartFailure } = cartSlice.actions;
export default cartSlice.reducer;
