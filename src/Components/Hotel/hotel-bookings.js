import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import "./hotel-bookings.css";
// import { getHotelById } from './hotel-service';
import {getHotelById} from './hotel-service';
import React, { useEffect, useState } from "react";

function HotelBooking(props) {
    //getting logged in user from local storage
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

    const { id } = useParams();
    const { checkindate } = useParams();
    const { checkoutdate } = useParams();
    const { guestcount } = useParams();
    const { roomcount } = useParams();

    const [value, setValue] = useState("Debit/Credit Card");
    // Use Navigate
    const navigate = useNavigate();
    let data = getHotelById(id);
    let hotel = data.length === 1 ? data[0] : {};
    const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const days = dayDifference(checkindate, checkoutdate);
    const price = days * roomcount * hotel.offers[0].price.base;
    const tax = price * 0.15;
    const total_price = price + tax;


    function dayDifference(date1, date2) {
        const diffInMs = new Date(date2) - new Date(date1);
        let diffInDays = diffInMs / MILISECONDS_PER_DAY;
        if (diffInDays === 0) {
            diffInDays = 1;
        }
        return diffInDays;
    }
    const [hotelSelectedData] = useState({
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
    


    // get days using actual date define function
   


    const showSuccessPopup = async (e) => {
        e.preventDefault();
        try {

            let response = await axios.post(
                `http://localhost:8080/bookhotel/${userid}`,
                hotelbookingData
            );
            console.log("response in book flight ", response.data);
            alert("Booking Successful!");
            sessionStorage.removeItem("hotel-data");
            sessionStorage.setItem("user-info",JSON.stringify(response.data.user));
            navigate('/hotels');
        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    };


    return (
        <div className='container'>
            <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                    <Card style={{ margin: 10 }}>
                        <CardContent>
                            <div className="row">
                                <h2>Secure booking — only takes 2 minutes!</h2>
                            </div>
                        </CardContent>
                    </Card>
                    <Card style={{ margin: 10 }}>
                        <CardContent>
                            <form>
                                <div className='mb-3'>


                                    <div class='required-field'>
                                        <label htmlFor='firstname' className='form-label'>First name</label>
                                    </div>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder='(eg : John)'
                                        name='firstName'
                                        value={firstName}
                                        onChange={(e) => onInputChange(e)}

                                    />
                                    <div class='required-field'>
                                        <label htmlFor='lastName' className='form-label'> Last name </label>
                                    </div>

                                    <input
                                        type={"text"}
                                        className="form-control"
                                        placeholder='(eg : Smith)'
                                        name='lastName'
                                        value={lastName}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    
                                </div>
                            </form>
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
                    <h1>{hotel.hotel.name}</h1>
                    <img src={hotel.hotel.photo2} alt="" className="isImg" />
                    <span>Property 1: {hotel.offers[0].room.typeEstimated.category}, {hotel.offers[0].room.typeEstimated.bedType}</span>
                    <span>Check-in: {checkindate}</span>
                    <span>Check-out: {checkoutdate}</span>
                    <span>Travelers: {guestcount}</span>
                    <h1>Price Details</h1>
                    <span>{roomcount} room * {days} night : ${price}</span>
                    <span>Taxes and fees :   ${tax}</span>
                    <span>Total  :     ${total_price}</span>


                </div>
            </div>
        </div>

    );

}

export default HotelBooking;