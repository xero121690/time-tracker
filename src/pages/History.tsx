import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
// import { Link } from "react-router-dom";

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
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log("finally");
      });

    // return () => {};
  }, []);

  return (
    <div>
      <h1 className="historyh1">History</h1>
      {/* <h2>{JSON.stringify(history)}</h2> */}
      <div className="History">
        {history.map((data: data) => (
          <div className="time" key={data.DataID}>
            <h2 className="date">{data.date}</h2>
            <h3 className="seconds">{data.seconds}</h3>

            {/* <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
