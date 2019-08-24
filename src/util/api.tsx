import AddressInterface from "../interfaces/Address.interface";
import VehicleInterface from "../interfaces/Vehicle.interface";

const apiUrl = "https://cabonline-frontend-test.herokuapp.com"

const getAddresses = (address: string) => get<AddressInterface[]>(`addresses?q=${address}`);
const getVehicles = (lat: number, lng: number) => get<VehicleInterface[]>(`vehicles?lat=${lat}&lng=${lng}`);

function get<T>(endpoint: string) {
    return new Promise<T>((resolve, reject) => {
        fetch(`${apiUrl}/${endpoint}`).then(response => response.json()).then(resolve).catch(reject);
    });
}

export {
    getAddresses,
    getVehicles
};