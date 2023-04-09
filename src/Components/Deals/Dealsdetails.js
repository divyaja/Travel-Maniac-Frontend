import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getFlightById } from "../Flights/flight-service";
import "../Flights/flightdetails.css";

function Dealsdetails(props) {
  const location = useLocation();
  const isMiles = location.state?.isMiles;

  console.log(isMiles);
  //getting logged in user from local storage

  //getting id from path
  const { id, pc } = useParams();
  let loggedinUser = JSON.parse(sessionStorage.getItem("user-info"));
  console.log("data in Deal details page: ", id);
  console.log("passenger count in Flight details page: ", pc);
  let data = getFlightById(id);
  let flight = data.length === 1 ? data[0] : {};
  console.log("deal details", flight);
  let noOfPassengers = 0;
  //to come back here after login 
  sessionStorage.setItem("deal-data", JSON.stringify(flight));
  sessionStorage.setItem("passenger-count", (noOfPassengers));

  const getPrice = (flight) => {
    return flight.deals_price;
  };

  const getPriceMiles = (flight) => {
    return flight.miles;
  };

  const getTotalPrice_miles = (flight) => {
    return getPriceMiles(flight);
  };

  const getTotalPrice = (flight) => {
    return getPrice(flight);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <div className="text-center m-4">
            {" "}
            <h2> Review Deal</h2>{" "}
          </div>
          <div className="row text-center">
            <div className="col s12 m6 text-center">
              <span className="text-bold">Source </span>
            </div>
            <div className="col s12 m6 text-center">
              <span className="text-bold"> Destination</span>
            </div>
          </div>
          <div className="row text-center">
            <div className="col s12 m6 text-center">
              <span className="fromto">{flight.departureCityName}</span>
            </div>
            <div className="col s12 m6 text-center">
              <span>{flight.arrivalCityName}</span>
            </div>
          </div>

          <div className="row">
            <div className="col s12 m6 text-center">
              <span className="text-bold">Vacation Start Date </span>
            </div>
            <div className="col s12 m6 text-center">
              <span className="text-bold"> Vacation End Date</span>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6 text-center">
              <span className="fromto">{flight.departureDate}</span>
            </div>
            <div className="col s12 m6 text-center">
              <span>{flight.arrivalDate} </span>
            </div>
          </div>

          <div className="row text-center">
            <div className="col s12 m6 ">
              <span className="text-bold">Total Price(in $) </span>
            </div>
            <div className="col s12 m6 ">
              <span className="text-bold"> Total Price(in miles)</span>
            </div>
          </div>
          <div className="row text-center">
            <div className="col s12 m6 ">
              <span className="fromto">${getTotalPrice(flight)}</span>
            </div>
            <div className="col s12 m6">
              <span>{getTotalPrice_miles(flight)} miles</span>
            </div>
          </div>

          {loggedinUser ? (
            <>

              <div className="text-center">
                {" "}
                <Link
                  to={{ pathname: `/usermiles/${id}/${noOfPassengers}` }}
                  className="btn btn-outline-primary m-4"
                >
                  Book Now
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                {" "}
                <Link to="/loginuser" className="btn btn-outline-primary m-4">
                  Proceed
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dealsdetails;
