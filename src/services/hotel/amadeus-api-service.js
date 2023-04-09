import axios from 'axios';
import oauth from 'axios-oauth-client';

const TOKEN_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const CLIENT_ID = "P3G5IApLLov0ZGVVggFdUz81lnJGUk6Q";
const CLIENT_SECRET = "agEic6gcwcp06XAV";

const AMADEUS_BASE_URL = "https://test.api.amadeus.com";
const LOCATIONS_URL = AMADEUS_BASE_URL + "/v1/reference-data/locations"
const HOTEL_AVAILABILITY_URL = AMADEUS_BASE_URL + "/v1/reference-data/locations/hotels/by-city";
const HOTEL_OFFER_AVAILABILITY_URL = AMADEUS_BASE_URL + "/v3/shopping/hotel-offers";


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

export const getLocation = async (keyword) => {
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
export const getHotels = async (request) => {
    let authHeader = await getAuthHeader();
    const result = await axios.get( HOTEL_AVAILABILITY_URL, {
        params: {
            'cityCode' : request.destination,
            'radius' : '5',
            'radiusUnit' : 'MILE'
        },
        headers: {
            'Authorization': authHeader
        }
    });
    return result;
}


export const getHotelOffers = async (request) => {
    let authHeader = await getAuthHeader();
    const result = await axios.get( HOTEL_OFFER_AVAILABILITY_URL, {
        params: {
            'hotelIds' : "MCLONGHM",
            'adults' : 1
        },
        headers: {
            'Authorization': authHeader
        }
    });
    return result;
}

