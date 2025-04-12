import React from "react";
import { useContext } from "react";

import { useItem } from "../context/ItemContext";

const ItemDetail = () => {
  // const { getItem, items } = useItem();
  // const {id} = useParams()

  // console.log("items", items);

  return (
    <>
      <div>ItemDetail</div>
      <button onClick={()=> getItem()}> BOTONAPI</button>
      <div>
        {/* <h1 className="text-2xl font-bold text-center">Detalle del Producto</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
              <img className="h-80" src={`/${item.img}.jpg`} alt="" />
              <div className="text-lg font-semibold">{item.name}</div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default ItemDetail;
