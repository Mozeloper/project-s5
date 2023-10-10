import React, { createContext, useContext, useState } from 'react'

export const ModalToggleContext = createContext();

export function useModalToggle() {
  return useContext(ModalToggleContext);
}

export default function ModalToggleContextProvider(props) {
  const [modalType, setModalType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (type) => {
    setModalType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalType(null);
    setIsOpen(false);
  };

  const value = {
    isOpen,
    modalType,
    openModal,
    closeModal,
  };

  return (
    <ModalToggleContext.Provider value={value}>
      {props.children}
    </ModalToggleContext.Provider>
  );
}
