import Card from "@mui/material/Card";
import React, { useState } from "react";
import Button from "../Common/button";
import CustomDatePicker from "../Common/date-picker";
import SelectDropdown from "../Common/dropdown";
import InputSearch from "../Common/searchbar";
import "./flight-form.css";
import { getFilterStrategies, getFlightBookingTypes, getNoOfPassengers } from './flight-service';
import FlightList from "./flightlist";
import Information from "./information";
import "./searchflight.css";
import { getLocations } from '../../services/flight/amadeus-api-service';
import { Fab } from '@mui/material';
import { RateReview } from '@mui/icons-material';
import { Link } from 'react-router-dom';

var flightsJsonData = require('../DummyDataFiles/FlightsDummy/FlightSearchData.json');

const styles = {
  position: "fixed",
  bottom: (theme) => theme.spacing(2),
  right: (theme) => theme.spacing(2)
}



function SearchFlight() {

  // const {loggedinUser,SetloggedInUser} = useContext(UserContext);
  let loggedinUser = sessionStorage.getItem("user-info");
  console.log("logged in user in Search Flight page", loggedinUser)

  const bookingTypes = getFlightBookingTypes();
  const noOfPassengersList = getNoOfPassengers();
  const DATE_FORMAT = "YYYY-MM-DD";
  const [showList, setShowList] = useState(false);
  const [fromLocations, setFromLocations] = useState([]);
  const [toLocations, setToLocations] = useState([]);
  const [value] = useState("");
  const [bookReturn, setBookReturn] = useState(false);
  const [bookingType, setBookingType] = useState(bookingTypes[0].id);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [noOfPassengers, setNoOfPassengers] = useState(getNoOfPassengers()[0].label);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [flights, setFlights] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const handleBookType = (id) => {
    setBookingType(id);
    switch (id) {
      case "oneWay":
        setBookReturn(false);
        setReturnDate("");
        break;
      case "return":
        setBookReturn(true);
        break;
      default:
        setBookReturn(false);
        setReturnDate("");
        break;

    }
  };

  const onSourceSelected = (location) => {
    setSource(location);
    validateForm();
  }
  const onDestinationSelected = (location) => {
    setDestination(location);
    validateForm();
  }

  const handleDepartureDate = (deptDate) => {
    setDepartureDate(deptDate);
    validateForm();
  }

  const handleReturnDate = (rtDate) => {
    setReturnDate(rtDate);
    validateForm();
  }

  const handleNumberOfPassengers = (event) => {
    setNoOfPassengers(event);
    validateForm();

  }

  const fetchFlights = async () => {
    let request = {
      'source': source,
      'destination': destination,
      'departureDate': departureDate,
      'returnDate': returnDate,
      'bookingType': bookingType,
      'noOfPassengers': noOfPassengers,
      'filterBy': filterBy
    }

    let response = await getFlightSearchReq(request);
    console.log("response from 108 in search flight : ", response);
    let flights = response;
    setFlights(flights);
    setShowList(true);
  }

  function getFlightSearchReq(request) {
    // TODO make a REST call to backend and get data for testing using JSON file

    let data = JSON.parse(JSON.stringify(flightsJsonData));
    let resultList = data.data.filter(
      (obj) =>
        (obj.departureCityName === request.source.address.cityName) &&
        (obj.arrivalCityName === request.destination.address.cityName)
    );
    if (request.filterBy && request.filterBy === 'Price: High to Low') {
      resultList = resultList.sort((a, b) => a.price - b.price)
    } else if (request.filterBy && request.filterBy === 'Price: Low to high') {
      resultList = resultList.sort((a, b) => b.price - a.price);
    } else if (request.filterBy && request.filterBy === 'Airline') {
      resultList = resultList.sort((a, b) => b.company - a.company);
    }
    return resultList;
  }


  const onFilterSelected = (type) => {
    setFilterBy(type);
    fetchFlights();
  }

  const validateForm = () => {
    let buttonVal = disableSearchBtn();
    setDisableButton(buttonVal);
  }

  const disableSearchBtn = () => {
    if (noOfPassengers && source !== '' && destination !== '' && departureDate !== '') {
      if (bookReturn) {
        return returnDate === '';
      } else {
        return false;
      }
    }

    return true;
  }

  const canLocationBeSearched = (value, reason) => {
    return value && value.length >= 3 && reason !== 'reset';
  }

  const searchSourceLocations = async (event, value, reason) => {
    if (canLocationBeSearched(value, reason)) {
      let results = await getLocations(value);
      let data = results.data.data;
      setFromLocations(data);
    }
  }

  const searchDestinationLocations = async (event, value, reason) => {
    if (canLocationBeSearched(value, reason)) {
      let results = await getLocations(value);
      let data = results.data.data;
      setToLocations(data);
    }
  }

  // const disableButton = source == null || destination == null || returnDate == null || departureDate == null;
  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Card className="mrgn">
            {/* <div className="col-md-3 ml-4"> */}
            <div className="col-md-3 mrgn">
              <div className="btn-group d-flex justify-content-center">
                {bookingTypes.map((type) => {
                  return (
                    <button
                      type="button"
                      className={`btn ${bookingType === type.id ? "active_btn" : ""}`}
                      key={type.id}
                      onClick={() => handleBookType(type.id)}
                    >
                      {type.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex">
                  <div className="p-2 mt-2">
                    <InputSearch
                      value={source}
                      input={fromLocations}
                      onInputChange={searchSourceLocations}
                      onChange={onSourceSelected}
                      label="Source"
                      name="sourceAirport"
                      className="mt-2" />
                  </div>
                  <div className="p-2 mt-2">
                    <InputSearch
                      value={destination}
                      input={toLocations}
                      onInputChange={searchDestinationLocations}
                      onChange={onDestinationSelected}
                      label="Destination"
                      className="mt-2"
                    />
                  </div>

                  <div className="p-2 mt-2">
                    <CustomDatePicker
                      value={value}
                      onChange={handleDepartureDate}
                      disablePast
                      format={DATE_FORMAT}
                      label="Departure"
                      className="mt-2"
                    />
                  </div>
                  <div className="p-2 mt-2">
                    {bookingType === "return" ? (
                      <CustomDatePicker
                        value={value}
                        onChange={handleReturnDate}
                        disablePast
                        format={DATE_FORMAT}
                        label="Return"
                        className="mt-2"
                      />
                    ) : null}
                  </div>
                  <div className="p-2 mt-2">
                    <SelectDropdown
                      label="No of travellers"
                      value={noOfPassengersList}
                      onChange={handleNumberOfPassengers}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
            <div className="flt-rt">
              <Button

                disabled={disableButton}
                onClick={fetchFlights}
                btname="Search Flights" />
            </div>
          </Card>
        </div>
        <div className="col-md-12 mt-3">
          {showList ? <div>
            {/* <SearchFilter value={getFilterStrategies()} onChange={onFilterSelected}/> */}
            <SelectDropdown
              label="Sort By"
              value={getFilterStrategies()}
              onChange={onFilterSelected}
            />
            
            <FlightList flights={flights} noOfPassengers={noOfPassengers} />
          </div> : <Information />}
        </div>
      </div>
      {
        loggedinUser ?
          <div id='bottom'>
            <Link className='btn btn-outline-light' to="/feedbackform"><Fab sx={styles}><RateReview /></Fab></Link>
          </div>
          : null
      }
    </div>

  );
}

SearchFlight.propTypes = {};

export default SearchFlight;
