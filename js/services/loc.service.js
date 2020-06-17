export const locService = {
    getCurrLoc,
    getPosition,
    nameLatLng,
    updateCurrLoc,
    getLatLngFromTxt
}
var gCurrLoc = null
var API_KEY = 'AIzaSyBfq4Xz9w6eCQZA-I0behahrQej_2nxjqU'; //TODO: Enter your API Key


function updateCurrLoc(pos) {
    gCurrLoc = pos
}

function nameLatLng(loc) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.lat},${loc.lng}&key=${API_KEY}`)
        .then(res => {
            // console.log('res:', res.data.plus_code)
            return res.data.plus_code.compound_code
        })
}

function getLatLngFromTxt(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(res => res.data.results[0].geometry.location)
}



// const API_KEY_GEO = 'AIzaSyBfq4Xz9w6eCQZA-I0behahrQej_2nxjqU'
// https://maps.googleapis.com/maps/api/geocode/json?latlng=32.08227,34.81065&key=AIzaSyBfq4Xz9w6eCQZA-I0behahrQej_2nxjqU

function getCurrLoc() {
    console.log('gCurrLoc:', gCurrLoc)
    return Promise.resolve(gCurrLoc);

}


export function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

