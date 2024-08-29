"use client";
import React, { useState } from "react";
import { createContext, useContext } from "react";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const value = {
    cart,
    setCart,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCard = () => {
  return useContext(CardContext);
};
