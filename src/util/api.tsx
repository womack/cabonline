import AddressInterface from "../interfaces/Address.interface";
import VehicleInterface from "../interfaces/Vehicle.interface";

const cabonlineApiUrl = "https://cabonline-frontend-test.herokuapp.com";

const getAddresses = (address: string) => get<AddressInterface[]>(cabonlineApiUrl, `addresses?q=${address}`);
const getVehicles = (lat: number, lng: number) => get<VehicleInterface[]>(cabonlineApiUrl, `vehicles?lat=${lat}&lng=${lng}`);

function getCurrentAddress() {
    return new Promise<AddressInterface[]>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const location = new google.maps.LatLng(coords.latitude, coords.longitude);
            const map = new google.maps.Map(document.createElement("div"), {
                center: location,
                zoom: 15
            });

            const request = {
                location,
                radius: 200,
                query: "apartment"
            };

            const service = new google.maps.places.PlacesService(map);
            service.textSearch(request, (response) => {
                if (response && response[0] && response[0].formatted_address) {
                    const address = response[0].formatted_address.split(",");
                    //Remove the country part
                    address.pop();
                    getAddresses(address.toString()).then(resolve).catch(reject);
                }
            });
        });
    });
}

function get<T>(url: string, endpoint: string) {
    return new Promise<T>((resolve, reject) => {
        fetch(`${url}/${endpoint}`).then(response => response.json()).then(resolve).catch(reject);
    });
}

export {
    getAddresses,
    getVehicles,
    getCurrentAddress
};