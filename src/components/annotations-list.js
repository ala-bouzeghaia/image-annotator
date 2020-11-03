import React, { useContext } from "react";
import { BboxesContext } from "./bboxesContext";

const AnnotationsList = () => {
  const { boxes, objectNames } = useContext(BboxesContext);
  const [bboxes, setBboxes] = boxes;
  const [objects, setObjects] = objectNames;
  console.log(objects);
  return (
    <div id="annotated_box">
      <h5>Annotations: </h5>
      {bboxes.map((bb) => {
        return (
          <p>
            {objects.map((obj) => {
              return document.getElementById(`${obj}`) === null
                ? ""
                : document.getElementById(`${obj}`).checked
                ? `${obj}`
                : "";
            })}
            [<b>Left:</b> {bb.left}, <b>Top:</b> {bb.top} , <b>Width:</b>{" "}
            {bb.width}, <b>Height:</b> {bb.height}]
          </p>
        );
      })}
    </div>
  );
};

export default AnnotationsList;
