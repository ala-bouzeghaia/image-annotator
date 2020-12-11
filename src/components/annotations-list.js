import React, { useContext } from "react";
import { BboxesContext } from "./bboxesContext";

const AnnotationsList = () => {
  // eslint-disable-next-line
  const { boxes, objectNames } = useContext(BboxesContext);
  // eslint-disable-next-line
  const [bboxes, setBboxes] = boxes;

  const handleClearOneBox = (box) => {
    setBboxes(
      bboxes.filter((bbox) => bbox !== box),
      (box) => {
        document.getElementById(
          `close-button-${bboxes.indexOf(box)}`
        ).style.display = "none";
      }
    );
  };

  return (
    <div id="annotated_box">
      <h5>Annotations: </h5>
      {bboxes.map((bb) => {
        return (
          <p
            className="annotation-item"
            id={`annotation-item-${bboxes.indexOf(bb)}`}
          >
            <button
              className="annotation-close-button"
              id={`annotation-close-button-${bboxes.indexOf(bb)}`}
              style={{
                position: "relative",
                top:
                  "-10px" /* `${document.getElementById(`annotation-item-${bboxes.indexOf(bb)}`). -10}px` */,
                right: "-95%",
                /* width: "16px",
                height: "16px", */
              }}
              onClick={() => {
                handleClearOneBox(bb);
              }}
            ></button>
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
