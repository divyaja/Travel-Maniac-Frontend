import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { getHotelById } from './hotel-service';
import "./hoteldetails.css";


function HotelDetails(props) {

    //getting logged in user from local storage
    let loggedinUser = JSON.parse(localStorage.getItem("user-info"));

    const { id } = useParams();
    const { checkindate } = useParams();
    const { checkoutdate } = useParams();
    const { guestcount } = useParams();
    const { roomcount } = useParams();
    
    console.log("Hotel Id : ", id);
    //console.log("No of guests : ");
    let data = getHotelById(id);
    let hotel = data.length == 1 ? data[0] : {};
    console.log("hotel details", hotel);
    const [value, setValue] = useState("Overview");
   /* const fetchHotelOffers = async () => {
        let request = {
            
            'hotelId': id
        }
        
        let results = await getHotelOffers(request);
        let data = results.data;
        return data;
    }

    let data = fetchHotelOffers(); 
    let hotel = data.length == 1 ? data[0] : {};
    //check whether data is valid or not, array should not be empty
    console.log("hotel details" , hotel); */
    
    return (
        <div className='container'>
            <div className='row'>
            <Card>
                <CardContent>
                <div className="row">
                        <div className="column">
                            <img src = {hotel.hotel.photo2}  alt = "image1"/>
                        </div>
                        <div className="column" style={{ display: "inline-block" }}>
                            <img src = {hotel.hotel.photo3}  alt = "image2"/>
                        </div>
                        <div className="column" style={{ display: "inline-block" }}>
                            <img src = {hotel.hotel.photo4}  alt = "image3"/>
                        </div>
                </div>
                </CardContent>
            </Card>
                    
            </div>
            
            <div>
    
        <h2>{hotel.hotel.name}</h2>
        <Link to={{ pathname: `/hotelbooking/${checkindate}/${checkoutdate}/${roomcount}/${guestcount}/${id}` }} style={{ float: 'right', margin: '10px'}} className='btn btn-primary'>Reserve</Link>
        <TabContext value={value}>
        <Paper square>
            <Tabs
            initialSelectedIndex="Overview"
            value={value}
            textColor="primary"
            indicatorColor="primary"
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            >
            <Tab label="Overview" value="Overview"/>
            <Tab label="Prices" value="Prices" />
            <Tab label="Amenities" value="Amenities" />
            <Tab label="Policies" value="Policies" />
            </Tabs>

            <div className='col-md-12'>
                <TabPanel value="Overview">
                    <div>{hotel.hotel.name}</div>
                    <div>{hotel.offers[0].room.description.text}</div>
                </TabPanel>
                <TabPanel value="Prices">
                <span>{hotel.offers[0].price.base}</span>
                <span>{hotel.offers[0].price.currency}</span>
                </TabPanel>
                <TabPanel value="Amenities">{hotel.offers[0].room.description.text}</TabPanel>
                <TabPanel value="Policies">{hotel.hotel.name}</TabPanel>
            </div>
            
        </Paper>
        </TabContext>
        
      
    </div>
    </div>
        
    );
}

export default HotelDetails;