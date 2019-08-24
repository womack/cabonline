import React from "react";

import TAXI_PNG from "../images/taxi.png";
import "./css/Vehicle.css";

const Vehicle = (props: {brand: string, lat: number, lng: number}) => (
    <div className="vehicle">
        <img src={TAXI_PNG} alt="taxi"/>
        {props.brand}
    </div>
);

export default Vehicle;