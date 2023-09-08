import { useEffect, useState } from "react";
import "./App.css";

type Time = {
  [key: string]: string;
};

// type Person = {
//   id: number;
//   time: string;
// };

// assuming user logged in already
// start and stop, display time
// 1 day only - time
// --> going to use storedTime, currenttime, and ID
// future feature add date to add multiple day time

function App() {
  //thinking of storing time with id and time to retrieve later using localstorage
  //id can start at 0
  //can use storeTime for it
  const [storeTime, setStoreTime] = useState("");
  const [time, setTime] = useState("");
  const date = new Date();
  // const [minutes, setMinutes] = useState(parseInt("0"));
  // const [realMinutes, setRealMinutes] = useState(parseInt("0"));
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
      // setMinutes(minutes + 1);
    }, seconds * 1000);

    return () => {
      clearInterval(tmpTime);
    };
  }, [time]);

  // useEffect(() => {
  //   let tempMinutes = 0;
  //   if (minutes == 60) {
  //     tempMinutes = setRealMinutes(realMinutes + 1);
  //   }

  //   return () => clearInterval(tempMinutes);
  // }, [realMinutes]);

  const recordTime = () => {
    // using the same time in setInterval
    //here you add the whole object

    setStoreTime(time);
    // after user
    localStorage.setItem("userData", JSON.stringify(storeTime));

    //flip the value
    setButton(!isButton);
  };

  //put time as the type, otherwise gives error
  const calculateAmPm = (
    { oldMinute, oldHour, oldAmPm }: Time,
    { currentMinute, currentHour, currentAmPm }: Time
  ) => {
    // let check = /[AP]M/g has a bug where every other regex call ie. check.test() is true then false
    // works for am = am | pm = pm; checking for only AM or PM in the string
    if (/[AP]M/g.test(oldAmPm) == /[AP]M/g.test(currentAmPm)) {
      // accounts for 12:00AM - 1:00AM
      console.log("current hour: ", currentHour);
      console.log("oldHour: ", oldHour);

      let hourDifference = parseInt(currentHour) - parseInt(oldHour);
      // if hourDifference is negative meaning 1 - 12 = -11
      if (hourDifference < 0) {
        hourDifference = 1;
      }
      console.log("hourDifference: ", hourDifference);

      // minute difference; 09 - 25 = -15
      let minuteDifference = parseInt(currentMinute) - parseInt(oldMinute);
      console.log("minuteDifference: ", minuteDifference);

      //this means more than
      if (oldMinute > currentMinute) {
        //5:30 > 6:23
        //5:59 > 6:58
        //8:25 > 9:24
        //hourDifference: 0
        //minutedifference: 59
        minuteDifference = 60 - parseInt(currentMinute) + parseInt(oldMinute);
        //5:30 > 6:23
        minuteDifference = 60 - (minuteDifference % 60);

        if (minuteDifference < 60) {
          hourDifference = hourDifference - 1;
          // 5:10 > 6:25
        }
      }
      // account for 12:10AM - 1:10AM
      // 1:00AM - 2:00AM

      // if (addedMinutes >= 60){

      //   addedHours = addedHours + parseInt(addedMinutes/60);
      //   addedMinutes = parseInt(addedMinutes%60);
      // }
      console.log("final oldAmPm: ", oldAmPm);
      console.log("final currentAmPm: ", currentAmPm);

      console.log("final hourDifference: ", hourDifference);
      console.log("final minuteDifference: ", minuteDifference);
    }
    // going from morning to evening
    // instead of doing this i can do is put an ||
    //ex. oldAmPm == AM && currentAmPm == PM || oldAmPm == PM && currentAmPm == AM
    if (oldAmPm == "AM" && currentAmPm == "PM") {
    }
    //going from evening to morning
    if (oldAmPm == "PM" && currentAmPm == "AM") {
    }
  };

  const displayTime = () => {
    // console.log("seconds: ", minutes);
    // console.log("realMinutes: ", realMinutes);

    //going to gather the time from first localstorage submission to present submission
    //buton to show time elapsed in minutes

    /********************************** glitch need to fix the stored time for am, pm , was working with 9, 11, now works 10, 12 
     might need to add regex to fix the glitch, unless it was user error
     * 
    */

    //stored time
    const storedTime: Time = {};
    storedTime.oldMinute =
      localStorage.getItem("userData")?.substring(3, 5) || "0";

    storedTime.oldHour =
      localStorage.getItem("userData")?.substring(1, 2) || "0";

    storedTime.oldAmPm = localStorage.getItem("userData") || "";

    //localStorage.getItem("userData")?.substring(8, 11) || "";

    //current time
    //doesn't need || because data is generated
    const currentTime: Time = {
      currentMinute: date.toLocaleTimeString([], {
        minute: "2-digit",
      }),
      currentHour: date.toLocaleTimeString().substring(0, 2),
      // "7:00:00 PM"
      currentAmPm: date.toLocaleTimeString("en-US"),
    };
    console.log("currentampm: ", typeof currentTime.currentAmPm);
    console.log("oldAmPm: ", storedTime.oldAmPm);

    console.log("time");
    calculateAmPm(storedTime, currentTime);
  };

  const clearPage = () => {
    location.reload();
    localStorage.clear();
  };

  return (
    <>
      <div className="grid text-center">
        {/* Thursday, August 17, 2023 */}
        <h1>{date.toLocaleDateString("en-US", options)}</h1>
        {/* displays only when you hit sto  */}
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
        {/* displays recorded time only after you press stop */}
        {isButton && <p>{localStorage.getItem("userData")}</p>}
        <button className="btn btn-primary btn-lg" onClick={displayTime}>
          Display Time Elapsed
        </button>
        <p></p>
        <div>
          <button className="btn btn-primary btn-lg" onClick={clearPage}>
            Clear Page
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
