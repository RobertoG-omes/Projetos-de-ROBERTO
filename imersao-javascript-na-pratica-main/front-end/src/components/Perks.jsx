import React from "react";
import Perk from "./Perk";

const Perks = () => {
  return (
    <div className="perks">
      <Perk
        img={
          "https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/payment.svg"
        }
        title={"Escolha como pagar"}
        text={
          "Com Mercado Pago, você paga com cartão, boleto ou Pix. Você também pode pagar em até 12x sem cartão com a Linha de Crédito."
        }
      ></Perk>

      <div className="perks__bar"></div>

      <Perk
        img={
          "https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/shipping.svg"
        }
        title={"Frete grátis a partir de R$ 19"}
        text={
          "Ao se cadastrar no Mercado Livre, você tem frete grátis em milhares de produtos."
        }
      ></Perk>

      <div className="perks__bar"></div>

      <Perk
        img={
          "https://http2.mlstatic.com/storage/homes-korriban/assets/images/ecosystem/protected.svg"
        }
        title={"Segurança, do início ao fim"}
        text={
          "Você não gostou do que comprou? Devolva! No Mercado Livre não há nada que você não possa fazer, porque você está sempre protegido."
        }
      ></Perk>
    </div>
  );
};

export default Perks;
