import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import React from "react";
import { Link } from "react-router-dom";
import "./flightlist.css";

function FlightList(props) {

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
    return flight.departureDate +" "+ flight.departureTime;
  }

  const getEndTime = (flight) => {
   // return flight.segments[flight.segments.length - 1].arrival.at;
   return flight.arrivalDate+" "+flight.arrivalTime;
  }

  const getTimings = (flight) => {
    return getStartTime(flight) + " - " + getEndTime(flight);
  }
  // const getDuration = (flight) => {
  //   return getStartTime(flight) - getEndTime(flight);
  // }
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
    return hours +" hours "+minutes+" minutes";

  }

  const getPrice = (flight) => {
    return flight.price * props.noOfPassengers;
  }

  // const getStops = (flight) => {
  //   return flight.numberOfStops
  // }

  // const getDuration = (flight) => {
  //   let duration = parse(flight.duration);
  //   let value = "";
  //   if(duration.hasOwnProperty("days")){
  //     value = value + " "+duration.days +" day's"
  //   }
  //   if(duration.hasOwnProperty("hours")){
  //     value = value + " "+duration.hours +" Hour's"
  //   }
  //   if(duration.hasOwnProperty("minutes")){
  //     value = value + " "+duration.minutes +" Minutes's"
  //   }
  //   // return Math.round(Math.abs(end - start) / 36e5);
  //   return value;
  // }

  const isValid = () => {
    if (props.hasOwnProperty("flights") && props.flights.length !== 0) {
      return true;
    }
    return false;
  }

  return (
    <div className="list-flight">
      {!isValid() ?
        <div>No Flights Found</div> :
        props.flights.map((flight, i) => {
          return (
            <Card style={{ margin: "10px" }} className="card-list" key={i} id={i}>
              <CardContent key={i}>
                <div className="flex-container">
                  <div>
                    <h5 id={i}>{getSource(flight)}</h5>
                    <p>{getStartTime(flight)}</p>
                  </div>
                  <div>
                  <h5>{getDestination(flight)}</h5>
                    <p>{getEndTime(flight)}</p>
                    
                  </div>
                  <div>
                  <h5>{flight.airline}</h5>
                  <p>{getDuration(flight)}</p>
                    {/* <div>{getStops(flight)} stop's {getDuration(flight)}</div> */}
                  </div>
                  <div>
                    <h5>${getPrice(flight)}</h5>
                    {/* <Link to={{ pathname: "/flightdetails/'${this.props.testvalue}", state: { flight } }} className="btn btn-primary">Select</Link> */}
                    <Link to={{ pathname: `/flightdetails/${flight.id}/${props.noOfPassengers}` }} className="btn btn-primary" >Select</Link>

                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
    </div>
  );
}

export default FlightList;
