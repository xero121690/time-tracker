import { useEffect, useState } from "react";
import "./App.css";

type Time = {
  [key: string]: string;
};

// NEED to change my way of storage -> thats the next step

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

  useEffect(() => {
    // localStorage.setItem("userData");
  });

  const recordTime = () => {
    // using the same time in setInterval
    setStoreTime(time);
    //flip the value
    setButton(!isButton);
    // after user
    localStorage.setItem("userData", JSON.stringify(storeTime));
  };

  //put time as the type, otherwise gives error
  const calculateAmPm = (
    { oldMinute, oldHour, oldAmPm }: Time,
    { currentMinute, currentHour, currentAmPm }: Time
  ) => {
    console.log(oldAmPm, currentAmPm);
    console.log("hours: ", oldHour, currentHour);
    console.log("currentHour: ", currentHour);

    if (oldAmPm == currentAmPm) {
      const hourDifference = parseInt(oldHour) - parseInt(currentHour);

      console.log("hourDifference: ", hourDifference);
    }
    // going from morning to evening
    //
    if (oldAmPm == "AM" && currentAmPm == "PM") {
    }
    //going from evening to morning
    if (oldAmPm == "PM" && currentAmPm == "AM") {
    }
  };

  const displayTime = () => {
    //going to gather the time from first localstorage submission to present submission
    //buton to show time elapsed in minutes

    //stored time
    const storedTime: Time = {};
    storedTime.oldMinute =
      localStorage.getItem("userData")?.substring(3, 5) || "0";

    storedTime.oldHour =
      localStorage.getItem("userData")?.substring(1, 2) || "0";

    storedTime.oldAmPm =
      localStorage.getItem("userData")?.substring(9, 11) || "";

    //current time
    //doesn't need || because data is generated
    const currentTime: Time = {
      currentMinute: date.toLocaleTimeString([], {
        minute: "2-digit",
      }),
      currentHour: date.toLocaleTimeString().substring(0, 1),
      // "7:00:00 PM"
      currentAmPm: date.toLocaleTimeString("en-US")?.substring(8, 11),
    };

    let timeElapsed = 0;
    calculateAmPm(storedTime, currentTime);

    console.log("time elapsed: ", timeElapsed);
  };

  return (
    <>
      <div className="grid text-center">
        {/* Thursday, August 17, 2023 */}
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
        <button className="btn btn-primary btn-lg" onClick={displayTime}>
          Display Time Elapsed
        </button>
      </div>
    </>
  );
}

export default App;
