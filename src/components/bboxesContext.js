import React, { useState, createContext } from "react";

export const BboxesContext = createContext();

export const BboxesProvider = (props) => {
  const [bboxes, setBboxes] = useState([]);
  return (
    <BboxesContext.Provider value={[bboxes, setBboxes]}>
      {props.children}
    </BboxesContext.Provider>
  );
};
