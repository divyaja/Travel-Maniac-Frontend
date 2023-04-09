import Card from "@mui/material/Card";
import React, { useState } from "react";
import { getLocation } from '../../services/hotel/amadeus-api-service';
import Button from "../Common/button";
import CustomDatePicker from "../Common/date-picker";
import SelectDropdown from "../Common/dropdown";
import InputSearch from "../Common/searchbar";
import { getFilterStrategies, getHotelByRequest, getNoOfGuest, getNoOfRoom } from './hotel-service';
import Information from "./hotelInformation";
import HotelList from "./hotelList";
import "./searchHotel.css";

function SearchHotel() {

  const DATE_FORMAT = "YYYY-MM-DD";
  const [showList, setShowList] = useState(false);
  const noOfGuestList = getNoOfGuest();
  const noOfRoomList = getNoOfGuest();
  const [value, setValue] = useState("");

  const [destination, setDestination] = useState("");
  const [checkInDate, setcheckInDate] = useState("");
  const [checkOutDate, setcheckOutDate] = useState("");
  const [guestsCount, setguestsCount] = useState(getNoOfGuest()[0].label);
  const [roomCount, setroomCount] = useState(getNoOfRoom()[0].label);
  const [roomPrice, setroomPrice] = useState("");
  const [hotels, setHotels] = useState([]);

  const [searchData,setSearchData] = useState({
    destination: destination,
    checkInDate: checkInDate,
    checkOutDate: checkOutDate,
    guestsCount: guestsCount,
    roomCount: roomCount,
    roomPrice: roomPrice
  });

  const [toLocations, setToLocations] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const onDestinationSelected = (location) => {
    setDestination(location.name);
    // setSearchData(...searchData.destination,location.name);
    validateForm();
  }

  const handleCheckInDate = (deptDate) => {
    setcheckInDate(deptDate);
    // setSearchData({...searchData.checkInDate,deptDate});
    validateForm();
  }

  const handleCheckOutDate = (rtDate) => {
    setcheckOutDate(rtDate);
    // setSearchData({...searchData.checkOutDate,rtDate});
    validateForm();
  }

  const handleNumberOfGuest = (event) => {
    setguestsCount(event);
    // setSearchData({...searchData.guestsCount,event});
    validateForm();

  }

  const handleNumberRoom = (event) => {
    setroomCount(event);
    setSearchData({...searchData.roomCount,event});
    validateForm();

  }

  const onFilterSelected = (type) => {
    setFilterBy(type);
    fetchHotel();
  }

  const validateForm = () => {
    let buttonVal = disableSearchBtn();
    setDisableButton(buttonVal);
  }

  const disableSearchBtn = () => {
    if (guestsCount && destination !== '' && checkInDate !== '' && checkOutDate !== '') {
      return false;
    }
    return true;
  }

  const canLocationBeSearched = (value, reason) => {
    return value && value.length >= 3 && reason !== 'reset';
  }

  const searchDestinationLocations = async (event, value, reason) => {
    if (canLocationBeSearched(value, reason)) {
      let results = await getLocation(value);
      let data = results.data.data;
      setToLocations(data);
    }
  }






  const fetchHotel = async () => {
    let request = {
      'destination': destination,
      'checkInDate': checkInDate,
      'checkOutDate': checkOutDate,
      'guestsCount': guestsCount,
      'roomCount': roomCount,
      'roomPrice': roomPrice,
      'filterBy': filterBy

    }
    let response = await getHotelByRequest(request);
    let hotels = response;
    //console.log("hotels data", hotels);
    setHotels(hotels);
    setShowList(true);

  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex">
            <Card className="mrgn">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex">
                    <div className="p-2 mt-2">

                      <InputSearch
                        value={destination}
                        input={toLocations}
                        onInputChange={searchDestinationLocations}
                        onChange={onDestinationSelected}
                        //placeholder="Where are you going?"
                        label="Going to"
                        className="mt-2"
                      />
                    </div>

                    <div className="p-2 mt-2">
                      <CustomDatePicker
                        value={value}
                        onChange={handleCheckInDate}
                        disablePast
                        format={DATE_FORMAT}
                        label="Check-in"
                        className="mt-2"
                      />
                    </div>
                    <div className="p-2 mt-2">
                      <CustomDatePicker
                        value={value}
                        onChange={handleCheckOutDate}
                        disablePast
                        format={DATE_FORMAT}
                        label="Check-out"
                        className="mt-2"
                      />
                    </div>
                    <div className="p-2 mt-2">
                      <SelectDropdown
                        label="Guests"
                        value={noOfGuestList}
                        onChange={handleNumberOfGuest}
                      />
                    </div>
                    <div className="p-2 mt-2">
                      <SelectDropdown
                        label="Rooms"
                        value={noOfRoomList}
                        onChange={handleNumberRoom}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flt-rt">
                <Button

                  disabled={disableButton}
                  onClick={fetchHotel}
                  btname="Search Hotel" />
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
              <HotelList hotelSearchData={searchData} hotels={hotels} checkInDate={checkInDate} checkOutDate={checkOutDate} guestsCount={guestsCount} roomCount={roomCount} />
            </div> : <Information />}
          </div>
        </div>
      </div>
    </div>
  );
}

SearchHotel.propTypes = {};
export default SearchHotel;
