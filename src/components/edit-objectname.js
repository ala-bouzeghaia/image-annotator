import React, { useState } from "react";

const EditObjectName = () => {
  const [objectname, setObjectname] = useState("");
  const [objects, setObjects] = useState([]);

  const onChangeObjectname = (e) => {
    setObjectname(e.target.value);
  };

  const RenderObj = () => {
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
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setObjects([...objects, objectname]);

    setObjectname("");
  };

  return (
    <div id="object_types" style={{ width: "100%" }}>
      <h5>Objects:</h5>
      <input
        type="text"
        required
        placeholder="Type the name of the object to detect"
        size="8"
        className="text_input"
        value={objectname}
        onChange={onChangeObjectname}
      />
      <input
        type="submit"
        value="+"
        className="btn btn-primary"
        onClick={onSubmit}
        /* style={{ position: "right" }} */
      />
      <br />
      {RenderObj()}
    </div>
  );
};

export default EditObjectName;
