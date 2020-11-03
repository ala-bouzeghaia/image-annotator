import React, { useState, createContext } from "react";

export const BboxesContext = createContext();

export const BboxesProvider = (props) => {
  const [bboxes, setBboxes] = useState([]);
  const [objects, setObjects] = useState([]);
  return (
    <BboxesContext.Provider
      value={{ boxes: [bboxes, setBboxes], objectNames: [objects, setObjects] }}
    >
      {props.children}
    </BboxesContext.Provider>
  );
};
