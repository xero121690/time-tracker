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
          <div className="inputContainer">
            <div className="inputContainer2">
              <input
                className="updateInput"
                type="tel"
                placeholder="01"
                name="hours"
              />
              <input
                className="updateInput2"
                type="tel"
                placeholder="00"
                maxLength={2}
              />
            </div>
            <div className="labels">
              <label className="hours" htmlFor="hours">
                Hours
              </label>
              <label className="minutes" htmlFor="minutes">
                Minutes
              </label>
            </div>

            <div className="inputContainer2">
              <input
                className="updateInput"
                type="tel"
                placeholder="01"
                name="hours"
              />
              <input
                className="updateInput2"
                type="tel"
                placeholder="00"
                maxLength={2}
              />
            </div>

            <div className="labels">
              <label className="hours" htmlFor="hours">
                Hours
              </label>
              <label className="minutes" htmlFor="minutes">
                Minutes
              </label>
            </div>

            <div className="inputContainer2">
              <input
                className="updateInput"
                type="tel"
                placeholder="01"
                name="hours"
              />
              <input
                className="updateInput2"
                type="tel"
                placeholder="00"
                maxLength={2}
              />
            </div>

            <div className="labels">
              <label className="hours" htmlFor="hours">
                Hours
              </label>
              <label className="minutes" htmlFor="minutes">
                Minutes
              </label>
            </div>
          </div>

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
