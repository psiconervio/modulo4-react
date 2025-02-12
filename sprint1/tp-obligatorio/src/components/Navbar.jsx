import React, { useState } from "react";

function Navbar() {
  return (
    <nav className="w-full bg-gray-900/30 ">
      {/* vista desktop */}
      <div className="flex- justify-center items-center px-6">
        <div className="flex items-center gap-2 ">
          <img src="https://via.placeholder.com/150" alt="" />
        </div>
      </div>
      {/* navigation div */}
      <div>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>

      {/* vista mobile */}
      <div>
        <a href="#">☰</a>
      </div>
    </nav>
  );
}

export default Navbar;
