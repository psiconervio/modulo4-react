import React, { useEffect, useContext } from "react";

const ItemList = () => {
  // const { items, getItem } = useSuper();

  // console.log(items);
  // useEffect(() => {
  //   getItem();
  // }, []);
  return (
    <>
      <div className="mx-4 my-4">
        {/* <h1>ItemList</h1> */}
        {/* <button onClick={() => getItem()}> BOTONAPI</button> */}
        <div>
          <h1 className="text-2xl font-bold text-center">Lista superheroes</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          </div>
        </div>
      </div>
    </>
  );
};

export default ItemList;
