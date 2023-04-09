
var hotels = require('./hotelOffers.json');

export function getNoOfGuest() {
    let guest = [];
    for (let i = 1; i <= 4; i++) {
        guest.push({ "label": i });
    }
    return guest;
}

export function getNoOfRoom() {
    let room = [];
    for (let i = 1; i <= 10; i++) {
        room.push({ "label": i });
    }
    return room;
}



export function getFilterStrategies() {
    return [
        {
            label: "Price: Low to high",
            id: "lth",
        },
        {
            label: "Price: High to Low",
            id: "htl",
        }
    ]
}

export function getHotelById(id) {
    // TODO make a REST call to backend and get data for testing using JSON file
    let jsondata = JSON.parse(JSON.stringify(hotels));
    console.log("json data = ", jsondata);
    let result = jsondata.data.filter((obj) => obj.hotelId === id);
    console.log("result = ", result);
    return result;
}

export function getHotelByRequest(request) {
    // TODO make a REST call to backend and get data for testing using JSON file
    let jsondata = JSON.parse(JSON.stringify(hotels));
    // console.log("json data = ",jsondata);
    let resultList = jsondata.data.filter((obj) => obj.hotel.cityCode.toLowerCase() === request.destination.toLowerCase());
    if (request.filterBy && request.filterBy === 'Price: High to Low') {
        resultList = resultList.sort((a, b) => a.offers[0].price.base - b.offers[0].price.base)
    } else if (request.filterBy && request.filterBy === 'Price: Low to high') {
        resultList = resultList.sort((a, b) => b.offers[0].price.base - a.offers[0].price.base);
    }
    return resultList;

}

