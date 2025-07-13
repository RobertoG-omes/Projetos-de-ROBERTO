import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const getAxios = async () => {
      try {
        const { data } = await axios.get(`/produtos`);

        setProdutos(data);
      } catch (error) {
        console.error({ error });
      }
    };

    getAxios();
  }, []);

  return (
    <div className="main">
      <div className="container">
        <h2>Todos os produtos</h2>

        <div className="cards">
          {produtos.map((produto, index) => (
            <Card {...produto} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
