import React from "react";

const Prices = ({ preco, precoDesconto, precoParcelado }) => {
  let percentualDesconto =
    Math.floor(100 - (precoDesconto / preco) * 100) + "% OFF";

  return (
    <div className="card__precos">
      <p className="card__preco-riscado">R$ {preco.toLocaleString("pt-BR")}</p>

      <div className="card__precos-desconto">
        <p className="card__preco-desconto">
          R$ {precoDesconto.toLocaleString("pt-BR")}
        </p>
        <p className="card__percentual">{percentualDesconto}</p>
      </div>

      <p>
        em{" "}
        <span className="card__parcelamento">
          12x R$ {precoParcelado.toLocaleString("pt-BR")} sem juros
        </span>
      </p>
    </div>
  );
};

export default Prices;
