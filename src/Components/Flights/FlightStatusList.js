import React from "react";
import Card from "../Common/Card";
import { CardContent } from "@mui/material";
import {
  AirlinesOutlined,
  FlightOutlined,
  AirplaneTicket,
} from "@mui/icons-material";

export default function FlightStatusList(props) {
  // let currentDateTime = new Date().toLocaleString();
  const isValid = () => {
    console.log("flightstatus data", props.fsdata);
    if (
      props.hasOwnProperty("fsdata") &&
      props.fsdata !== null &&
      props.fsdata !== undefined
    ) {
      return true;
    }
    return false;
  };
  return (
    <div>
      {!isValid() ? (
        <div>No Flights Found</div>
      ) : (
        <div>
          <div className="container">
            <div className="row">
              <div className="add-space"></div>
              <div className="add-space"></div>
              <div className="add-space"></div>
              <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow text-center ">
                <div className="row">
                  <div class="col s12 m6">
                    <AirlinesOutlined />
                    <span className="text-bold"> {props.fsdata.airline}</span>
                  </div>
                  <div class="col s12 m6 ">
                    <FlightOutlined />
                    <span className="text-bold">
                      {props.fsdata.flightNumber}
                    </span>
                  </div>
                  <div class="col s12 m6 ">
                    <AirplaneTicket />
                    <span className="text-bold">
                      {props.fsdata.isInflight ? "In Flight" : ""}
                      {props.fsdata.isDelayed ? "Delayed" : ""}
                      {props.fsdata.isArrived ? "Arrived" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
