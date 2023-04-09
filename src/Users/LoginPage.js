import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function LoginPage() {
  let navigate = useNavigate();
  // const {SetloggedInUser} = useContext(UserContext);
  let { hotelId } = useParams();
  let ishotelIdAvailable = hotelId !== undefined ? true : false;

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = loginData;
  const onInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    // setUser({...user.cards,cards});
  };



  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:8080/userlogin", loginData);
      if (response.data.message !== undefined) {
        alert(response.data.message);
      }
      else {
        sessionStorage.setItem("user-info", JSON.stringify(response.data));
        // console.log(sessionStorage.getItem("flight-data"));
        let flightdata = JSON.parse(sessionStorage.getItem("flight-data"));
        let dealdata = JSON.parse(sessionStorage.getItem("deal-data"));
        let hoteldata = JSON.parse(sessionStorage.getItem("hotel-data"));
        let passengerCount = JSON.parse(sessionStorage.getItem("passenger-count"));
        if (flightdata !== null && hoteldata !== null) {
          navigate(`/flighthotelbooking/${hoteldata.checkInDate}/${hoteldata.checkOutDate}/${hoteldata.guestsCount}/${hoteldata.roomCount}/${hotelId}`);
          sessionStorage.removeItem("hotel-data");
          sessionStorage.removeItem("flight-data");
          sessionStorage.removeItem("passenger-count");
        }
        else if (flightdata !== null) {
          //go to flight details page
          navigate(`/flightdetails/${flightdata.id}/${passengerCount}`);
          sessionStorage.removeItem("flight-data");
          sessionStorage.removeItem("passenger-count");
        } else if (dealdata !== null) {
          //go to deal details page
          navigate(`/usermiles/${dealdata.id}/${passengerCount}`);
          sessionStorage.removeItem("deal-data");
          sessionStorage.removeItem("passenger-count");
        } else if (hoteldata !== null) {
          // let hotelIdSelected =  JSON.parse(sessionStorage.getItem("hotelIdSelected"));
          //go to deal details page
          // <HotelList hotels={hoteldata.hotels} 
          // checkInDate={hoteldata.checkInDate}
          //  checkOutDate={hoteldata.checkOutDate}
          //   guestsCount={hoteldata.guestsCount} 
          //   roomCount={hoteldata.roomCount} />
          // navigate(`/hotels/${JSON.stringify(hoteldata)}`);
          navigate(`/hotelbooking/${hoteldata.checkInDate}/${hoteldata.checkOutDate}/${hoteldata.guestsCount}/${hoteldata.roomCount}/${hotelId}`);
          //navigate(`/hote/${hoteldata.id}/${passengerCount}`);
          sessionStorage.removeItem("hotel-data");
        }
        else {
          navigate('/searchFlight');
        }

      }

    } catch (error) {
      console.log(`ERROR: ${error}`);
    }

  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'> Login </h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'> Username </label>
              <input
                type={"text"}
                className="form-control"
                placeholder='Enter your username'
                name='username'
                required
                value={username}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor='password' className='form-label'> Password </label>
              <input
                type={"password"}
                className="form-control"
                placeholder='Enter your password'
                name='password'
                required
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type='submit' className='btn btn-outline-primary' >Submit</button>
            <Link type='cancel' className='btn btn-outline-danger mx-2' to={"/searchFlight"}>Cancel</Link>

            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary">
                {ishotelIdAvailable ?
                  <Link to={
                    {
                      pathname: `/register/${hotelId}`
                    }
                  }
                  >Sign Up </Link>
                  :

                  <Link to={"/register"}>Sign Up </Link>
                }
                {/* <Link to={"/register"}>Sign Up </Link> */}
              </span>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
