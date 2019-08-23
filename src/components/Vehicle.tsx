import React from 'react';

import TAXI_PNG from "../images/taxi.png";
import "./css/Vehicle.css";


const Vehicle = (props: any) => (
    <div className="vehicle">
        <img src={TAXI_PNG} />
        {props.brand}
    </div>

);

export default Vehicle;