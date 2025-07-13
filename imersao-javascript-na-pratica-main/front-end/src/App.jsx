import React, { createContext, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import axios from "axios";
import Cart from "./components/Cart";

axios.defaults.baseURL = "http://localhost:3000/api";

export const CartContext = createContext(null);

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  const adicionarProduto = (produto, quantidade) => {
    const quantidadeAntiga =
      cartItems.find((item) => item.produto.id === produto.id)?.quantidade ?? 0;

    const novoCartItems = [
      ...cartItems.filter((item) => item.produto.id !== produto.id),
      { produto, quantidade: quantidade + quantidadeAntiga },
    ];

    atualizarCarrinho(novoCartItems);
  };

  const removerProduto = (produto, quantidade) => {
    const quantidadeAntiga =
      cartItems.find((item) => item.produto.id === produto.id)?.quantidade ?? 0;
    const novaQtd = quantidadeAntiga - quantidade;

    const novoCartItems = [
      ...cartItems.filter((item) => item.produto.id !== produto.id),
    ];

    novaQtd > 0 ? novoCartItems.push({ produto, quantidade: novaQtd }) : "";

    atualizarCarrinho(novoCartItems);
  };

  const atualizarCarrinho = (novoCartItems) => {
    let valorTotalTemp = 0;

    novoCartItems.forEach((cartItem) => {
      valorTotalTemp += cartItem.produto.precoDesconto * cartItem.quantidade;
    });

    setCartOpen(true);
    setCartItems(novoCartItems);
    setValorTotal(valorTotalTemp);
  };

  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartOpen,
          setCartOpen,
          cartItems,
          setCartItems,
          adicionarProduto,
          removerProduto,
          valorTotal,
          setValorTotal,
        }}
      >
        {cartOpen && <Cart />}

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>

        <Footer />
      </CartContext.Provider>
    </BrowserRouter>
  );
};

export default App;
