import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFlightById } from "./flight-service";
import axios from "axios";


function Usermiles() {
  //getting params from url
  const { id, pc } = useParams();
  console.log("data in Flight details page: ", id);
  let data = getFlightById(id);
  let flight = data.length === 1 ? data[0] : {};
  console.log("flight details in user miles : ", flight);
  let noOfPassengers = pc;
  if (pc > 0) {
    flight.miles = pc * flight.miles;
  }
  else{
    flight.miles = 1 * flight.miles;
  }
  let isDeal = (noOfPassengers === '0') ? true : false;

  // const [accumulatedMiles, setAccumulatedMiles] = useState(0);
  // const [redeemedMiles, setRedeemedMiles] = useState(0);

  const getAccMiles = (flight) => {
    let data = JSON.parse(sessionStorage.getItem("user-info"));
    if (data === null || data.userMiles === null) {
      // setIsUserMilesCheckbox(true);
      return 0;
    }
    else {
      return data.userMiles.milesRemaining;
    }
    //need to get from user object
  };

  const getReqMiles = (flight) => {
    return flight.miles;
  };
  const usermilesCheckbox = (flight) => {
    let miles = getAccMiles();
    if( miles < flight.miles) {
      return true;
    }
    else {
      return false;
    }
  }

  //toggle checkbox based on user miles
  // const [ usermilesCheckbox, setIsUserMilesCheckbox ] = useState(false);

  //checkbox for user miles
  const [isUserMilesChecked, setIsUserMilesChecked] = useState(false);

  // const showSuccessPopup = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let data = JSON.parse(sessionStorage.getItem("user-info"));
  //     let userid = data.id;
  //     if (data !== null && data) {
  //       let response = await axios.post(
  //         `http://localhost:8080/bookflightmiles/${userid}`,
  //         bookingFlightWithMilesData
  //       );
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.log(`ERROR: ${error}`);
  //   }
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <div className="text-center m-4">
            <h2> Miles</h2>
          </div>

          <div className="row text-center">
            <div className="col s12 m6 ">
              <span className="text-bold">
                {" "}
                <span> Available Miles </span>
              </span>
            </div>
            <div className="col s12 m6 ">
              <span className="text-bold">
                {" "}
                <span>Required Miles </span>
              </span>
            </div>
          </div>
          <div className="row text-center">
            <div className="col s12 m6">
              <span>{getAccMiles(flight)}</span>
            </div>
            <div className="col s12 m6">
              <span>{getReqMiles(flight)}</span>
            </div>
          </div>
          <div className="add-space"></div>
          <div className="add-space"></div>

          <div className="text-center text-bold"> <label>Do you want to use miles?</label>

            <input
              type="checkbox"
               disabled={usermilesCheckbox(flight)}
              checked={isUserMilesChecked}
              onChange={(e) => {
                setIsUserMilesChecked(e.target.checked);
              }}
            />

          </div>
          <div className="add-space"></div>
          <div className="add-space"></div>
          <div className="add-space"></div>

          {isDeal ?
            (
              <>
                <div className="text-center">
                  <Link
                    to={{ pathname: `/bookdealform/${id}` }}
                    className="btn btn-outline-primary m-4"
                  >
                    Checkout
                  </Link>
                </div>

              </>
            ) :
            (

              //add one more case for isUserMilesChecked
              <>
                {isUserMilesChecked ?
                  <div className="text-center">
                    <Link
                      to={{ pathname: `/bookFlightMiles/${id}/${pc}` }}
                      className="btn btn-outline-primary m-4"
                    >
                      Checkout
                    </Link>
                  </div>
                  :
                  <div className="text-center">
                    <Link
                      to={{ pathname: `/bookForm/${id}/${pc}` }}
                      className="btn btn-outline-primary m-4"
                    >
                      Checkout
                    </Link>
                  </div>
                }

              </>
            )

          }

        </div>
      </div>
    </div>
  );
}
export default Usermiles;
