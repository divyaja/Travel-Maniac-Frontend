import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import SearchDeals from './Components/Deals/SearchDeals';
import Feedback from './Components/Feedback/Feedbackform';
import BookForm from './Components/Flights/bookform';
import DealsBookForm from './Components/Deals/BookDealsForm';
import Bookinghistory from './Components/Flights/bookinghistory';
import Flightdetails from './Components/Flights/flightdetails';
import FlightStatus from './Components/Flights/FlightStatus';
import SearchFlight from './Components/Flights/searchflight';
import Usermiles from './Components/Flights/Usermiles';
import NavigationHome from './layout/NavigationHome';
import Home from './pages/Home';
import AddUser from './Users/AddUser';
import BookinghistoryDeals from './Components/Deals/Bookinghistory_deals';
import Hoteldetails from './Components/Hotel/hoteldetails';
import SearchHotel from './Components/Hotel/searchHotel';
import LoginPage from './Users/LoginPage';
import Dealsdetails from './Components/Deals/Dealsdetails';
import HotelBooking from './Components/Hotel/hotel-bookings';
import UserBookinghistory from './Users/UserBookinghistory';
import BookFlightMilesForm from './Components/Flights/BookFlightMilesForm';
import FlightHotelBooking from './Components/Flights/FlightHotelBooking';


function App() {
  return (
    <div className='TRAVEL EASY'>
      {/* <UserContext.Provider value={value}> */}
      <Router>
        <NavigationHome />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<AddUser />} />
          <Route exact path="/register/:hotelId" element={<AddUser />} />
          <Route exact path="/loginuser" element={<LoginPage />} />
          <Route exact path="/loginuser/:hotelId" element={<LoginPage />} />
          <Route exact path="/" element={<SearchFlight />} />
          <Route exact path="/searchFlight" element={<SearchFlight />} />
          <Route exact path="/flightdetails/:id/:pc" element={<Flightdetails />} />
          <Route exact path="/bookform/:id/:pc" element={<BookForm />} />
          <Route exact path="/bookdealform/:id" element={<DealsBookForm />} />
          <Route exact path="/usermiles/:id/:pc" element={<Usermiles />} />
          <Route exact path="/bookinghistory" element={<Bookinghistory />} />
          <Route exact path="/userbookinghistory" element={<UserBookinghistory />} />
          <Route exact path="/feedbackform" element={<Feedback />} />
          <Route exact path="/deals" element={<SearchDeals />} />
          <Route exact path="/flightstatus" element={<FlightStatus />} />
          <Route exact path="/hotels" element={<SearchHotel />} />
          
          {/* <Route exact path="/hoteldetails/:id" element={<Hoteldetails />} /> */}
          <Route exact path="/dealsdetails/:id" element={<Dealsdetails />} />
          <Route exact path="/bookinghistorydeals/:id" element={<BookinghistoryDeals />} />
           <Route exact path="/hoteldetails/:checkindate/:checkoutdate/:guestcount/:roomcount/:id" element={<Hoteldetails />} />
          <Route exact path="/dealsdetails/:id" element={<Dealsdetails />} />
		      <Route exact path="/hotelbooking/:checkindate/:checkoutdate/:guestcount/:roomcount/:id" element={<HotelBooking />} />
          <Route exact path="/bookFlightMiles/:id/:pc" element={<BookFlightMilesForm />} />
          <Route exact path="/flighthotelbooking/:checkindate/:checkoutdate/:guestcount/:roomcount/:id" element={<FlightHotelBooking />} />
          
        </Routes>
      </Router>
      {/* </UserContext.Provider> */}

    </div>

  );
}

export default App;