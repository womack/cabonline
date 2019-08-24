import React from "react";
import AddressInterface from "../interfaces/Address.interface";

import "./css/Address.css";

const Address = (props: { address: AddressInterface }) => {
    const { zipCode, streetName, city, countryCode, latitude, longitude } = props.address;

    return (
        <div className="address">
            <div><p>ZipCode: </p><span>{zipCode}</span></div>
            <div><p>Street Name:</p><span>{streetName}</span></div>
            <div><p>City:</p><span>{city}</span></div>
            <div><p>Country code:</p><span>{countryCode}</span></div>
            <div><p>Latitude:</p><span>{latitude}</span></div>
            <div><p>Longitude:</p><span>{longitude}</span></div>
        </div>
    );
};

export default Address;
