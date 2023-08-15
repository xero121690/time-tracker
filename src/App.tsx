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

  const calculateAmPm = (oldAmPm, currentAmPm) => {
    // within same morning /evening
    if (oldAmPm == currentAmPm) {
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
    const storedTime = {
      oldMinute: localStorage.getItem("userData")?.substring(4, 6),
      oldHour: localStorage.getItem("userDate")?.substring(1, 3),
      oldAmPM: localStorage.getItem("userDate")?.substring(10, 12),
    };
    // const oldMinute = localStorage.getItem("userData")?.substring(4, 6);
    // const oldHour = localStorage.getItem("userDate")?.substring(1, 3);
    // const oldAmPM = localStorage.getItem("userDate")?.substring(10, 12);

    //current time
    const currentTime = {
      currentMinute: date.toLocaleTimeString([], {
        minute: "2-digit",
      }),
      currentHour: date.toLocaleTimeString([], {
        hour12: true,
        hour: "2-digit",
      }),
      // "7:00:00 PM"
      currentAmPm: date.toLocaleTimeString("en-US")?.substring(10, 12),
    };
    // const currentMinute = date.toLocaleTimeString([], {
    //   minute: "2-digit",
    // });
    // const currentHour = date.toLocaleTimeString([], {
    //   hour12: true,
    //   hour: "2-digit",
    // });
    // const currentAmPm = date.toLocaleTimeString("en-US")?.substring(10, 12);

    let timeElapsed = 0;
    if (storedTime.oldMinute && storedTime.oldHour && storedTime.oldAmPM) {
      calculateAmPm(storedTime, currentTime);
    }

    console.log("time elapsed: ", timeElapsed);
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
        <button className="btn btn-primary btn-lg" onClick={displayTime}>
          Display Time Elapsed
        </button>
      </div>
    </>
  );
}

export default App;
