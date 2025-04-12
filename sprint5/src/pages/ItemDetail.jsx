import React from "react";
import { useContext } from "react";

import { useItem } from "../context/ItemContext";

const ItemDetail = () => {
  const { getItem, heroesfav, setHeroesfav } = useItem();
  // const {id} = useParams()

  console.log("heroesfav", heroesfav);

  return (
    <>
      <div>ItemDetail</div>
      <button onClick={()=> getItem()}> BOTONAPI</button>
      <div>
        {heroesfav.map((item) => (
          <div key={item.id}>
            <h1>{item.nombreSuperHeroe}</h1>
            <h2>{item.nombreReal}</h2>
            <h3>{item.edad}</h3>
            <h4>{item.planetaOrigen}</h4>
            <h5>{item.debilidad}</h5>
            <h6>{item.poderes}</h6>
            <p>{item.aliados}</p>
            <p>{item.enemigos}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ItemDetail;
