import React from 'react';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import "./bookinghistory.css";


function Bookinghistory(props) {
    return (
        <div>
            <Card style={{ margin: 10 }}>
                <CardContent><div>Upcoming Trips</div></CardContent>
            </Card>
            
            <Card style={{ margin: 10 }}>
                <CardContent>
                    <div className='row brdr-btm'>
                    <div className='col-md-12'>
                    <div className="col-md-4" style={{display: "inline-block"}}>
                        <span>TUE 20 DEC 2022</span>
                        <span>{"Houston"}, {"TX"}</span>
                        "-"
                        <span>{"Chennai"}, {"TN"}</span>
                    </div>
                    <div className="col-md-4" style={{display: "inline-block"}}>
                       <span>G92E72</span>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 brdr-rt">
                            <span>IAH-MAA</span>
                            <div>Depart in 40 days</div>
                        </div>
                        <div className='col-md-9'>
                            <div>IAH-MAA</div>
                            <div>Tue 20 Dec 2022</div>
                            <div>Departs 4:40pm</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Bookinghistory;