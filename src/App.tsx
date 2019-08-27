import React, { useState, useEffect, useContext } from "react";
import Map from "./components/Map";
import MapForm from "./components/MapForm";

import ToggleThemeButton from "./components/ToggleThemeButton";

import AddressInterface from "./interfaces/Address.interface";
import VehicleInterface from "./interfaces/Vehicle.interface";

import { ThemeContext, themes } from "./context/ThemeContext";

import { getVehicles } from "./util/api";

import "./App.css";

const pollRate = 5000;

const App = () => {

  const [currentAddress, setCurrentAddress] = useState<AddressInterface>({} as AddressInterface);
  const [currentVehicles, setCurrentVehicles] = useState([] as VehicleInterface[]);
  const [currentlyPolling, setCurrentlyPolling] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(themes.dark);

  const themeContext = useContext(ThemeContext);
  themeContext.toggleTheme = () => setCurrentTheme(currentTheme === themes.dark ? themes.light : themes.dark);

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
    <div className="App" style={{ backgroundImage: currentTheme.primary }}>
      <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme: themeContext.toggleTheme }}>
        <ToggleThemeButton />
        <div className="mapContainer">
          <h1 style={{ color: currentTheme.secondary }}>CABONLINE HIGH TECH ADDRESS SEARCH</h1>
          <MapForm selectedAddress={currentAddress} updateSelectedAddress={updateAddress} />
          <Map selectedAddress={currentAddress} vehicleList={currentVehicles} />
        </div>
      </ThemeContext.Provider>
    </div>
  );
};


export default App;