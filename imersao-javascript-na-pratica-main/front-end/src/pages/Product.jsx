import React, { useEffect, useState, useContext } from "react";
import Prices from "../components/Prices";
import Full from "../components/Full";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../App";

const Product = () => {
  const { id } = useParams();
  const { setCartOpen, cartItems, setCartItems, adicionarProduto } =
    useContext(CartContext);

  const [produto, setProduto] = useState(null);
  const [buscouProduto, setBuscouProduto] = useState(false);
  const [indexImgSelecionada, setIndexImgSelecionada] = useState(0);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    const getAxios = async () => {
      try {
        const { data } = await axios.get(`/produtos/${id}`);

        setProduto(data);
      } catch (error) {
        console.error({ error });
      }

      setBuscouProduto(true);
    };

    getAxios();
  }, [id]);

  if (buscouProduto && !produto) return <Navigate to="/" />;

  if (!buscouProduto && !produto) return <></>;

  const imagens = JSON.parse(produto.imagens);
  const caracteristicas = JSON.parse(produto.caracteristicas);

  return (
    <div className="main">
      <div className="product__container">
        <div className="product__img-container">
          <div className="product__lista-imgs">
            {/* product__img--selecionada */}
            {imagens.map((imagem, index) => (
              <div
                className={
                  "product__img--pequena" +
                  (index === indexImgSelecionada
                    ? " product__img--selecionada"
                    : "")
                }
                key={index}
                onClick={() => setIndexImgSelecionada(index)}
              >
                <img
                  className="product__img "
                  src={imagem}
                  alt="Imagem pequena"
                />
              </div>
            ))}
          </div>

          <div className="product__div-img">
            <img
              className="product__img"
              src={imagens[indexImgSelecionada]}
              alt="Imagem destacada"
            />
          </div>
        </div>

        <div className="product__infos">
          <p className="product__titulo">{produto.titulo}</p>

          <Prices
            preco={produto.preco}
            precoDesconto={produto.precoDesconto}
            precoParcelado={produto.precoParcelado}
          ></Prices>

          <div className="product__caracteristics">
            <p className="product__oque">
              O que você precisa saber sobre este produto
            </p>

            <ul className="product__list">
              {caracteristicas.map((caracteristica, index) => (
                <li key={index}>{caracteristica}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="product__cta">
          <p className="product__frete">Chegará grátis amanhã</p>

          <div className="product__estoque">
            <p>Estoque disponível</p>

            <div className="product__full">
              <p>Armazenado e enviado pelo</p>
              <Full />
            </div>
          </div>

          <div className="product__quantidades">
            <div className="product__quantidade">
              <p>Quantidade:</p>

              <select
                name=""
                id=""
                onChange={(e) => setQuantidade(Number(e.target.value))}
              >
                <option value="1">1 unidade</option>
                <option value="2">2 unidades</option>
                <option value="3">3 unidades</option>
                <option value="4">4 unidades</option>
                <option value="5">5 unidades</option>
              </select>

              <p className="product__disponiveis">
                ({produto.estoque} disponíveis)
              </p>
            </div>
          </div>

          <button
            className="product__button"
            onClick={() => adicionarProduto(produto, quantidade)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
