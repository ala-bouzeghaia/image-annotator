import React, { useState, useContext } from "react";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { BboxesContext } from "./bboxesContext";

const EditObjectName = () => {
  const [objectname, setObjectname] = useState("");
  const { boxes, objectNames } = useContext(BboxesContext);
  const [objects, setObjects] = objectNames;

  const onChangeObjectname = (e) => {
    setObjectname(e.target.value);
  };

  /* const RenderObj = () => {
    return objects.map((obj) => {
      return (
        <div className="radio">
          <input
            type="radio"
            name="optionsRadios"
            id="optionsRadios1"
            checked
          />
          <label className="label_radio" for="optionsRadios1">
            {" "}
            {obj}{" "}
          </label>
          <br />
        </div>
      );
    });
  }; */

  const onSubmit = (e) => {
    e.preventDefault();
    setObjects([...objects, objectname]);
    setObjectname("");
  };
  //console.log("OBJECTS", objects);
  return (
    <div id="object_types" style={{ width: "100%" }}>
      <h5>Objects:</h5>
      <input
        type="text"
        required
        placeholder="Add object name"
        size="8"
        className="text_input"
        value={objectname}
        onChange={onChangeObjectname}
      />
      <button
        /* type="submit" */
        /* content="+" */
        className="btn btn-primary"
        style={{
          height: "30px",
          width: "2.5vw",
          position: "absolute",
        }}
        onClick={onSubmit}
      >
        <Icon
          path={mdiPlus}
          style={{
            height: "30px",
            width: "2.5vw",
            marginLeft: "-12",
            marginTop: "-12",
          }}
        />
      </button>

      <br />
      {objects.map((obj) => {
        return (
          <div className="radio">
            <input type="radio" name="optionsRadios" id={obj} />
            <label className="label_radio" for={obj} id="object_name">
              {" "}
              {obj}{" "}
            </label>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default EditObjectName;
