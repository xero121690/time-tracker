import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
        setHistory(() => response.data);
      })
      .catch(function (error) {
        return error;
      })
      .finally(function () {});

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

    const testString = `${addedHours}:${addedMinutes}`;
    return testString;
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const htmlDisplay = history.map((data: data) => (
    <div className="card" key={data.DataID}>
      {/* card */}
      <div className="datetime">
        <h2 className="date">{data.date}</h2>
        <h3 className="time">{addSeconds(data.seconds)}</h3>
      </div>
      <div className="update">
        <button type="button" className="button">
          <Link className="btn btn-outline-light" to={`/update/${data.DataID}`}>
            Update
          </Link>
        </button>
      </div>
      <div className="delete">
        <button
          type="button"
          className="button"
          onClick={() => handleDelete(data.DataID)}
        >
          <a className="btn btn-outline-danger">Delete</a>
        </button>
      </div>
    </div>
  ));

  return (
    <div className="main">
      <h1 className="history">History</h1>
      <Carousel responsive={responsive}>{htmlDisplay}</Carousel>
      <div className="homeButton">
        <p></p>
        <button type="button">
          <Link className="btn btn-primary btn-lg" to={"/"}>
            Home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default History;
