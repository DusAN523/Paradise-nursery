import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Landing from './pages/Landing';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
