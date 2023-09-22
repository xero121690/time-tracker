import { useEffect, useState, useLayoutEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Timer() {
  //thinking of storing time with id and time to retrieve later using localstorage
  //id can start at 0
  //can use storeTime for it
  const [storeTime, setStoreTime] = useState("");
  const [time, setTime] = useState("");
  const date = new Date();
  const [displaySeconds, setDisplaySeconds] = useState("");
  // const [minutes, setMinutes] = useState(parseInt("0"));
  // const [realMinutes, setRealMinutes] = useState(parseInt("0"));
  const seconds = 1;

  //buttons
  // const [isButton, setButton] = useState(true);
  const [startButton, setStartButton] = useState(true);
  const [stopButton, setStopButton] = useState(false);

  // explicitly set options to object because toLocaleDateString would say there is an overload
  const options: object = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // running this first before i start anything else
  //going to check whether api start is running already; only once on refresh
  useLayoutEffect(() => {
    const urlStartTimer = "http://127.0.0.1:3000/onrefresh";
    axios
      .get(urlStartTimer)
      .then(function (response) {
        // handle success
        //response.data - only data from response, without it, you receive headers
        console.log(response.data);
        if (response.data) {
          setStopButton(true);
          setStartButton(false);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log("finally");
      });

    // return () => {};
  }, []);

  // setInterval creates a new interval every time component renders, which causes it to render again and you end up with an inifinite loop
  //useEffect to mount and unmount
  useEffect(() => {
    const tmpTime = setInterval(() => {
      setTime(date.toLocaleTimeString());
      // setMinutes(minutes + 1);
    }, seconds * 1000);

    return () => {
      clearInterval(tmpTime);
    };
  }, [time]);

  const stopTime = () => {
    //flip the value
    setStartButton(true);
    setStopButton(false);

    //making a request
    /*************************************************************************************************.post********************** */
    const urlStartTimer = "http://127.0.0.1:3000/stop";
    axios
      .post(urlStartTimer)
      .then(function (response) {
        // handle success
        //response.data - only data from response, without it, you receive headers
        console.log(JSON.stringify(response.data));
        setDisplaySeconds(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log("finally");
      });
  };

  const recordTime = () => {
    // using the same time in setInterval
    //here you add the whole object
    //run seconds on the back end, and only when user decides to stop does it provide the seconds/minutes elapsed

    setStoreTime(time);
    // after user
    localStorage.setItem("userData", JSON.stringify(storeTime));

    //flip the value
    setStartButton(false);
    setStopButton(true);

    //making a request

    const urlStartTimer = "http://127.0.0.1:3000/start";
    axios
      .get(urlStartTimer)
      .then(function (response) {
        // handle success
        console.log(JSON.stringify(response.data));
        setDisplaySeconds(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error.code);
      })
      .finally(function () {
        // always executed
        console.log("finally");
      });
  };

  const calculateTime = () => {
    const urlStartTimer = "http://127.0.0.1:3000/retrieve";
    axios
      .get(urlStartTimer)
      .then(function (response) {
        // handle success
        console.log(response.data);
        console.log("inside calculateTime");
        addSeconds(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log("finally");
      });
    // if (addedMinutes >= 60){
    //   addedHours = addedHours + parseInt(addedMinutes/60);
    //   addedMinutes = parseInt(addedMinutes%60);
    // }
  };

  const addSeconds = (seconds: number) => {
    let addedMinutes = Math.floor(seconds / 60);
    let addedHours = 0;
    if (addedMinutes >= 60) {
      addedHours = addedHours + addedMinutes / 60;
      addedMinutes = addedMinutes % 60;
    }

    setDisplaySeconds(JSON.stringify(`Minutes: ${addedMinutes}`));

    console.log("added seconds: ", seconds);

    console.log("added minutes: ", addedMinutes);
    console.log("added hours: ", addedHours);
  };

  return (
    <>
      <div className="grid text-center">
        {/* Thursday, August 17, 2023 */}
        <h1>{date.toLocaleDateString("en-US", options)}</h1>
        {/* displays only when you hit sto  */}
        <h1>{time}</h1>
        {startButton ? (
          <button className="btn btn-primary btn-lg" onClick={recordTime}>
            Start
          </button>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={stopTime}>
            Stop
          </button>
        )}
        <p>Recorded time: {storeTime}</p>
        {/* displays recorded time only after you press stop */}
        <p>{displaySeconds}</p>

        <button
          className="btn btn-primary btn-lg"
          disabled={!stopButton}
          onClick={calculateTime}
        >
          Display Time Elapsed
        </button>

        <p></p>
        <div>
          <button className="history">
            <Link className="btn btn-primary btn-lg" to={"/history"}>
              History
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default Timer;
