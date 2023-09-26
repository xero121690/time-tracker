import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [time, setTime] = useState({
    seconds: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const timeID = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setTime((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log("insidehandleClick", time);
      await axios.put("http://127.0.0.1:3000/history/" + timeID, time);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(time);
  return (
    <div className="form">
      <h1>Update the time</h1>
      <input
        type="text"
        placeholder="seconds"
        onChange={handleChange}
        name="seconds"
      />

      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
