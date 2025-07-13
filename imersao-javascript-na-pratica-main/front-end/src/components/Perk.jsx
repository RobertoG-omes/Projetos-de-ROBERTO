import React from "react";

const Perk = ({ title, img, text }) => {
  return (
    <div className="perk">
      <div className="perk__img">
        <img src={img} alt="Imagem do diferencial" />
      </div>

      <p className="perk__title">{title}</p>
      <p>{text}</p>
    </div>
  );
};

export default Perk;
