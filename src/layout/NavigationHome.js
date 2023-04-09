import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavigationHome() {
  // const { loggedinUser, SetloggedInUser } = useContext(UserContext);
  let loggedinUser = JSON.parse(sessionStorage.getItem("user-info"));
  console.log("Logged in user in Navigation bar ", loggedinUser);
  let navigate = useNavigate();

  function logOut() {
    //SetloggedInUser(null);
    sessionStorage.clear();
    // sessionStorage.removeItem("user-info");
    // sessionStorage.removeItem("flight-data");
    // sessionStorage.removeItem("deal-data");
    // sessionStorage.removeItem("passenger-count");
    navigate("/searchFlight");
  }

  function bookingHistory() {
    navigate("/userbookinghistory");
  }

  return (
    <div>
      {/* <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href='/searchFlight'>Travel-Easy</Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            loggedinUser ?
                                <>
                                    <Nav.Link href='/searchFlight'>Flights</Nav.Link>
                                    <Nav.Link href="/hotels">Hotels</Nav.Link>
                                    <Nav.Link href="/deals">Deals</Nav.Link>
                                    <Nav.Link href="/flightstatus">Flight Status</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link href='/searchFlight'>Flights</Nav.Link>
                                    <Nav.Link href="/hotels">Hotels</Nav.Link>
                                    <Nav.Link href="/deals">Deals</Nav.Link>
                                    <Nav.Link href="/flightstatus">Flight Status</Nav.Link>
                                    <Nav.Link href="/loginuser" className="justify-content-end">Login</Nav.Link>
                                    <Nav.Link href="/register" className="justify-content-end">Register</Nav.Link>
                                    
                                </>
                        }
                    </Nav>
                    {
                        loggedinUser ?
                            <Nav>
                                <Navbar.Collapse className="justify-content-end">
                                    <span className='bg-primary'>Miles Remaining {(loggedinUser
                                        && (loggedinUser.userMiles)
                                        && (loggedinUser.userMiles.milesRemaining)) ?
                                        loggedinUser.userMiles.milesRemaining
                                        : 0
                                    }</span>
                                    <NavDropdown title={loggedinUser && ((loggedinUser).firstName)}>
                                        <NavDropdown.Item onClick={bookingHistory}>
                                            Booking History
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={logOut}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Navbar.Collapse>
                            </Nav>
                            : null
                    }
                </Container>
            </Navbar> */}
      {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href='/searchFlight'>Travel-Easy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        {
                            loggedinUser ?
          <Nav className="me-auto">
            <Nav.Link href='/searchFlight'>Flights</Nav.Link>
                                    <Nav.Link href="/hotels">Hotels</Nav.Link>
                                    <Nav.Link href="/deals">Deals</Nav.Link>
                                    <Nav.Link href="/flightstatus">Flight Status</Nav.Link>
          </Nav>
          :
          <div>
          <Nav className="me-auto">
           <Nav.Link href='/searchFlight'>Flights</Nav.Link>
                                    <Nav.Link href="/hotels">Hotels</Nav.Link>
                                    <Nav.Link href="/deals">Deals</Nav.Link>
                                    <Nav.Link href="/flightstatus">Flight Status</Nav.Link>
                                    
          </Nav>

          <Nav>
           <Nav.Link href="/loginuser">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
          </div>
      }
        </Navbar.Collapse>
         {
                        loggedinUser ?
                            <Nav>
                                <Navbar.Collapse className="justify-content-end">
                                    <NavDropdown title={loggedinUser && ((loggedinUser).firstName)}>
                                        <NavDropdown.Item onClick={bookingHistory}>
                                            Booking History
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={logOut}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Navbar.Collapse>
                            </Nav>
                            : null
                    }
      </Container>
    </Navbar> */}
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Travel-Easy</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {loggedinUser ? (
              <Nav className="me-auto">
                <Nav.Link href="/searchFlight">Flights</Nav.Link>
                <Nav.Link href="/hotels">Hotels</Nav.Link>
                <Nav.Link href="/deals">Deals</Nav.Link>
                <Nav.Link href="/flightstatus">Flight Status</Nav.Link>
              </Nav>
            ) : (
              <>
                <Nav className="me-auto">
                  <Nav.Link href="/searchFlight">Flights</Nav.Link>
                  <Nav.Link href="/hotels">Hotels</Nav.Link>
                  <Nav.Link href="/deals">Deals</Nav.Link>
                  <Nav.Link href="/flightstatus">Flight Status</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="/loginuser">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
          {loggedinUser ? (
            <Nav>
              <Navbar.Collapse className="justify-content-end">
                <span className='bg-primary'>Miles Remaining {(loggedinUser
                  && (loggedinUser.userMiles)
                  && (loggedinUser.userMiles.milesRemaining)) ?
                  loggedinUser.userMiles.milesRemaining
                  : 0
                }</span>
                <NavDropdown title={loggedinUser && loggedinUser.firstName}>
                  <NavDropdown.Item onClick={bookingHistory}>
                    Booking History
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Nav>
          ) : null}
        </Container>
      </Navbar>
    </div>
  );
}
