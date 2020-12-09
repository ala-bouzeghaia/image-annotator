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
    bboxRef.current.style.opacity = 1;
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
    bboxRef.current.style.opacity = 0;

    setCurrentMousePosition({
      x: e.pageX,
      y: e.pageY,
    });

    /* var left = bboxRef.current.style.left; */
    var left = parseInt(bboxRef.current.style.left);
    /* - document.getElementById("image").offsetLeft; */
    var top = parseInt(bboxRef.current.style.top);
    var width = parseInt(bboxRef.current.style.width);
    var height = parseInt(bboxRef.current.style.height);

    if (
      /* left > document.getElementById("image").offsetLeft &&
      left < document.getElementById("image").offsetWidth &&
      top < document.getElementById("image").offsetHeight + 10 && */
      left !== "" &&
      width > 5
    ) {
      setBboxes([
        ...bboxes,
        {
          left: left,
          top: top,
          width: width /* `${Math.round((parseInt(width) * 100) / window.innerWidth)}%` */,
          height: height,
        },
      ]);
    }
  };

  console.log("BBOXES", bboxes);

  const handleClear = () => {
    setBboxes([]);
  };

  const handleClearOneBox = (box) => {
    setBboxes(bboxes.filter((bbox) => bbox !== box));
    document.getElementById(
      `close-button ${bboxes.indexOf(box)}`
    ).style.display = "none";
  };

  /* const updateDisplay = (event) => {
    var pageX = document.getElementById("x");
    var pageY = document.getElementById("y");
    pageX.innerText = event.offsetX;
    pageY.innerText = event.offsetY;
  }; */

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
  //console.log("BBOXES", bboxes);
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
                  left: `${(bb.left * 100) / window.innerWidth}vw`,
                  top: `${(bb.top * 100) / window.innerHeight}vh`,
                  width: `${(bb.width * 100) / window.innerWidth}vw`,
                  height: `${(bb.height * 100) / window.innerHeight}vh`,
                  position: "absolute",
                  border: "2px solid rgb(255,0,0)",
                }}
                key={bboxes.indexOf(bb)}
              >
                <span style={{ color: "red" }}>
                  {bb.name === undefined ? "" : bb.name}{" "}
                </span>
              </div>
              <button
                className="close-button"
                id={`close-button ${bboxes.indexOf(bb)}`}
                style={{
                  top: `${bb.top - 10}px`,
                  left: `${bb.left + bb.width - 10}px` /*"90%"*/,
                  width: "16px",
                  height: "16px",
                }}
                onClick={() => {
                  handleClearOneBox(bb);
                }}
              ></button>
            </div>
          );
        })}
      </div>

      <div id="annotator_buttons_left">
        <input
          className="btn btn-danger"
          value="Reset"
          onClick={handleClear}
          onChange={() => {}}
        />
      </div>

      <div id="annotator_buttons_right">
        <input className="btn btn-primary" value="Submit" onChange={() => {}} />
      </div>
    </div>
  );
};

export default DisplayAnnotationsBox;
