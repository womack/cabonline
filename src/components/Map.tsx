import React from "react";
import Vehicle from "./Vehicle";
import AddressInterface from "../interfaces/Address.interface";
import VehicleInterface from "../interfaces/Vehicle.interface";

import GoogleMapReact from "google-map-react";

import "./css/Map.css";

//Stockholm
const defaultLat = 59.329323;
const defaultLng = 18.068581;
const defaultZoom = 11;

const Map = (props: { selectedAddress: AddressInterface, vehicleList: VehicleInterface[] }) => {

    let vehicleMarkers = props.vehicleList.map((vehicle, index) => <Vehicle lat={vehicle.lat} lng={vehicle.lng} key={index} brand={vehicle.brand} />);
    let { latitude: lat, longitude: lng } = props.selectedAddress;
    let zoom = 15;

    //No selected address
    if (!lat || !lng) {
        lat = defaultLat;
        lng = defaultLng;
        zoom = defaultZoom;
    }

    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBEeJ7NUKPr2Bd0iVskbJOTpeSEBb0EWqw" }}
                zoom={zoom}
                center={{ lng, lat }}
            >
                {vehicleMarkers}
            </GoogleMapReact>
        </div>
    );
};

export default Map;