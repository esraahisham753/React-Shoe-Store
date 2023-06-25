import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Details from "./Details";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error("The cart cannot be parsed into json");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        return items.map((i) => {
          return i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i;
        });
      } else {
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        if (quantity === 0) {
          return items.filter((i) => i.sku !== sku);
        } else {
          return items.map((i) => {
            return i.sku === sku ? { ...i, quantity: quantity } : i;
          });
        }
      } else {
        return items;
      }
    });
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Details addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} emptyCart={emptyCart} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
