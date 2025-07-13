import React from "react";
import { Link } from "react-router-dom";
import Prices from "./Prices";
import Full from "./Full";

const Card = ({
  id,
  imagens,
  titulo,
  preco,
  precoDesconto,
  precoParcelado,
  full,
  freteGratis,
}) => {
  let percentualDesconto =
    Math.floor(100 - (precoDesconto / preco) * 100) + "% OFF";

  let linkImagens = JSON.parse(imagens);

  return (
    <Link to={`/product/${id}`} className="card">
      <div className="card__img">
        <img src={linkImagens[0]} alt="Imagem do Produto" />
      </div>

      <div className="card__textos">
        <p className="card__titulo">{titulo}</p>

        <Prices
          preco={preco}
          precoDesconto={precoDesconto}
          precoParcelado={precoParcelado}
        ></Prices>

        <div className="card__frete-full">
          {freteGratis ? <p className="card__frete">Frete grátis</p> : <></>}

          {full ? <Full></Full> : <></>}
        </div>
      </div>
    </Link>
  );
};

export default Card;
