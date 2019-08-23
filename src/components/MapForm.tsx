import React, { Component } from 'react';
import Address from "./Address";
import AddressInterface from "../interfaces/Address.interface";

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import { searchForAddress } from "../util/api";
import "./css/MapForm.css";

type MapFormState = {
    searchText: string,
    addressResults: AddressInterface[],
}

export default class MapForm extends Component<{ selectedAddress: AddressInterface, updateSelectedAddress: ((address: AddressInterface | undefined) => void) }, MapFormState> {

    state: Readonly<MapFormState> = {
        searchText: "",
        addressResults: [] as AddressInterface[],
    }

    handleChange = (valueName: string) => (e: any) => this.setState({ [valueName]: e.target.value } as Pick<MapFormState, any>);

    handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            searchForAddress(this.state.searchText).then((response: AddressInterface[]) => {
                this.setState({ addressResults: response });
            })
        }
    }

    render() {
        let addressOptions = this.state.addressResults.map((address: AddressInterface, index: number) => {
            const { streetName, zipCode } = address;
            return {
                label: `${streetName} ${zipCode}`, value: `${streetName}${zipCode}`
            }
        })
        return (
            <div className="mapForm" >
                <h1>Search for an address</h1>
                <div className="inputs">
                    <input type="text" value={this.state.searchText} onChange={this.handleChange("searchText")} onKeyDown={this.handleKeyDown} />
                    <Dropdown options={addressOptions} onChange={(option) => this.props.updateSelectedAddress(this.state.addressResults.find(address => address.streetName + address.zipCode === option.value))} value={addressOptions[0]} placeholder="Select an option" />
                </div>
                {this.state && this.props.selectedAddress ? <Address address={this.props.selectedAddress} /> : null}
            </div >
        )
    }
}