import React from "react";

const ModalMenuOption: React.FC<{
  value: string;
}> = (props) => {
  const { value, children } = props;
  return (
    <option style={{ color: "black" }} value={value}>
      {children}
    </option>
  );
};

export default ModalMenuOption;
