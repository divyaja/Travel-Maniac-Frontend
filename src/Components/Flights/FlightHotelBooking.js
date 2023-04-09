import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { AddBox, Delete } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
// import "./hotel-bookings.css";
import "../Hotel/hotel-bookings.css";
import { getHotelById } from '../Hotel/hotel-service';
import React, { useEffect, useState } from "react";

export default function FlightHotelBooking() {

    //getting logged in user from local storage
    let navigate = useNavigate();
    let loggedinUser = JSON.parse(sessionStorage.getItem("user-info"));
    console.log("logged in user in book form", loggedinUser);
    const userData = loggedinUser;
    let userid = userData.id;
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
    });
    const [card, setCard] = useState({});
    const { firstName, lastName } = user;
    const { cardNumber, cardOwnerName, cvv, expiryDate, cardType } = card;
    const [passengerlist, setPassengerList] = useState([
        { firstName: "", lastName: "" },
    ]);

    const { id } = useParams();
    const { checkindate } = useParams();
    const { checkoutdate } = useParams();
    const { guestcount } = useParams();
    const { roomcount } = useParams();

    let data = getHotelById(id);
    let hotel = data.length == 1 ? data[0] : {};
    let flight = JSON.parse(sessionStorage.getItem("flight-data"));
    let noOfPassengers = JSON.parse(sessionStorage.getItem("passenger-count"));
    const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const days = dayDifference(checkindate, checkoutdate);
    const price = days * roomcount * hotel.offers[0].price.base;
    const tax = price * 0.15;
    const total_price = price + tax;


    function dayDifference(date1, date2) {
        const diffInMs = new Date(date2) - new Date(date1);
        const diffInDays = diffInMs / MILISECONDS_PER_DAY;
        if (diffInDays === 0) {
            diffInDays = 1;
        }
        return diffInDays;
    }
    const [hotelSelectedData, sethotelSelectedData] = useState({
        destination: hotel.hotel.cityCode,
        checkindate: checkindate,
        checkoutdate: checkoutdate,
        guestcount: guestcount,
        roomcount: roomcount,
        totalprice: total_price,
        hotelname: hotel.hotel.name,
        hotelid: hotel.hotelId
    });
    const [hotelbookingData, sethotelBookingData] = useState({
        userData: user,
        cardData: userData.cards.filter((obj) => obj.default === true)[0],
        // hotelData: hotel,
        hotelSelectedData: hotelSelectedData
    });
    const handleremove = (index) => {
        const list = [...passengerlist];
        list.splice(index, 1);
        setPassengerList(list);
        // setBookingData(...bookingData.passengerData,list);
    };

    const handleaddclick = () => {
        setPassengerList([...passengerlist, { firstName: "", lastName: "" }]);
    };

    const [bookingData, setBookingData] = useState({
        flightData: flight,
        passengerData: passengerlist,
    });

    const handleinputchange = (e, index) => {
        const { name, value } = e.target;
        const list = [...passengerlist];
        list[index][name] = value;
        setPassengerList(list);
        // setBookingData(...bookingData.passengerData,list);
        setBookingData({
            ...bookingData,
            ...{ passengerData: { ...bookingData.passengerData, list } },
        });
    };

    const [value, setValue] = useState("Debit/Credit Card");

    const onCardInputChange = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        // need to set booking data here
        sethotelBookingData({ ...hotelbookingData, ...{ userData: { ...hotelbookingData.userData, [e.target.name]: e.target.value } } });
    };

    //on load of form
    useEffect(() => {
        loadUser();
        // refreshBookingData();
    }, []);

    const loadUser = async () => {
        //const result = await axios.get(`http://localhost:8080/user/${id}`);
        // console.log("logged in user card info : ",userData.cards.filter((obj) => obj.default === true));
        setCard(userData.cards.filter((obj) => obj.default === true)[0]);
        setUser(userData);
    };
    const showSuccessPopup = async (e) => {
        e.preventDefault();
        try {

            let hotelResponse = await axios.post(
                `http://localhost:8080/bookhotel/${userid}`,
                hotelbookingData
            );
            console.log("response in book hotel ", hotelResponse.data);

            let flightResponse = await axios.post(
                `http://localhost:8080/bookflight/${userid}`,
                bookingData
            );
            console.log("response in book flight ", flightResponse.data);
            alert("Booking Successful!");
            sessionStorage.removeItem("flight-data");
            sessionStorage.setItem("user-info", JSON.stringify(flightResponse.data.user));
            navigate('/searchFlight');
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    };


    return (
        <div className='container'>
            <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                    {/* <Card style={{ margin: 10 }}>
                        <CardContent>
                            <div className="row">
                                <h2>Secure booking — only takes 2 minutes!</h2>
                            </div>
                        </CardContent>
                    </Card> */}
                    <Card style={{ margin: 10 }}>
                        <CardContent>
                            <h5>Add passenger information</h5>

                            {passengerlist.map((x, i) => {
                                return (
                                    <div key={i} className="row mb-3"><span><h6>Passenger {i + 1}</h6>
                                    </span>
                                        <div className="form-group col-md-4">
                                            <label className="required-field">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                className="form-control"
                                                placeholder="Enter First Name"
                                                onChange={(e) => handleinputchange(e, i)}
                                            />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label className="required-field">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                className="form-control"
                                                placeholder="Enter Last Name"
                                                onChange={(e) => handleinputchange(e, i)}
                                            />
                                        </div>
                                        <div className="form-group col-md-2 mt-4">
                                            {passengerlist.length !== 1 && (
                                                <button
                                                    className="btn btn-danger mx-1"
                                                    onClick={() => handleremove(i)}
                                                    style={{ marginBottom: 10 }}
                                                >
                                                    <Delete />
                                                </button>
                                            )}
                                            {passengerlist.length - 1 === i && (
                                                <button
                                                    className="btn btn-success"
                                                    onClick={handleaddclick}
                                                >
                                                    <AddBox />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                    <TabContext value={value}>
                        <Paper square>
                            <Tabs
                                initialSelectedIndex="Debit/Credit Card"
                                value={value}
                                textColor="primary"
                                indicatorColor="primary"
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            >
                                <Tab label="Debit/Credit Card" value="Debit/Credit Card" />
                            </Tabs>
                            <TabPanel value="Debit/Credit Card">
                                <form>
                                    <div className='mb-3'>
                                        <div class='required-field'>
                                            <label htmlFor='cardOwnerName' className='form-label'>Name on Card </label>
                                        </div>
                                        <input
                                            type={"text"}
                                            className="form-control brdr-top"
                                            name='cardOwnerName'
                                            value={cardOwnerName}
                                            onChange={(e) => onCardInputChange(e)}
                                        />
                                        <div class='required-field'>
                                            <label htmlFor='cardType' className='form-label'>Card Type</label>
                                        </div>

                                        <select value={cardType}
                                            className="form-control"
                                            name='cardType'
                                            onChange={(e) => onCardInputChange(e)}
                                        >
                                            <option value="VISA">VISA</option>
                                            <option value="MASTERCARD">MASTER CARD</option>
                                        </select>
                                        <div class='required-field'>
                                            <label htmlFor='cardNumber' className='form-label'>Debit/Credit card number </label>
                                        </div>
                                        <input
                                            type={"number"}
                                            className="form-control"
                                            name='cardNumber'
                                            minLength={16}
                                            maxLength='16'
                                            value={cardNumber}
                                            onChange={(e) => onCardInputChange(e)}
                                        />
                                        <div class='required-field'>
                                            <label htmlFor='expiryDate' className='form-label'>Expiration date </label>
                                        </div>
                                        <input
                                            type={"month"}
                                            className="form-control"
                                            name='expiryDate'
                                            value={expiryDate}
                                            onChange={(e) => onCardInputChange(e)}
                                        />
                                        <div class='required-field'>
                                            <label htmlFor='cvv' className='form-label'>Security code </label>
                                        </div>
                                        <input
                                            type={"number"}
                                            minLength={3}
                                            maxLength='3'
                                            className="form-control"
                                            name='cvv'
                                            value={cvv}
                                            onChange={(e) => onCardInputChange(e)}
                                        />
                                        <div className="text-center">
                                            {" "}
                                            <Link
                                                className="mt-2 btn  btn btn-outline-primary"
                                                onClick={showSuccessPopup}
                                                label="Continue"
                                            >
                                                Continue
                                            </Link>
                                        </div>

                                    </div>
                                </form>
                            </TabPanel>
                        </Paper>
                    </TabContext>
                </div>
                <div className="hotelDetailsPrice">
                    <h1 className="text-bold text-center">Review Flight and Hotel</h1>
                    <h1>{flight.airline}</h1>
                    <span>From: {flight.departureCityName}</span>
                    <span>To: {flight.arrivalCityName}</span>
                    <span>Departure Date: {flight.departureDate}({flight.departureTime})</span>
                    <span>Arrival Date: {flight.arrivalDate}({flight.arrivalTime})</span>
                    <h1>{hotel.hotel.name}</h1>
                    <span>Property 1: {hotel.offers[0].room.typeEstimated.category}, {hotel.offers[0].room.typeEstimated.bedType}</span>
                    <span>Check-in: {checkindate}</span>
                    <span>Check-out: {checkoutdate}</span>
                    <span>Travelers: {guestcount}</span>
                    <h1>Price Details</h1>
                    <span>Passenger Count : {noOfPassengers}</span>
                    <span>Flight Price: ${flight.price * noOfPassengers}</span>
                    <span>Tax: ${noOfPassengers * flight.price * 0.15}</span>
                    <span>Hotel Price: {roomcount} room * {days} night : ${price}</span>
                    <span>Taxes and fees :   ${tax}</span>
                    <span>Discount: ${(total_price + flight.price * 0.15 + flight.price) * 0.2}</span>
                    <span>Total  :     ${(total_price + flight.price * 0.15 * noOfPassengers + flight.price * noOfPassengers) - (total_price + flight.price * noOfPassengers * 0.15 + flight.price * noOfPassengers) * 0.2}</span>



                </div>
            </div>
        </div>
    )
}
