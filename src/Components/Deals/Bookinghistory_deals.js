import React from 'react';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import "../Flights/bookinghistory.css";
import { getDealsById } from '../Deals/deals-service';
import { useParams } from "react-router-dom";


function BookinghistoryDeals() {

    const { id } = useParams()
    let data = getDealsById(id);
    let deals = data.length == 1 ? data[0] : {};

    return (
        <div>
            <Card style={{ margin: 10 }}>
                <CardContent><div>Purchased Deals</div></CardContent>
            </Card>
            
            <Card style={{ margin: 10 }}>
                <CardContent>
                    <div className='row brdr-btm'>

                    <div className="col-md-12">
                            <div className="title">
                                <span className="fromto">{deals.departureCityName}</span>
                                {"-"}
                                <span>{deals.arrivalCityName}</span>
                                </div>

                        </div>


                        <div className='col-md-12'>
                            <div className="brdr-btm">
                                <span>Departure</span>{": "}
                                
                                <span>{deals.departureTime}</span>
                                <span>{"("}</span><span>arrives {deals.deals_price} </span><span>{")"}</span>

                            </div>
                        </div>

                        
                        <div className='col-md-12'>
                            <div className="brdr-btm">
                                <span>Journey in </span>{": "}
                                
                                <span></span>
                                <span>{"("}</span><span> </span><span>{")"}</span>

                            </div>
                        </div>
                      
                 
                    </div>
                    
                </CardContent>
            </Card>
        </div>
    );
}

export default BookinghistoryDeals;