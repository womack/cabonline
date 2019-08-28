import React, { useContext } from "react";
import Vehicle from "./Vehicle";
import AddressInterface from "../interfaces/Address.interface";
import VehicleInterface from "../interfaces/Vehicle.interface";

import GoogleMapReact from "google-map-react";

import "./css/Map.css";
import ThemeContext from "../context/ThemeContext";

//Stockholm
const defaultLat = 59.329323;
const defaultLng = 18.068581;
const defaultZoom = 11;

const Map = (props: { selectedAddress: AddressInterface, vehicleList: VehicleInterface[] }) => {

    let vehicleMarkers = props.vehicleList.map((vehicle, index) => <Vehicle lat={vehicle.lat} lng={vehicle.lng} key={index} brand={vehicle.brand} />);
    let { latitude: lat, longitude: lng } = props.selectedAddress;
    let zoom = 15;

    const themeContext = useContext(ThemeContext);
    //No selected address
    if (!lat || !lng) {
        lat = defaultLat;
        lng = defaultLng;
        zoom = defaultZoom;
    }

    return (
        <div className="map" id="map" style={{ borderColor: themeContext.theme.secondary }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyB-DR3vA_VIcyUguIEPeWKD1HA5ZdpgRT8" }}
                zoom={zoom}
                center={{ lng, lat }}
            >
                {vehicleMarkers}
            </GoogleMapReact>
        </div>
    );
};

export default Map;