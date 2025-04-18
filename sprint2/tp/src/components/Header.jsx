import React from "react";

const Header = ({ setIsModalOpen }) => {
  const onOpenModal = () => {
    // console.log('onOpenModal')
    setIsModalOpen(true);
  };
  return (
    <header className="bg-blue-900/40 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">¡Hola mundo!</h1>
        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={onOpenModal}
        >
          ver watchlist
        </button>
      </div>
    </header>
  );
};

export default Header;
