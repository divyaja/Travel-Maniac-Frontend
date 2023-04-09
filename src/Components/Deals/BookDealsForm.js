import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../Flights/flight-form";
import { getFlightById } from "../Flights/flight-service";
 
function DealsBookForm() {
  let navigate = useNavigate();
  //getting logged in user from local storage
  let loggedinUser = JSON.parse(sessionStorage.getItem("user-info"));
  console.log("logged in user in book form", loggedinUser);
  const userData = loggedinUser;
  let userid = userData.id;

  //getting params from url
  const { id } = useParams();
  console.log("flight id data in Book Deal page: ", id);
  let data = getFlightById(id);
  let dealData = data.length === 1 ? data[0] : {};

  //  flight.price = pc * flight.price;
  /* flight.miles = pc * flight.miles;
   console.log("flight details in book form : ", flight); */
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });
  const [card, setCard] = useState({});
  const { firstName, lastName } = user;
  const { cardNumber, cardOwnerName, cvv, expiryDate, cardType } = card;
  const [bookingData, setBookingData] = useState({
    userData: user,
    cardData: userData.cards.filter((obj) => obj.default === true)[0],
    deal:dealData
  });

  //on load of form
  useEffect(() => {
    loadUser();
    // refreshBookingData();
  }, []);
  // function refreshBookingData(){
  //   setBookingData(...bookingData.passengerData,passengerlist);

  // }

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${userid}`);
    console.log(
      "logged in user card info : ",
      userData.cards.filter((obj) => obj.default === true)
    );
    setCard(userData.cards.filter((obj) => obj.default === true)[0]);
    setUser(userData);
  };

  const onCardInputChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // need to set booking data here
    setBookingData({ ...bookingData, ...{ userData: { ...bookingData.userData, [e.target.name]: e.target.value } } });
  };
  const showSuccessPopup = async (e) => {
    e.preventDefault();
    try {
      //call flight booking api and send flight object data along with user data

      let response = await axios.post(
        `http://localhost:8080/bookdeal/${userid}`,
        bookingData
      );
      console.log(response);
      alert("Booking Successful!");
      sessionStorage.setItem("user-info",JSON.stringify(response.data.user));
      navigate('/deals');
    } catch (error) {
       console.log(`ERROR: ${error}`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <div className="m-4">
            <h5> User Information</h5>
            <div className="row">
              <div className="col s12 m6 ">
                <label
                  htmlFor="firstname"
                  className="form-label required-field"
                >
                  First Name{" "}
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your First Name"
                  name="firstName"
                  required
                  value={firstName}
                  onChange={(e) => onInputChange(e)}
                  // onChange = {(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col s12 m6">
                <label
                  htmlFor="lastName"
                  className="form-label required-field "
                >
                  {" "}
                  Last Name{" "}
                </label>
                <input
                  type={"text"}
                  className="form-control required-field"
                  placeholder="Enter your Last Name"
                  name="lastName"
                  required
                  value={lastName}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <div className="add-space"></div>

            <h5> Card Information </h5>
            <div className="row">
              <div className="col s12 m6">
                <label htmlFor="cardOwnerName" className="form-label">
                  Name on Card{" "}
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter name on the credit card"
                  name="cardOwnerName"
                  disabled
                  value={cardOwnerName}
                  onChange={(e) => onCardInputChange(e)}
                />
              </div>
            </div>
            <div className="add-space"></div>
            <div className="row">
              <div className="col s12 m6">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number{" "}
                </label>
                <input
                  type={"number"}
                  className="form-control"
                  placeholder="Enter credit card number"
                  name="cardNumber"
                  disabled
                  value={cardNumber}
                  onChange={(e) => onCardInputChange(e)}
                />
              </div>
              <div className="col s12 m6">
                <label htmlFor="cardType" className="form-label">
                  Card Type
                </label>
                <select
                  value={cardType}
                  className="form-control"
                  disabled
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
              <div className="col s12 m6">
                <label htmlFor="expiryDate" className="form-label">
                  Expiry Date{" "}
                </label>
                <input
                  type={"month"}
                  className="form-control"
                  placeholder="Enter credit card expiry in mm/yy format"
                  name="expiryDate"
                  value={expiryDate}
                  disabled
                  onChange={(e) => onCardInputChange(e)}
                />
              </div>
              <div className="col s12 m6">
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
                  disabled
                  onChange={(e) => onCardInputChange(e)}
                />
              </div>
            </div>
            <div className="add-space"></div>
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
        </div>
      </div>
    </div>
  );
}

export default DealsBookForm;
