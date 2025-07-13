import React from "react";
import Perks from "./Perks";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Perks></Perks>

        <div className="footer__copyright">
          <p>Copyright © 1999-2025 Ebazar.com.br LTDA.</p>
          <p>
            CNPJ n.º 03.007.331/0001-41 / Av. das Nações Unidas, nº 3.003,
            Bonfim, Osasco/SP - CEP 06233-903 - empresa do grupo Mercado Livre.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
