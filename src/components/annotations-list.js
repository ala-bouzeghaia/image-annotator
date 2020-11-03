import React, { useContext } from "react";
import { BboxesContext } from "./bboxesContext";

const AnnotationsList = () => {
  const [bboxes, setBboxes] = useContext(BboxesContext);
  return (
    <div id="annotated_box">
      <h5>Annotations: </h5>
      {bboxes.map((bb) => {
        return (
          <p>
            [Left: {bb.left}, Top: {bb.top} , Width: {bb.width}, Height:{" "}
            {bb.height}]
          </p>
        );
      })}
    </div>
  );
};

export default AnnotationsList;
