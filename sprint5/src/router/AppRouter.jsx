import React from "react";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return <>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
  </>;
};

export default AppRouter;
