// Exercise 4 - `getCurrentTemperature`
// -----------------------------------
// While it's useful to get the current temperature for a specific lat/lng,
// most often we want to provide the name of a place instead.
// 
// You already created a function that can do address ==> position,
// and one that can do position ==> temperature. For this exercise,
// re-use these two functions to create one that goes directly from address ==> temperature.
// 
// You can copy/paste your code from the previous exercises,
// or require them at the top of this file.
// Remember to _export_ them from their file, if you plan on _requiring_ them.

// Given an address as a string, returns the temperature
// Use the getCurrentTemperatureAtPosition function
const rp = require('request-promise');
const opencage = require('opencage-api-client');


function getAddressPosition(address) {
    const requestObj = {
        key: 'a448d1b4561642b2821380cdc683cc9c',
        q: address
    };

    return opencage.geocode(requestObj)
        .then(data => {
            if (data.status.code == 200) {
                if (data.results.length > 0) {
                    const place = data.results[0];
                    let lat = place.geometry.lat;
                    let lng = place.geometry.lng;
                    let latLng = lat + "," + lng
                    // console.log(latLng);
                    return latLng;
                }
            } else {
                // other possible response codes:
                // https://opencagedata.com/api#codes
                console.log('error', data.status.message);
            }
        })
        .catch(error => console.log('error', error.message));
}

function getCurrentTemperatureAtPosition(latLng) {
    rp("https://api.darksky.net/forecast/f72fb68f8cc6eceab3755e1dc229e3df/" + latLng)
        .then(JSON.parse)
        .then(function (data) {
            let temperature = data.currently.temperature;
            console.log(temperature);
            return temperature;
        })
        .catch(function (error) {
            if (error instanceof SyntaxError) {
                console.error("invalid json file");
            }
            else {
                console.error("unable to read file");
            }
        })

}

let address = '3629 rue Jovette, Laval, QC H&P 4Y9';

function getCurrentTemperature(address) {

    return getAddressPosition(address)
        .then(data => data)
        .then(data => getCurrentTemperatureAtPosition(data))

}


console.log(getCurrentTemperature(address));

