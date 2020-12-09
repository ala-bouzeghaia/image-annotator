import React, { useContext } from "react";
import { BboxesContext } from "./bboxesContext";

const AnnotationsList = () => {
  const { boxes, objectNames } = useContext(BboxesContext);
  const [bboxes, setBboxes] = boxes;
  const [objects, setObjects] = objectNames;
  //console.log(objects);
  //console.log(bboxes);
  return (
    <div id="annotated_box">
      <h5>Annotations: </h5>
      {bboxes.map((bb) => {
        return (
          <p>
            <b>name: </b>
            {bb.name ? bb.name : ""} <br />
            <b>left: </b>
            {bb.left -
              parseInt(document.getElementById("image").offsetLeft)},{" "}
            <b>top: </b>{" "}
            {bb.top - parseInt(document.getElementById("image").offsetTop)},{" "}
            <b>width: </b> {bb.width}, <b>height: </b> {bb.height}
          </p>
        );
      })}
    </div>
  );
};

export default AnnotationsList;
