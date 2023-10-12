import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [time, setTime] = useState({
    seconds: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

  const timeID = location.pathname.split("/")[2];

  const handleChange = (e: InputEvent) => {
    setTime((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: ButtonEvent) => {
    e.preventDefault();
    try {
      console.log("insidehandleClick", time);
      await axios.put("http://127.0.0.1:3000/history/" + timeID, time);
      navigate("/history");
      //navigate back to view dates
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="form">
        <h1 className="updateTimeTitle">Time correction</h1>
        <div className="inputDiv">
          <input
            className="updateInput"
            type="text"
            placeholder="seconds"
            onChange={handleChange}
            name="seconds"
          />
          <button
            className="btn btn-outline-light update"
            onClick={() => navigate("/history")}
          >
            Cancel
          </button>
          <button
            className="btn btn-outline-danger update"
            onClick={handleClick}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default Update;
