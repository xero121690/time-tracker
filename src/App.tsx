import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //thinking of storing time with id and time to retrieve later using localstorage
  //id can start at 0
  //can use storeTime for it
  const [storeTime, setStoreTime] = useState("");
  const [time, setTime] = useState("");
  const date = new Date();
  const seconds = 1;

  //buttons
  const [isButton, setButton] = useState(true);

  // explicitly set options to object because toLocaleDateString would say there is an overload
  const options: object = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // setInterval creates a new interval every time component renders, which causes it to render again and you end up with an inifinite loop
  //useEffect to mount and unmount
  useEffect(() => {
    const tmpTime = setInterval(() => {
      setTime(date.toLocaleTimeString());
    }, seconds * 1000);
    return () => {
      clearInterval(tmpTime);
    };
  }, [time]);

  const recordTime = () => {
    // using the same time in setInterval
    setStoreTime(time);
    //flip the value
    setButton(!isButton);
    // after user
    localStorage.setItem("userData", JSON.stringify(storeTime));
  };

  return (
    <>
      <div className="grid text-center">
        <h1>{date.toLocaleDateString("en-US", options)}</h1>
        <h1>{time}</h1>
        {isButton ? (
          <button className="btn btn-primary btn-lg" onClick={recordTime}>
            Start
          </button>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={recordTime}>
            Stop
          </button>
        )}
        <p>Recorded time: {storeTime}</p>
        <p>{localStorage.getItem("userData")}</p>
      </div>
    </>
  );
}

export default App;
