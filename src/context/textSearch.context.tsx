import React, { createContext, useContext, useState } from "react";

type TextSearchContextType = {
  textSearch: string;
  setTextSearch: (prev: string) => void;
};

export const TextSearchContext = createContext<TextSearchContextType>({
  textSearch: "",
  setTextSearch: function (params: string) {},
});

export function useTextSearchNav() {
  return useContext(TextSearchContext);
}

export interface TextSearchNavContextProps {
  children?: React.ReactNode;
}

export default function TextSearchNavContext(props: TextSearchNavContextProps) {
  const [textSearch, setTextSearch] = useState("");

  const value = {
    textSearch,
    setTextSearch,
  };

  return (
    <TextSearchContext.Provider value={value}>
      {props.children}
    </TextSearchContext.Provider>
  );
}
