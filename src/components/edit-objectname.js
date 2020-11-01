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
        placeholder="Add object name"
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
        /* style={{ marginTop: "-4px", marginLeft: "2px" }} */
      />
      <br />
      {RenderObj()}
    </div>
  );
};

export default EditObjectName;
