import React, { createContext, useState } from 'react';

// Create Context
export const CurrencyPairContext = createContext();

export const CurrencyPairProvider = ({ children }) => {
  const [currencyPairs, setCurrencyPairs] = useState([]);

  // The values that we want to expose to other components
  const contextValue = {
    currencyPairs,
    setCurrencyPairs,
  };

  // Wrap children components with Context Provider, passing context values as prop
  return (
    <CurrencyPairContext.Provider value={contextValue}>
      {children}
    </CurrencyPairContext.Provider>
  );
};
