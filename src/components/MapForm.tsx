import React, { useState } from "react";
import Address from "./Address";
import AddressInterface from "../interfaces/Address.interface";

import Dropdown from "react-dropdown";

import { getAddresses } from "../util/api";

import "react-dropdown/style.css";
import "./css/MapForm.css";


const MapForm = (props: { selectedAddress: AddressInterface, updateSelectedAddress: ((address: AddressInterface | undefined) => void) }) => {

    const [searchText, setSearchText] = useState("");
    const [addressResults, setAddressResults] = useState([] as AddressInterface[]);

    const handleChange = (e: any) => setSearchText(e.target.value);

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            getAddresses(searchText).then((response) => {
                props.updateSelectedAddress(response[0]);
                setAddressResults(response);
            });
        }
    };

    let addressOptions = addressResults.map(({ streetName, zipCode }) => {
        return {
            label: `${streetName} ${zipCode}`, value: `${streetName}${zipCode}`
        };
    });

    const currentAddress = addressOptions.find(({ label, value }) => props.selectedAddress.streetName + props.selectedAddress.zipCode === value) || addressOptions[0];

    return (
        <div className="mapForm" >
            <div>
                <div className="inputs">
                    <input type="text" placeholder="Search for an address" value={searchText} onChange={handleChange} onKeyDown={handleKeyDown} />
                    {/* hacky way of having an "id" to an address */}
                    <Dropdown options={addressOptions} onChange={({ value }) => props.updateSelectedAddress(addressResults.find(({ streetName, zipCode }) => streetName + zipCode === value))} value={currentAddress} placeholder="Select an option" />
                </div>
                {props.selectedAddress ? <Address address={props.selectedAddress} /> : null}
            </div>
        </div >
    );
};


export default MapForm;

