import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Timer() {
  //can use storeTime for it
  const [storeTime, setStoreTime] = useState("");
  // date is used for date Thursday, September 28, 2023 h1 tag with en-us options
  const date = new Date();
  // need to use new Date() here for initial date view and then useeffect for after 1 second
  const [time, setTime] = useState(new Date());
  const [displaySeconds, setDisplaySeconds] = useState("");
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

  //check if server running switch start to stop button
  //retrieve localstorage data if there is any
  useEffect(() => {
    // correct way to abort below
    // const controller = new AbortController();
    // const signal = controller.signal;
    const urlStartTimer = "http://127.0.0.1:3000/onrefresh";
    axios
      .get(urlStartTimer)
      .then(function (response) {
        //response.data - only data from response, without it, you receive headers
        if (response.data) {
          setStopButton(true);
          setStartButton(false);
          const runningTimer = localStorage.getItem("userData");

          if (runningTimer) {
            const parsedRunningTimer = JSON.parse(runningTimer);
            setStoreTime(parsedRunningTimer);
          }
        }
      })
      .catch(function (error) {
        if (error.name === "AbortError") {
          return error.name;
        }
        return error;
      })
      .finally(function () {});

    return () => {
      // controller.abort();
    };
  }, []);

  // setInterval creates a new interval every time component renders, which causes it to render again and you end up with an inifinite loop
  //useEffect to mount and unmount
  useEffect(() => {
    const tmpTime = setInterval(() => {
      setTime(new Date());
      // setMinutes(minutes + 1);
    }, seconds * 1000);

    //this is a clean up function,
    return () => {
      //clear something from previous effect
      clearInterval(tmpTime);
    };
  }, [time]);

  //flip button from stop->start, post stop, receive seconds response from server
  const stopTime = () => {
    //flip the value
    setStartButton(true);
    setStopButton(false);

    const urlStartTimer = "http://127.0.0.1:3000/stop";
    axios
      .post(urlStartTimer)
      .then(function (response) {
        //response.data - only data from response
        //continuous function stopped. Seconds elapsed: 10
        setDisplaySeconds(JSON.stringify(response.data));
      })
      .catch(function (error) {
        return error;
      })
      .finally(function () {});
  };

  //store start time into localstorage, flip start/stop buttons, feedback from /start server
  const recordTime = () => {
    //run seconds on the back end, and only when user decides to stop does it provide the seconds/minutes elapsed
    setStoreTime(time.toLocaleTimeString());
    // after user
    localStorage.setItem("userData", JSON.stringify(time.toLocaleTimeString()));

    //flip the value
    setStartButton(false);
    setStopButton(true);

    const urlStartTimer = "http://127.0.0.1:3000/start";
    axios
      .get(urlStartTimer)
      .then(function (response) {
        // start time feedback - Continuous function started - displayed in html
        setDisplaySeconds(JSON.stringify(response.data));
      })
      .catch(function (error) {
        return error;
      })
      .finally(function () {});
  };

  return (
    <>
      <div className="grid text-center">
        {/* Thursday, August 17, 2023 */}
        <h1>{date.toLocaleDateString("en-US", options)}</h1>
        <h1>{time.toLocaleTimeString()}</h1>
        {startButton ? (
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={recordTime}
          >
            Start
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={stopTime}
          >
            Stop
          </button>
        )}
        <p>Start time:</p>
        <p>{storeTime}</p>
        {/* displays recorded time only after you press stop */}
        <p>{displaySeconds}</p>

        <div>
          <button type="button" className="history">
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
