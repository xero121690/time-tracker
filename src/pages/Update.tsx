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
            <label className="starttime" htmlFor="starttime">
              Start time
            </label>
            <div className="inputContainer2">
              <input
                className="updateInput"
                type="tel"
                placeholder="00"
                name="hours"
                maxLength={2}
              />
              <input
                className="updateInput2"
                type="tel"
                placeholder="00"
                maxLength={2}
              />

              <div
                className="btn-group-vertical btn-group-sm"
                role="group"
                aria-label="Vertical radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="vbtn-radio"
                  id="vbtn-radio1"
                  autoComplete="off"
                  checked
                />
                <label
                  className="btn btn-outline-danger am"
                  htmlFor="vbtn-radio1"
                >
                  AM
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="vbtn-radio"
                  id="vbtn-radio2"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-danger pm"
                  htmlFor="vbtn-radio2"
                >
                  PM
                </label>
              </div>
            </div>
            <div className="labels">
              <label className="hours" htmlFor="hours">
                Hour
              </label>
              <label className="minutes" htmlFor="minutes">
                Minute
              </label>
            </div>

            <label className="endtime" htmlFor="endtime">
              End time
            </label>

            <div className="inputContainer2">
              <input
                className="updateInput"
                type="tel"
                placeholder="00"
                name="hours"
                maxLength={2}
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
                Hour
              </label>
              <label className="minutes" htmlFor="minutes">
                Minute
              </label>
            </div>

            <label className="lunchtime" htmlFor="lunchtime">
              Lunch time
            </label>

            <div className="inputContainer2">
              <input
                className="updateInput"
                type="tel"
                placeholder="00"
                name="hours"
                maxLength={2}
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
                Hour
              </label>
              <label className="minutes" htmlFor="minutes">
                Minute
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
