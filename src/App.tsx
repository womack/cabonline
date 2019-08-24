import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import MapForm from "./components/MapForm";

import AddressInterface from "./interfaces/Address.interface";
import VehicleInterface from "./interfaces/Vehicle.interface";

import { getVehicles } from "./util/api";

import "./App.css";

const pollRate = 5000;

const App = () => {

  const [currentAddress, setCurrentAddress] = useState({} as AddressInterface);
  const [currentVehicles, setCurrentVehicles] = useState([] as VehicleInterface[]);
  const [currentlyPolling, setCurrentlyPolling] = useState(false);

  const pollVehicles = () => {
    setTimeout(() => {
      if (currentlyPolling) {
        getVehicles(currentAddress.latitude, currentAddress.longitude).then((response) => {
          setCurrentVehicles(response);
        });
      }
      pollVehicles();
    }, pollRate);
  };

  const updateAddress = (address: AddressInterface | undefined) => {
    if (address !== undefined) {
      getVehicles(address.latitude, address.longitude).then((response) => {
        setCurrentAddress(address);
        setCurrentVehicles(response);
        setCurrentlyPolling(true);
      });
    }
  };

  useEffect(pollVehicles, []);

  return (
    <div className="App" >
      <div className="mapContainer">
        <h1>CABONLINE HIGH TECH ADDRESS SEARCH</h1>
        <MapForm selectedAddress={currentAddress} updateSelectedAddress={updateAddress} />
        <Map selectedAddress={currentAddress} vehicleList={currentVehicles} />
      </div>
    </div>
  );
};


export default App;