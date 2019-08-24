import React, { Component } from 'react';
import Address from "./Address";
import AddressInterface from "../interfaces/Address.interface";

import Dropdown from 'react-dropdown'

import { getAddresses } from "../util/api";

import 'react-dropdown/style.css'
import "./css/MapForm.css";

type MapFormState = {
    searchText: string,
    addressResults: AddressInterface[],
}

export default class MapForm extends Component<{ selectedAddress: AddressInterface, updateSelectedAddress: ((address: AddressInterface | undefined) => void) }, MapFormState> {

    state: Readonly<MapFormState> = {
        searchText: "",
        addressResults: [],
    }

    handleChange = (valueName: string) => (e: any) => this.setState({ [valueName]: e.target.value } as Pick<MapFormState, any>);

    handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            getAddresses(this.state.searchText).then((response) => {
                this.setState({ addressResults: response });
            })
        }
    }

    render() {
        let addressOptions = this.state.addressResults.map((address, index: number) => {
            const { streetName, zipCode } = address;
            return {
                label: `${streetName} ${zipCode}`, value: `${streetName}${zipCode}`
            }
        })
        return (
            <div className="mapForm" >
                <div>
                    <div className="inputs">
                        <input type="text" placeholder="Search for an address" value={this.state.searchText} onChange={this.handleChange("searchText")} onKeyDown={this.handleKeyDown} />
                        {/* hacky way of having an "id" to an address */}
                        <Dropdown options={addressOptions} onChange={(option) => this.props.updateSelectedAddress(this.state.addressResults.find(address => address.streetName + address.zipCode === option.value))} value={addressOptions[0]} placeholder="Select an option" />
                    </div>
                    {this.state && this.props.selectedAddress ? <Address address={this.props.selectedAddress} /> : null}
                </div>
            </div >
        )
    }
}