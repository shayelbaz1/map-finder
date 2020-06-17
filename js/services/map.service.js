
export const mapService = {
    initMap,
    addMarker,
    panTo,
    getMap
}


var map;

export function getMap() {
    return map
}


export function initMap(lat = 32.08227, lng = 34.81065) {
    // console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            // console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            // addMarker({ lat, lng })
            // console.log('Map!', map);
        })
}

function addMarker(loc) {
    console.log('loc:', loc)
    // var newLoc = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Ramat Gan'
    });
    // console.log('marker:', marker)
    return marker;
}

function panTo(lat, lng) {
    // console.log('lat, lng:', lat, lng)
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyB5jw90V3SohX_6yfkksWy85ejIIPboA7A'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


const API_KEY_GEO = 'AIzaSyBfq4Xz9w6eCQZA-I0behahrQej_2nxjqU'
// https://maps.googleapis.com/maps/api/geocode/json?latlng=32.08227,34.81065&key=AIzaSyBfq4Xz9w6eCQZA-I0behahrQej_2nxjqU