import logo from "./logo.svg";
import "./App.css";

import { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ProductsList from "./Pages/ProductsList";
import AddProduct from "./Pages/AddProduct";
import ResponsiveAppBar from "./Pages/AppBar";
import ProductDetails from "./Pages/ProductDetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="Products/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
      <footer>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright - Adir
        </div>
      </footer>
    </div>
  );
}

export default App;
