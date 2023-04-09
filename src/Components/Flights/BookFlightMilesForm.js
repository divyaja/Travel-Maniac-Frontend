import { AddBox, Delete } from '@mui/icons-material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./flight-form.css";
import { getFlightById } from "./flight-service";


export default function BookFlightMilesForm() {
    let navigate = useNavigate();
    //getting logged in user from local storage
    let loggedinUser = JSON.parse(sessionStorage.getItem("user-info"));
    console.log("logged in user in book form", loggedinUser);
    const userData = loggedinUser;
    let userid = userData.id;

    //getting params from url
    const { id, pc } = useParams();
    console.log("data in Flight details page: ", id);
    let data = getFlightById(id);
    let flight = data.length === 1 ? data[0] : {};

    flight.price = pc * flight.price;
    flight.miles = pc * flight.miles;
    console.log("flight details in book form : ", flight);

    // const [card, setCard] = useState({});
    // const { cardNumber, cardOwnerName, cvv, expiryDate, cardType } = card;
    const [passengerlist, setPassengerList] = useState([
        { firstName: "", lastName: "" },
    ]);
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
        setBookingData({...bookingData,
            ...{ passengerData: { ...bookingData.passengerData, list } },
        });
    };

    const handleremove = (index) => {
        const list = [...passengerlist];
        list.splice(index, 1);
        setPassengerList(list);
        // setBookingData(...bookingData.passengerData,list);
    };

    const handleaddclick = () => {
        setPassengerList([...passengerlist, { firstName: "", lastName: "" }]);
    };
    //on load of form
    useEffect(() => {
        loadUser();
        // refreshBookingData();
    }, []);
    // function refreshBookingData(){
    //   setBookingData(...bookingData.passengerData,passengerlist);

    // }

    const loadUser = async () => {
        //const result = await axios.get(`http://localhost:8080/user/${id}`);
        // console.log("logged in user card info : ",userData.cards.filter((obj) => obj.default === true));
        // setCard(userData.cards.filter((obj) => obj.default === true)[0]);
    };

    // const onCardInputChange = (e) => {
    //     setCard({ ...card, [e.target.name]: e.target.value });
    // };
    const showSuccessPopup = async (e) => {
        e.preventDefault();
        try {
            //call flight booking api and send flight object data along with user data
            console.log(bookingData);
            let response = await axios.post(
                `http://localhost:8080/bookflightmiles/${userid}`,
                bookingData
            );
            console.log("response in book flight with miles ", response.data);
            alert("Booking Successful!");
            sessionStorage.setItem("user-info", JSON.stringify(response.data.user));
            navigate('/searchFlight');

        } catch (error) {
            console.log(`ERROR: ${error}`);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
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
                    {/* <div>
                        {" "}
                        <h5> Card Information </h5>
                    </div> */}
                    {/* <label htmlFor="cardOwnerName" className="form-label">
                        Name on Card{" "}
                    </label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder="Enter name on the credit card"
                        name="cardOwnerName"

                        value={cardOwnerName}
                        onChange={(e) => onCardInputChange(e)}
                    />

                    <div className="add-space"></div>
                    <div className="row">
                        <div class="col s12 m6">
                            <label htmlFor="cardNumber" className="form-label">
                                Card Number{" "}
                            </label>
                            <input
                                type={"number"}
                                className="form-control"
                                placeholder="Enter credit card number"
                                name="cardNumber"

                                value={cardNumber}
                                onChange={(e) => onCardInputChange(e)}
                            />
                        </div>
                        <div class="col s12 m6">
                            <label htmlFor="cardType" className="form-label">
                                Card Type
                            </label>
                            <select
                                value={cardType}
                                className="form-control"

                                name="cardType"
                                onChange={(e) => onCardInputChange(e)}
                            >
                                <option value="VISA">VISA</option>
                                <option value="MASTERCARD">MASTER CARD</option>
                            </select>
                        </div>
                    </div>

                    <div className="add-space"></div>
                    <div className="row">
                        <div class="col s12 m6">
                            <label htmlFor="expiryDate" className="form-label">
                                Expiry Date{" "}
                            </label>
                            <input
                                type={"month"}
                                className="form-control"
                                placeholder="Enter credit card expiry in mm/yy format"
                                name="expiryDate"
                                value={expiryDate}
                                // disabled
                                onChange={(e) => onCardInputChange(e)}
                            />
                        </div>
                        <div class="col s12 m6">
                            <label htmlFor="cvv" className="form-label">
                                CVV{" "}
                            </label>
                            <input
                                type={"number"}
                                minLength={3}
                                maxLength="3"
                                className="form-control"
                                placeholder="Enter cvv"
                                name="cvv"
                                value={cvv}
                                // disabled
                                onChange={(e) => onCardInputChange(e)}
                            />
                        </div>
                    </div> */}
                    <div className="add-space"></div>
                    <div className="text-center">
                        {" "}
                        <Link
                            className="mt-2 btn  btn btn-outline-primary"
                            // to="/Bookinghistory"
                            onClick={showSuccessPopup}
                            label="Continue"
                        >
                            Continue
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


