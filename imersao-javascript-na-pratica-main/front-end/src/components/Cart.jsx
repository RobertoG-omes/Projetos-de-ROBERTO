import React from "react";
import { useContext } from "react";
import { CartContext } from "../App";
import axios from "axios";

const Cart = () => {
  const {
    setCartOpen,
    cartOpen,
    cartItems,
    setCartItems,
    valorTotal,
    removerProduto,
    adicionarProduto,
    setValorTotal,
  } = useContext(CartContext);

  const fecharPedido = async () => {
    try {
      const { data } = await axios.post("/pedidos", {
        cartItems,
        valorTotal,
      });

      console.log(data);

      window.alert("Pedido enviado com sucesso!");

      setCartOpen(false);
      setCartItems([]);
      setValorTotal(0);
    } catch (error) {
      console.error({ error, message: "Deu erro ao enviar o pedido" });
    }
  };

  return (
    <div className="cart">
      <div className="cart__header">
        <p className="cart__titulo">Carrinho</p>
        <p className="cart__fechar" onClick={() => setCartOpen(!cartOpen)}>
          X
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart__vazio">
          <p>Seu carrinho está vazio.</p>
        </div>
      ) : (
        <>
          <div className="cart__produtos">
            {cartItems.map(({ produto, quantidade }, index) => (
              <div className="cart__produto" key={index}>
                <div className="cart__img-titulo">
                  <div className="cart__img">
                    <img
                      src={JSON.parse(produto.imagens)[0]}
                      alt="Imagem do produto"
                    />
                  </div>

                  <p>{produto.titulo}</p>
                </div>

                <div className="cart__qtd-preco">
                  <div className="cart__quantidade">
                    <svg
                      onClick={() => removerProduto(produto, 1)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="cart__icone-qtd"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14"
                      />
                    </svg>

                    <p>{quantidade}</p>

                    {quantidade < produto.estoque ? (
                      <svg
                        onClick={() => adicionarProduto(produto, 1)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="cart__icone-qtd"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    ) : (
                      <></>
                    )}
                  </div>

                  <p className="cart__preco">
                    R${" "}
                    {(produto.precoDesconto * quantidade).toLocaleString(
                      "pt-BR"
                    )}
                  </p>

                  <svg
                    onClick={() => removerProduto(produto, quantidade)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="cart__excluir"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="cart__precos">
            <p className="cart__total">
              <b> Valor total:</b> R$ {valorTotal.toLocaleString("pt-BR")}
            </p>

            <button className="button" onClick={() => fecharPedido()}>
              Fechar pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
