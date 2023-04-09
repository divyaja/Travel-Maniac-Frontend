import axios from 'axios';
import oauth from 'axios-oauth-client';

//var flights = require('../../Components/Flights/flights.json');



const TOKEN_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const CLIENT_ID = "P3G5IApLLov0ZGVVggFdUz81lnJGUk6Q";
const CLIENT_SECRET = "agEic6gcwcp06XAV";

const AMADEUS_BASE_URL = "https://test.api.amadeus.com";
const LOCATIONS_URL = AMADEUS_BASE_URL + "/v1/reference-data/locations"
const FLIGHTS_AVAILABILITY_URL = AMADEUS_BASE_URL + "/v1/shopping/availability/flight-availabilities";


export const getClientCredentials = oauth.clientCredentials(
    axios.create(),
    TOKEN_URL,
    CLIENT_ID,
    CLIENT_SECRET
);

export const getAuthHeader = async () => {
    const auth = await getClientCredentials('OPTIONAL_SCOPES')
    let authHeader = auth.token_type + " " + auth.access_token;
    return authHeader;
}

export const getLocations = async (keyword) => {
    let authHeader = await getAuthHeader();
    const result = await axios.get(LOCATIONS_URL, {
        params: {
            'subType': 'CITY',
            'keyword': keyword
        },
        headers: {
            'Authorization': authHeader
        }
    });
    return result;
}

/***
 * 
 */
export const getFlights = async (request) => {
    let requestBody = {
        "originDestinations": [
            {
                "id": "1",
                "originLocationCode": request.source.iataCode,
                "destinationLocationCode": request.destination.iataCode,
                "departureDateTime": {
                    "date": "2022-11-26",
                    "time": "00:00:00"
                }
            }
        ],
        "travelers": [
            {
                "id": request.noOfPassengers,
                "travelerType": "ADULT"
            }
        ],
        "sources": [
            "GDS"
        ]
    }
    let authHeader = await getAuthHeader();
    const result = await axios.post(FLIGHTS_AVAILABILITY_URL, requestBody, {
        headers: {
            // 'X-HTTP-Method-Override' : 'GET',
            'Content-Type' : "application/json",
            'Authorization': authHeader
        }
    });
    // let result = {"data" : flights}
    console.warn(result.data);
    return result;
}

