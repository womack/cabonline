
interface PlaceAPI {

    geometry: {
        location: {
            lat: number;
            lng: number;
        },
        viewport: {
            northeast: {
                lat: number;
                lng: number;
            },
            southwest: {
                lat: number;
                lng: number;
            }
        }
    };
    icon: string;
    id: string;
    name: string;
    place_id: string;
    reference: string;
    scope: string;
    types: [
        string
    ];
    vicinity: string;
}

interface PlacesApi {
    html_attributions: [];
    results: PlaceAPI[];
    status: string;
}

export default PlacesApi;