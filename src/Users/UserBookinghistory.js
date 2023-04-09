import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { useState } from "react";
import "./userBookinghistory.css";


export default function UserBookinghistory() {

  let loggedinUser = sessionStorage.getItem("user-info");
  console.log("logged in user in booking history", loggedinUser);
  let id = JSON.parse(loggedinUser).id;
  console.log("logged in user id", id);
  const [userbookinghistory, setuserbookinghistory] = useState([]);

  let data = userbookinghistory;
  console.log("data in flight status : ", data);
  const [value, setValue] = useState("Flight");
  //on load of form
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {

    const result = await axios.get(`http://localhost:8080/userbookinghistory/${id}`);
    // setUser(result.data);
    //console.log("User history :" + JSON.stringify(result.data));
    setuserbookinghistory(result.data);
  };

  const getSource = (flight) => {
    //return flight.segments[0].departure.iataCode
    return flight.departureCityName;
  }

  const getDestination = (flight) => {
    // return flight.segments[flight.segments.length - 1].arrival.iataCode
    return flight.arrivalCityName;
  }

  const getStartTime = (flight) => {
    //return flight.segments[0].departure.at;
    return flight.departureDate;
  }

  const getEndTime = (flight) => {
    // return flight.segments[flight.segments.length - 1].arrival.at;
    return flight.arrivalDate + " " + flight.arrivalTime;
  }

  const getTimings = (flight) => {
    return getStartTime(flight) + " - " + getEndTime(flight);
  }

  const getDuration = (flight) => {
    let start = new Date(getStartTime(flight)).valueOf();
    let end = new Date(getEndTime(flight)).valueOf();
    var delta = Math.abs(end - start) / 1000;
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    return hours + " hours " + minutes + " minutes";

  }

  const getPrice = (flight) => {
    return flight.price;
  }

  const getMiles = (flight) => {
    return flight.miles;
  }

  const getModifiedDate = (date) => {

    const new_date = date.split("T");
    return new_date[0];
  }

  const isValid = () => {
    if (userbookinghistory.hasOwnProperty("flights") && userbookinghistory.flights !== null && userbookinghistory.flights.length !== 0) {
      return true;
    }
    return false;
  }

  const isValidHotel = () => {
    if (userbookinghistory.hasOwnProperty("hotels") && userbookinghistory.hotels !== null && userbookinghistory.hotels.length !== 0) {
      return true;
    }
    return false;
  }

  const isValidDeal = () => {
    
    if (userbookinghistory.hasOwnProperty("deals") && userbookinghistory.deals !== null && userbookinghistory.deals.length !== 0) {
      return true;
    }
    return false;
  }

  return (
    <div className="list-hotel">
      <Card style={{ margin: 10 }}>
        <CardContent>
          <div className="row">
            <center><h1 className="Title">Booking History</h1></center>

          </div>
        </CardContent>
      </Card>
      <Card style={{ margin: 10 }}>
        <CardContent>
          {

            <TabContext value={value}>

              <Tabs
                initialSelectedIndex="Flight"
                value={value}
                textColor="primary"
                indicatorColor="primary"
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <Tab label="Flight" value="Flight" />
                <Tab label="Hotel" value="Hotel" />
                <Tab label="Deal" value="Deal" />

              </Tabs>

              <div className='col-md-12'>
                <TabPanel value="Flight">
                  <div className="list-flight">
                    {!isValid() ?
                      <div>No flight booking found</div> :
                      userbookinghistory.flights.map((flight, i) => {
                        return (
                          <Card style={{ margin: "10px" }} className="card-list" key={i} id={i}>
                            <CardContent key={i}>
                              <div className="flex-container">
                                <div>
                                  <h5 id={i}>{getSource(flight)}</h5>
                                  <p>{getModifiedDate(flight.departureDate)}</p>
                                </div>
                                <div>
                                  <h5>{getDestination(flight)}</h5>
                                 {/* <p>{getEndTime(flight)}</p> */}

                                </div>
                                <div>
                                  <h5>{flight.airline}</h5>
                                  {/*<p>{getDuration(flight)}</p>*/ }

                                </div>
                                <div>
                                  <h5>${getPrice(flight)}</h5>
                                  <p>{getMiles(flight)} miles</p>



                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                  </div>


                </TabPanel>
                <TabPanel value="Hotel">

                  {!isValidHotel() ?
                    <div>No hotel bookings found</div> :
                    userbookinghistory.hotels.map((hotel, i) => {
                      return (
                        <Card style={{ margin: "10px" }} className="card-list" key={i} id={i}>
                          <CardContent key={i}>
                            <div className="flex-container">
                              <div>
                                <h5 id={i}>{hotel.hotelname}</h5>
                                <p>{hotel.destination}</p>
                              </div>
                              <div>
                                <h5>{getModifiedDate(hotel.checkindate)}</h5>
                                <p>{hotel.guestcount} Travelers</p>

                              </div>
                              <div>
                                <h5>{getModifiedDate(hotel.checkoutdate)}</h5>
                                <p>{hotel.roomcount} Rooms</p>

                              </div>
                              <div>
                                <h5>${hotel.totalprice}</h5>
                               
                                


                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}

                </TabPanel>

                <TabPanel value="Deal">
                <div className="list-flight">
                    {!isValidDeal() ?
                      <div>No deals found</div> :
                      userbookinghistory.deals.map((deal, i) => {
                        return (
                          <Card style={{ margin: "10px" }} className="card-list" key={i} id={i}>
                            <CardContent key={i}>
                              <div className="flex-container">
                                <div>
                                  <h5 id={i}>{deal.departureCityName}</h5>
                                  <p>{getModifiedDate(deal.departureDate)}</p>
                                </div>
                                <div>
                                  <h5>{deal.arrivalCityName}</h5>
                                  <p>{getModifiedDate(deal.arrivalDate)}</p>

                                </div>
                                <div>
                                  <h5>{deal.airline}</h5>
                                  {/*<p>{getDuration(flight)}</p>*/ }

                                </div>
                                <div>
                                  <h5>${deal.deals_price}</h5>
                                  {/* <p>{deal.miles} miles</p> */}



                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                  </div>

                    
                </TabPanel>

              </div>


            </TabContext>
          }
        </CardContent>
      </Card>

    </div>
  );

}
