import React, { useState, useEffect, useRef, useContext } from "react";
import { BboxesContext } from "./bboxesContext";

const DisplayAnnotationsBox = () => {
  const [currentMousePosition, setCurrentMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isDown, setIsDown] = useState(false);
  const { boxes, objectNames } = useContext(BboxesContext);
  const [bboxes, setBboxes] = boxes;
  const refDiv = useRef();
  const bboxRef = useRef();

  const start = (pageX, pageY) => {
    var startX = pageX;
    var startY = pageY;
    return { x: startX, y: startY };
  };

  const onMouseDown = (e) => {
    setIsDown(true);
    setStartPosition(start(e.pageX, e.pageY));
    bboxRef.current.style.border = "2px dotted rgb(255,0,0)";
    bboxRef.current.style.cursor = "crosshair";
    bboxRef.current.style.width = "0px";
    bboxRef.current.style.height = "0px";
  };

  const onMouseMove = (e) => {
    if (isDown) {
      setCurrentMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    }
  };

  const onMouseUp = (e) => {
    setIsDown(false);
    bboxRef.current.style.border = "2px solid rgb(255,0,0)";

    setCurrentMousePosition({
      x: e.pageX,
      y: e.pageY,
    });

    var left = bboxRef.current.style.left;
    var top = bboxRef.current.style.top;
    var width = bboxRef.current.style.width;
    var height = bboxRef.current.style.height;

    if (left !== "" && width !== "0px") {
      setBboxes([
        ...bboxes,
        { left: left, top: top, width: width, height: height },
      ]);
    }
  };

  const handleClear = () => {
    setBboxes([]);
  };

  const handleClearOneBox = (box) => {
    setBboxes(bboxes.filter((bbox) => bbox !== box));
  };

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  const left = Math.min(currentMousePosition.x, startPosition.x);
  const top = Math.min(currentMousePosition.y, startPosition.y);
  const width = Math.abs(currentMousePosition.x - startPosition.x);
  const height = Math.abs(currentMousePosition.y - startPosition.y);

  return (
    <div>
      <div
        ref={refDiv}
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "./cat-dog.jpg"}
          alt=""
          id="image"
          style={{ height: "100%", width: "100%" }}
        />

        <div
          ref={bboxRef}
          style={
            document.getElementById("image") == null
              ? {}
              : left > document.getElementById("image").offsetLeft &&
                left < document.getElementById("image").offsetWidth &&
                top < document.getElementById("image").offsetHeight + 10
              ? {
                  left: `${left}px`,
                  top: `${top}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                  position: "absolute",
                }
              : {}
          }
        ></div>

        {bboxes.map((bb) => {
          return (
            <div>
              <div
                style={{
                  left: `${bb.left}`,
                  top: `${bb.top}`,
                  width: `${bb.width}`,
                  height: `${bb.height}`,
                  position: "absolute",
                  border: "2px solid rgb(255,0,0)",
                }}
              ></div>
              <button
                className="close-button"
                style={{
                  top: `${parseInt(bb.top, 10) - 8}px`,
                  left: `${
                    parseInt(bb.left, 10) + parseInt(bb.width, 10) - 8
                  }px`,
                  width: "16px",
                  height: "0px",
                }}
                onClick={() => {
                  handleClearOneBox(bb);
                }}
              />
            </div>
          );
        })}
      </div>

      <div id="annotator_buttons_left">
        <input className="btn btn-danger" value="Reset" onClick={handleClear} />
      </div>

      <div id="annotator_buttons_right">
        <input className="btn btn-primary" value="Submit" />
      </div>
    </div>
  );
};

export default DisplayAnnotationsBox;
