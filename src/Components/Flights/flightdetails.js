import React from 'react';
import { Link, useParams } from "react-router-dom";
import { getFlightById } from './flight-service';
import "./flightdetails.css";
import { AirlinesIcon } from '@mui/icons-material/AirlinesOutlined';
import { AirlinesOutlined, FlightTakeoff, FlightLand } from "@mui/icons-material";



function Flightdetails() {

  //getting logged in user from local storage
  // let loggedinUser = JSON.parse(localStorage.getItem("user-info"));
  // const { loggedinUser } = useContext(UserContext);
  let loggedinUser = JSON.parse(sessionStorage.getItem("user-info"));
  console.log("loggedinUser in Flight details page : ", loggedinUser);

  //getting id from path 
  const { id, pc } = useParams()

  console.log("data in Flight details page: ", id);
  console.log("passenger count in Flight details page: ", pc);
  let data = getFlightById(id);
  let flight = data.length === 1 ? data[0] : {};
  sessionStorage.setItem("flight-data", JSON.stringify(flight));
  sessionStorage.setItem("passenger-count", (pc));
  console.log("flight details in js : ", flight);
  let noOfPassengers = pc;
  // let data = getFlightById(id); //check whether data is valid or not, array should not be empty
  // let flight = data.length == 1 ? data[0] : {};
  // console.log("flight details" , flight);
  const getPrice = (flight) => {
    return flight.price * noOfPassengers;
  }
  const taxAmont = (flight) => {
    return (15 / 100) * getPrice(flight);
  }
  const getStartTime = (flight) => {
    //return flight.segments[0].departure.at;
    return flight.departureTime;
  }

  const getEndTime = (flight) => {
    // return flight.segments[flight.segments.length - 1].arrival.at;
    return flight.arrivalTime;
  }


  const getTotalPrice = (flight) => {
    return getPrice(flight) + taxAmont(flight);
  }

  const getTimings = (flight) => {
    return getStartTime(flight) + " - " + getEndTime(flight);
  }
  return (
    <div className="container">
      <div className="row ">

        <div className="col-md-4 offset-md-4 border rounded p-4 mt-4 shadow ">
          <div className='text-center'> <h4>Review Flight</h4></div>
          <div className="col s12 m6">
            <AirlinesOutlined />
            <span className="text-bold"> Airline</span>
          </div>
          <div className="col s12 m6 ">
            <span>{flight.airline}</span>
          </div>
          <div className="add-space"></div>
          <div className="row">
            <div className="col s12 m6">
              <FlightTakeoff />
              <span className="text-bold"> From </span>
            </div>
            <div className="col s12 m6">
              <FlightLand />
              <span className="text-bold"> To </span>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6 ">
              <span>{flight.departureCityName}</span>
            </div>
            <div className="col s12 m6 ">
              <span>{flight.arrivalCityName}</span>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6 ">
              <span>{flight.departureTime}</span>
            </div>
            <div className="col s12 m6 ">

              <span>{flight.arrivalTime}</span>
            </div>
          </div>



          <div className="add-space"></div>

          <div className="row ">
            <div className="col s12 m6 ">
              <span className="text-bold">Price </span>
            </div>
            <div className="col s12 m6 ">
              <span className="text-bold"> Tax</span>

            </div>

          </div>

          <div className="row">
            <div className="col s12 m6 ">

              <span className="fromto">{getPrice(flight)}$</span>
            </div>
            <div className="col s12 m6">
              <span> {taxAmont(flight)}$</span>
            </div>

          </div>

          <div className="col s12 m6 ">
            <span className="text-bold">Total Price</span>
          </div>
          <div className="col s12 m6">

            <span>{getTotalPrice(flight)}$</span>
          </div>

          {loggedinUser ? (
            <>

              <div className="text-center">
                {" "}
                <Link
                  to={{ pathname: `/usermiles/${id}/${noOfPassengers}` }}
                  className="btn btn-outline-primary m-4 text-center"
                >
                  Proceed
                </Link>
                <div className="text-center">
                  <span className="link-primary">
                    <Link to={"/hotels"}>Book Hotel </Link>
                  </span> to avail 20% discount{" "}
                </div>

              </div>

            </>
          ) : (
            <>

              <div className="text-center">
                {" "}
                <Link to="/loginuser" className="btn btn-outline-primary m-4 text-center">
                  Proceed
                </Link>

                <div className="text-center">
                  <span className="link-primary">
                    <Link to={"/hotels"}>Book Hotel </Link>
                  </span> to avail 20% discount{" "}

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>



  );
}

export default Flightdetails;