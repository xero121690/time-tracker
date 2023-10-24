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
    // had to edit this responsice design aspect of it because the card was not working with the buttons but this is good
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1180 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1180, min: 990 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 990, min: 620 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 620, min: 0 },
      items: 2,
    },
  };

  /*
   <button
            type="button"
            className="button"
            onClick={() => {
              // handleDelete(data.DataID)
            }}
          >
            <a className="btn btn-outline-danger">Delete</a>

  */

  const htmlDisplay = history.map((data: data) => (
    <div className="card" key={data.DataID}>
      {/* card */}
      <div className="datetime">
        <h2 className="date">{data.date}</h2>
        <h3 className="time">{addSeconds(data.seconds)}</h3>
      </div>
      <div className="bothbuttons">
        <div className="update">
          <button type="button" className="button">
            <Link
              className="btn btn-outline-light"
              to={`/update/${data.DataID}`}
            >
              Update
            </Link>
          </button>
        </div>
        <div className="delete">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="button"
          >
            <a className="btn btn-outline-danger">Delete</a>
          </button>
        </div>

        {/*moved the div elements outside the carousel even though they were inside carousel at first as trial run */}

        {/* <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch
        </button> */}

        {/*  */}
      </div>
    </div>
  ));

  return (
    <div className="main">
      <h1 className="history">History</h1>

      {/* BS modal */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are you sure you want to delete?
              </h1>
              <div className="buttonclose" data-bs-theme="dark">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            {/* <div className="modal-body">Are you sure you want to delete?</div> */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-light cancel"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-outline-danger delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
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
