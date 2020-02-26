// Exercise 2 - `getAddressPosition`
// ---------------------------------

const opencage = require('opencage-api-client');
require('dotenv').config();

function getAddressPosition(address) {
    const requestObj = {
        key: process.env.OPENCAGE_API_KEY,
        q: address
    };

    return opencage.geocode(requestObj)
        .then(data => {
            if (data.status.code == 200) {
                if (data.results.length > 0) {
                    const place = data.results[0];
                    return place;
                }
            } else {
                // other possible response codes:
                // https://opencagedata.com/api#codes
                console.log('error', data.status.message);
            }
        })
        .then(data => {
            console.log(data);  // console.log the result within the .then chain to inspect data
            return data;        // return it to continue the data down the chain of Promises (if needed)
        })
        .catch(error => console.log('error', error.message));
}

getAddressPosition('1455 Boulevard de Maisonneuve O, Montréal, QC H3G 1M8');