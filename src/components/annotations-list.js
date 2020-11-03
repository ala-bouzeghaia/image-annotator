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
            [<b>Left:</b> {bb.left}, <b>Top:</b> {bb.top} , <b>Width:</b>{" "}
            {bb.width}, <b>Height:</b> {bb.height}]
          </p>
        );
      })}
    </div>
  );
};

export default AnnotationsList;
