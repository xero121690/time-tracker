import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

const History = () => {
  type data = {
    DataID: string;
    seconds: number;
    date: string;
  };

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const urlStartTimer = "http://127.0.0.1:3000/retrieve";
    axios
      .get(urlStartTimer)
      .then(function (response) {
        // handle success
        //response.data - only data from response, without it, you receive headers
        console.log(response.data);
        setHistory(() => response.data);
      })
      .catch(function (error) {
        // handle error
        return error;
      })
      .finally(function () {
        // always executed
      });

    // return () => {};
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("http://127.0.0.1:3000/history/" + id);
      window.location.reload();
    } catch (err) {
      return err;
    }
  };

  const addSeconds = (seconds: number) => {
    let addedMinutes = Math.floor(seconds / 60);
    let addedHours = 0;
    if (addedMinutes >= 60) {
      addedHours = addedHours + addedMinutes / 60;
      addedMinutes = addedMinutes % 60;
    }

    let testString = JSON.stringify(`Minutes: ${addedMinutes}`);

    console.log("added seconds: ", seconds);

    console.log("added minutes: ", addedMinutes);
    console.log("added hours: ", addedHours);
    return testString;
  };

  return (
    <div>
      <h1 className="historyh1">History</h1>
      {/* <h2>{JSON.stringify(history)}</h2> */}
      <div className="History">
        {history.map((data: data) => (
          <div className="time" key={data.DataID}>
            <h2 className="date">{data.date}</h2>
            <h3 className="seconds">{data.seconds}</h3>
            <h3 className="minutes">{addSeconds(data.seconds)}</h3>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleDelete(data.DataID)}
            >
              Delete
            </button>
            <button className="transparent">
              <Link
                className="btn btn-primary btn-sm"
                to={`/update/${data.DataID}`}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
      <div className="homeButton">
        <button className="transparent">
          <Link className="btn btn-primary btn-lg" to={"/"}>
            Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default History;
