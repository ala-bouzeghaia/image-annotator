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
            [<b>Left:</b>{" "}
            {parseInt(bb.left) -
              parseInt(document.getElementById("image").offsetLeft)}
            , <b>Top:</b>{" "}
            {parseInt(bb.top) -
              parseInt(document.getElementById("image").offsetTop)}{" "}
            , <b>Width:</b> {parseInt(bb.width)}, <b>Height:</b>{" "}
            {parseInt(bb.height)}]
          </p>
        );
      })}
    </div>
  );
};

export default AnnotationsList;
