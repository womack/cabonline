import React, { useState, useContext } from "react";
import Address from "./Address";
import AddressInterface from "../interfaces/Address.interface";

import ThemeContext from "../context/ThemeContext";

import Dropdown from "react-dropdown";

import { getAddresses, getCurrentAddress } from "../util/api";

import GEO_ICON from "../images/geo.svg";

import "react-dropdown/style.css";
import "./css/MapForm.css";


const MapForm = (props: { selectedAddress: AddressInterface, updateSelectedAddress: ((address: AddressInterface | undefined) => void) }) => {

    const [searchText, setSearchText] = useState<string>("");
    const [addressResults, setAddressResults] = useState<AddressInterface[]>([]);

    const themeContext = useContext(ThemeContext);

    const handleChange = (e: any) => setSearchText(e.target.value);

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter")
            onSubmit();
    };

    const updateAddressResults = (addresses: AddressInterface[]) => {
        props.updateSelectedAddress(addresses[0]);
        setAddressResults(addresses);
    };

    const onSubmit = () => getAddresses(searchText).then(updateAddressResults);
    const getCurrentLocation = () => getCurrentAddress().then(updateAddressResults);

    let addressOptions = addressResults.map(({ streetName, zipCode }) => {
        return {
            label: `${streetName} ${zipCode}`, value: `${streetName}${zipCode}`
        };
    });

    const currentAddress = addressOptions.find(({ label, value }) => props.selectedAddress.streetName + props.selectedAddress.zipCode === value) || addressOptions[0];

    return (
        <div className="mapForm" >
            <div className="inputs">
                <div className="search">
                    <input type="text" placeholder="Search for an address" value={searchText} onChange={handleChange} onKeyDown={handleKeyDown} style={{ borderColor: themeContext.theme.secondary }} />
                    <button onClick={onSubmit} >Search</button>
                    {navigator.geolocation ? <img src={GEO_ICON} alt="geo locate" onClick={getCurrentLocation} /> : null}
                </div>
                {/* hacky way of having an "id" to an address */}
                <Dropdown options={addressOptions} onChange={({ value }) => props.updateSelectedAddress(addressResults.find(({ streetName, zipCode }) => streetName + zipCode === value))} value={currentAddress} placeholder="Select an option" />
            </div>
            {props.selectedAddress ? <Address address={props.selectedAddress} /> : null}
        </div >
    );
};


export default MapForm;

