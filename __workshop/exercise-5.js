// Exercise 5 - `getDistanceFromIss`
// ---------------------------------
// Again here you should re-use two previously created functions, plus the `getDistance` function provided to you in `workshop.js`.
//
// One of the functions does address ==> position and the other simply does nothing ==> position.
// The `getDistance` function needs the two positions to compute the final value.


// Given an address (a string), returns the distance between that address and the ISS
// You'll need to use getDistance, getIssPosition and getAddressPosition

// // Euclidian distance between two points

const rp = require('request-promise');
const opencage = require('opencage-api-client');

let address = '3629 rue Jovette, Laval, QC H&P 4Y9';




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
                    // let lat = place.geometry.lat;
                    // let lng = place.geometry.lng;
                    return place.geometry;
                }
            } else {
                // other possible response codes:
                // https://opencagedata.com/api#codes
                console.log('error', data.status.message);
            }
        })
        .catch(error => console.log('error', error.message));
}

function getIssPosition() {
    return rp('http://api.open-notify.org/iss-now.json')
        .then(JSON.parse)
        .then(function (data) {
            const { longitude, latitude } = data.iss_position;
            let newObject = { lat: Number(latitude), lng: Number(longitude) };
            // console.log(newObject);
            return newObject;
        })
        .catch(function (error) {
            if (error instanceof SyntaxError) {
                console.error("invalid json file");
            }
            else {
                console.error("unable to read file");
            }
        });
}


function getDistance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}



async function getDistanceFromIss(address) {

    let issPos = await getIssPosition();
    let addressPos = await getAddressPosition(address);
    let distance = getDistance(issPos, addressPos);
    console.log(distance);
    return distance;
}


// Attempt without async await

let positions = {};

function getDistanceFromIss(address) {
    return getAddressPosition(address)
        .then(data => {
            const pos1 = data;
            return
        })

    return getIssPosition()
        .then(pos1 => { positions.pos1 = pos1 })
        .then(getAddressPosition(address))
        .then(pos2 => { positions.pos2 = pos2 })
        .then(console.log(positions))

}

getDistanceFromIss(address).then(data => console.log(data));

// ATTEMPT #2

// function getDistanceFromIss(address) {

//     let issPos = getIssPosition();

//     let addressPos = issPos.then(function () {
//         return getAddressPosition(address);
//     });


//     return addressPos.then(function () {
//         return getDistance(issPos, addressPos)
//     })



// }


// console.log(getAddressPosition(address));
// console.log(getIssPosition());


