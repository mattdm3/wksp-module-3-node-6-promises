// Exercise 3 - `getAddressPosition`
// ---------------------------------
// 1. Go to https://darksky.net/dev/ and read the documentation
// 2. Signup and get a free API key

// f72fb68f8cc6eceab3755e1dc229e3df

// 3. Complete the code of the function.

// The `position` parameter is an object with `lat` and `lng`.
// 4. Make sure your function only returns a `Promise` for the current temperature
// (a number) and nothing else

// Given a position (latitude and longitude), returns the position

const rp = require('request-promise');


const thePosition = "45.497118,-73.579044";


function getCurrentTemperatureAtPosition(position) {
    rp("https://api.darksky.net/forecast/f72fb68f8cc6eceab3755e1dc229e3df/" + position)
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

getCurrentTemperatureAtPosition(thePosition);

