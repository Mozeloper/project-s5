import React, { createContext, useContext, useState } from "react";

export const ModalToggleContext = createContext();

export function useModalToggle() {
  return useContext(ModalToggleContext)
}

 export default function ModalToggleContextProvider(props) {
  const [isOpen, setIsOpen] = useState(false)
  
  const value = {
    isOpen, 
    setIsOpen
  }

  return (
    <ModalToggleContext.Provider value={value}>
      {props.children}
    </ModalToggleContext.Provider>
  );
}