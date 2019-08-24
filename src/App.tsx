import React, { Component } from 'react';
import Map from "./components/Map";
import MapForm from "./components/MapForm";

import AddressInterface from "./interfaces/Address.interface";
import VehicleInterface from "./interfaces/Vehicle.interface";

import { getVehicles } from "./util/api";

import './App.css';

type AppState = {
  currentAddress: AddressInterface
  currentVehicles: VehicleInterface[],
  currentlyPolling: boolean
}

const pollRate = 5000;

export default class App extends Component<{}, AppState> {

  state: Readonly<AppState> = {
    currentAddress: {} as AddressInterface,
    currentVehicles: [] as VehicleInterface[],
    currentlyPolling: false
  }

  pollVehicles = () => {
    setTimeout(() => {
      if (this.state.currentlyPolling) {
        getVehicles(this.state.currentAddress.latitude, this.state.currentAddress.longitude).then((response) => {
          this.setState({ currentVehicles: response });
        })
      }
      this.pollVehicles();
    }, pollRate);
  }

  updateAddress = (address: AddressInterface | undefined) => {
    if (address !== undefined) {
      getVehicles(address.latitude, address.longitude).then((response) => {
        this.setState({ currentAddress: address, currentVehicles: response, currentlyPolling: true });
      })
    }
  }

  componentDidMount() {
    this.pollVehicles();
  }

  render() {
    return (
      <div className="App" >
        <div className="mapContainer">
        <h1>Cabonline advanced address search</h1>
          <MapForm selectedAddress={this.state.currentAddress} updateSelectedAddress={this.updateAddress} />
          <Map selectedAddress={this.state.currentAddress} vehicleList={this.state.currentVehicles} />
        </div>

      </div>
    );
  }
}
