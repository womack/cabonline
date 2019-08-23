import AddressInterface from "../interfaces/Address.interface";
import VehicleInterface from "../interfaces/Vehicle.interface";


const apiUrl = "https://cabonline-frontend-test.herokuapp.com"


const searchForAddress = (address: string) => {
    return new Promise<AddressInterface[]>((resolve, reject) => {
        fetch(`${apiUrl}/addresses?q=${address}`).then(response => response.json()).then(resolve).catch(reject);
    });
}

const getVehicles = (lat: number, lng: number) => {
    return new Promise<VehicleInterface[]>((resolve, reject) => {
        fetch(`${apiUrl}/vehicles?lat=${lat}&lng=${lng}`).then(response => response.json()).then(resolve).catch(reject);
    });
}

export {
    searchForAddress,
    getVehicles
};