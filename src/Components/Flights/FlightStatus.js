import React from 'react';
// import Card from '../Common/Card';
import { useState } from "react";
import CustomDatePicker from "../Common/date-picker";
// import Button from "../Common/button";
import { Card } from '@mui/material';
import Button from "../Common/button";
import BasicTextFields from "../Common/textfield";
// import InputSearch from "../Common/searchbar";
// import CustomDatePicker from "../Common/date-picker";
import FlightStatusList from './FlightStatusList';
import Information from "./information";
var flightStatusJsonData = require('../DummyDataFiles/FlightStatusDummy/FS.json');



export default function FlightStatus() {
  const DATE_FORMAT = "YYYY-MM-DD";
  const [flightNumber, setFlightNumber] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [showList, setShowList] = useState(false);
  const [value, setValue] = useState("");
  const [flightStatus, setFlightStatus] = useState({
  })

  const handleDepartureDate = (deptDate) => {
    setDepartureDate(deptDate);
    let buttonVal = disableSearchBtn(deptDate);
    console.log(`button val = ${buttonVal}`);
    setDisableButton(buttonVal);
  }

  const disableSearchBtn = (deptDate = "") => {
    // console.log("search button");
    if (flightNumber !== '' && airlineName !== '' && deptDate !== '') {
      return false;
    }
    return true;
  }

  const onFlightNumberChange = (data) => {
    setFlightNumber(data.target.value);
    let buttonVal = disableSearchBtn();
    console.log(`button val = ${buttonVal}`);
    setDisableButton(buttonVal);
  }

  const onAirlineNameChange = (data) => {
    setAirlineName(data.target.value);
    let buttonVal = disableSearchBtn();
    console.log(`button val = ${buttonVal}`);
    setDisableButton(buttonVal);
  }


  const fetchFlightStatus = async () => {
    let request = {
      'flightNumber': flightNumber,
      'airlineName': airlineName,
      'departureDate': departureDate
    }
    let data = flightStatusJsonData;
    console.log("data in flight status : ", data);
    data = data.data.filter((obj) =>
      obj.flightNumber === request.flightNumber
      && obj.airline === request.airlineName
      && obj.departureDate === request.departureDate);
    console.log("data per request flight status : ", data);
    // let response = await getFlightStatusReq(request);
    // console.log("response from 108 in search flight : ",response);
    // let flights = response.data;
    // setFlight(flights);
    console.log(data[0]);
    setFlightStatus(data[0]);
    setShowList(true);
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Card className="mrgn-flight-status">
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-center">
                  <div className="p-2 mt-2">
                    <BasicTextFields
                      label="Flight Number"
                      variant="outlined"
                      name="flightNumber"
                      // id="outline-basic"
                      value ={flightNumber}
                      onChange={onFlightNumberChange}
                    />
                  </div>
                  <div className="p-2 mt-2">
                    <BasicTextFields
                      label="Airline Name"
                      variant="outlined"
                      // id="outline-basic"
                      name="airlineName"
                      value = {airlineName}
                      onChange={onAirlineNameChange}
                    />
                  </div>
                  <div className="p-2 mt-2">
                    <CustomDatePicker
                      value={departureDate}
                      onChange={handleDepartureDate}
                      format={DATE_FORMAT}
                      label="Departure"
                      className="mt-2"
                    />
                  
                  </div>
                </div>
              </div>
              
                <div className="p-2 mt-2 text-center">
                  <Button
                    disabled={disableButton}
                    onClick={fetchFlightStatus}
                    btname="Search" />
                </div>
              
            </div>
          </Card>
        </div>
        <div className="col-md-12 mt-3">
          {showList ? <div>
            <FlightStatusList fsdata={flightStatus} />
          </div> : <Information />}
        </div>
      </div>
    </div>
  );
}
