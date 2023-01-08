import React, { useState, createContext } from "react";
export const LayoutContext = createContext<{
  isOpen: boolean;
  setIsOpen: Function;
}>({
  isOpen: true,
  setIsOpen: () => { },
});

const LayoutContextComponent = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <LayoutContext.Provider value={{ isOpen, setIsOpen }}>
      {props.children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextComponent;
