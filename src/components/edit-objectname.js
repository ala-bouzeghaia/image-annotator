import React, { useState, useContext } from "react";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { BboxesContext } from "./bboxesContext";

const EditObjectName = () => {
  const [objectname, setObjectname] = useState("");
  // eslint-disable-next-line
  const { boxes, objectNames } = useContext(BboxesContext);
  const [objects, setObjects] = objectNames;

  const onChangeObjectname = (e) => {
    setObjectname(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setObjects([...objects, objectname]);
    setObjectname("");
  };
  console.log("OBJECTS", objects);

  /* const radiosChecked = document.querySelectorAll('input[name="radio"]');
  console.log(radiosChecked);
  const len = bboxes.length - 1;

  for (const radioChecked of radiosChecked) {
    if (radioChecked.checked) {
      const selectedValue = radioChecked.value;
      setBboxes((prev) =>
        prev.fill({ ...prev[len], name: selectedValue }, len, len + 1)
      );
    }
  } */

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
          <div className="radio" key={objects.indexOf(obj)}>
            <label
            /* for={obj} */
            /*className="label_radio"              
              id="object_name"*/
            >
              <input type="radio" name="radio" id={obj} value={obj} />
              {obj}
            </label>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default EditObjectName;
