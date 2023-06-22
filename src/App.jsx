import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Details from "./Details";
import Cart from "./Cart";

export default function App() {
  const [cart, setCart] = useState([]);

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
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
