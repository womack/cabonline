import React, { Component } from 'react';
import Vehicle from "./Vehicle";
import GoogleMapReact from 'google-map-react';

import AddressInterface from "../interfaces/Address.interface";
import VehicleInterface from "../interfaces/Vehicle.interface";


import "./css/Map.css";

type MapState = {
    center: {
        lat: number,
        lng: number
    },
    zoom: number
}

export default class Map extends Component<{ selectedAddress: AddressInterface, vehicleList: VehicleInterface[] }, MapState> {

    state: Readonly<MapState> = {
        center: {
            lat: 59.329323,
            lng: 18.068581
        },
        zoom: 11
    };

    render() {
        let { latitude: lat, longitude: lng } = this.props.selectedAddress;
        let zoom = 15;
        if (!lat || !lng) {
            lat = this.state.center.lat;
            lng = this.state.center.lng;
            zoom = this.state.zoom;
        }

        let vehicleMarkers = this.props.vehicleList.map((vehicle, index) => <Vehicle lat={vehicle.lat} lng={vehicle.lng} key={index} brand={vehicle.brand} />);

        return (
            <div className="map" >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBEeJ7NUKPr2Bd0iVskbJOTpeSEBb0EWqw" }}
                    zoom={zoom}
                    center={{ lng, lat }}
                >
                    {vehicleMarkers}
                </GoogleMapReact>
            </div>
        );
    }
}