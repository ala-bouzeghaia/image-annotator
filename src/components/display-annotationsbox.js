import React, { useState, useEffect, useRef } from "react";

const DisplayAnnotationsBox = () => {
  const [currentMousePosition, setCurrentMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isDown, setIsDown] = useState(false);
  const [bboxes, setBboxes] = useState([]);
  const refDiv = useRef();
  const bboxRef = useRef();

  /* const changeWidth = () => {
        bboxRef.current.style.width = "400px";
        bboxRef.current.style.cursor = "crosshair";
    }; */

  /* const init_bbox = () => {
        bboxRef.current.style.left = ;
        bboxRef.current.style.top = ;
        
    }; */

  /* const crop = (pageX, pageY) => {
        return {
            x: pageX - refDiv.current.getBoundingClientRect().left,
            y: pageY - refDiv.current.getBoundingClientRect().top
        }
    };

    const start = (pageX, pageY) => {
        this.pointer = crop(pageX, pageY);
        this.offset = this.pointer;
    };

    const rectangle = () => {
        var rect, x1, x2, y1, y2;
        x1 = Math.min(this.offset.x, this.pointer.x);
        y1 = Math.min(this.offset.y, this.pointer.y);
        x2 = Math.max(this.offset.x, this.pointer.x);
        y2 = Math.max(this.offset.y, this.pointer.y);
        return rect = {
            left: x1,
            top: y1,
            width: x2 - x1 + 1,
            height: y2 - y1 + 1
        };
    }; */

  const start = (pageX, pageY) => {
    var startX = pageX; /*-
       (refDiv.current.getBoundingClientRect().right -
        refDiv.current.getBoundingClientRect().left) /
        3 */
    var startY = pageY; /*-
       (refDiv.current.getBoundingClientRect().bottom -
        refDiv.current.getBoundingClientRect().top) /
        3 */

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

  console.log("is down?", isDown);

  const onMouseMove = (e) => {
    /* const offsetX =
      (refDiv.current.getBoundingClientRect().right -
        refDiv.current.getBoundingClientRect().left) /
      3;
    const offsetY =
      (refDiv.current.getBoundingClientRect().bottom -
        refDiv.current.getBoundingClientRect().top) /
      3; */
    if (isDown) {
      setCurrentMousePosition({
        x: e.pageX /* - offsetX */,
        y: e.pageY /* - offsetY */,
      });
      /* bboxRef.current.style.left = startPosition.x;
            bboxRef.current.style.top = startPosition.y;
            bboxRef.current.style.width = Math.abs(currentMousePosition.x - startPosition.x);
            bboxRef.current.style.height = Math.abs(currentMousePosition.y - startPosition.y); 
            const left = startPosition.x;
            const top = startPosition.y;
            const width = Math.abs(currentMousePosition.x - startPosition.x);
            const height = Math.abs(currentMousePosition.y - startPosition.y);
            bbox(left, top, width, height);*/
    }
  };

  const onMouseUp = (e) => {
    /* bboxRef.current.style.width = currentMousePosition.x - bboxRef.current.style.left;
        bboxRef.current.style.height = currentMousePosition.y - bboxRef.current.style.top;
        console.log("width", bboxRef.current.style.width); */
    //setRect(finish);
    setIsDown(false);
    bboxRef.current.style.border = "2px solid rgb(255,0,0)";
    console.log("is up?", isDown);
    setCurrentMousePosition({
      x:
        e.pageX /* -
        (refDiv.current.getBoundingClientRect().right -
          refDiv.current.getBoundingClientRect().left) /
          3 */,
      y:
        e.pageY /* -
        (refDiv.current.getBoundingClientRect().bottom -
          refDiv.current.getBoundingClientRect().top) /
          3 */,
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

  console.log("Mouse position", currentMousePosition);
  console.log("start", startPosition);
  //console.log("BBoxes", bboxes);

  const left = Math.min(currentMousePosition.x, startPosition.x);
  const top = Math.min(currentMousePosition.y, startPosition.y);
  const width = Math.abs(currentMousePosition.x - startPosition.x);
  const height = Math.abs(currentMousePosition.y - startPosition.y);

  /* const bbox = () => {
        const left = Math.min(currentMousePosition.x, startPosition.x);
        const top = Math.min(currentMousePosition.y, startPosition.y);
        const width = Math.abs(currentMousePosition.x - startPosition.x);
        const height = Math.abs(currentMousePosition.y - startPosition.y);
        return (
            <div ref={bboxRef} 
                    style={{ left: `${left}px`,
                            top: `${top}px`, 
                            width: `${width}px`,
                            height: `${height}px`,
                            position: "absolute",}}>

            </div>
        )
        
         
    }; */

  /* const RenderBoxes= () => {
        bboxes.map(bb => {
            return (
                <div  
                        style={{ left: `${bb.left}`,
                                top: `${bb.top}`, 
                                width: `${bb.width}`,
                                height: `${bb.height}`,
                                position: "absolute",
                                border: "2px solid rgb(255,0,0)"}}>
    
                </div>
            )
        })
                            
    }; */
  console.log("bboxes", bboxes);

  return (
    <div>
      {/* <h5>Images to annotate: </h5> */}
      <div ref={refDiv} style={{ marginTop: "10px", marginBottom: "20px" }}>
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
              ? /*&&
                 left + width < document.getElementById("image").offsetWidth && 
                top < document.getElementById("image").offsetHeight + 20 &&
                top > document.getElementById("image").offsetTop*/
                {
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
