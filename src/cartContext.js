import React, { useReducer, useEffect, useContext } from "react";
import cartReduce from "./cartReduce";

const CartContext = React.createContext(null);

let initialCart = [];
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart cannot be parsed into json");
  initialCart = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReduce, initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartContextValue = {
    cart,
    dispatch,
  };
  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("ERROR: Context is called outside of its provider");
  }
  return context;
}
