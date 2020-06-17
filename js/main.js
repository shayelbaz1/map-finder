'use strict'

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'


window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('urlParams:', urlParams)
    const lat = +urlParams.get('lat');
    const lng = +urlParams.get('lng');
    const pos = { lat, lng }

    if (lat != 0 && lng != 0) {
        locService.updateCurrLoc(pos)
        mapService.initMap(pos.lat, pos.lng)
        locService.getCurrLoc()
            .then(renderLocDesc)
        locService.getCurrLoc()
            .then(weatherService.getForcast)
            .then(res => renderForcast(res.data))
    }
    else mapService.initMap()
        .then(locService.getPosition)
        .then(pos => {
            const newPos = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }
            return newPos
        })
        .then(locService.updateCurrLoc)
        .then(locService.getCurrLoc)
        .then(renderMyLoc)
        .then(locService.getCurrLoc)
        .then(renderLocDesc)
        .then(locService.getCurrLoc)
        .then(weatherService.getForcast)
        .then(res => renderForcast(res.data))
        .catch(() => console.log('INIT MAP ERROR',))
}

function renderForcast(forcast) {
    const { main: { temp }, weather: [{ description, icon }] } = forcast
    const weatherIconEl = document.querySelector('.weather-icon')
    const weatherdescEl = document.querySelector('.weather-desc')
    const tempdescEl = document.querySelector('.temp')
    weatherIconEl.src = `icons/${icon}.png`
    weatherdescEl.innerText = description
    tempdescEl.innerText = temp
}

function renderMyLoc(coordinates) {
    console.log('coordinates:', coordinates)
    var pos = {
        lat: coordinates.lat,
        lng: coordinates.lng
    }
    mapService.addMarker(pos);
    mapService.panTo(pos.lat, pos.lng);
    return pos
}


function renderLocDesc(locs) {
    console.log('locs:', locs)
    locService.nameLatLng(locs)
        .then(locDesc => {
            locDesc = locDesc.split(' ').slice(1).join(' ')
            document.querySelector('.loc-desc').innerText = locDesc
        })

}


document.querySelector('.my-location').addEventListener('click', function () {
    locService.getPosition()
        .then(pos => {
            const newPos = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            }
            return newPos
        })
        .then(locService.updateCurrLoc)
        .then(locService.getCurrLoc)
        .then(renderMyLoc)
        .then(locService.getCurrLoc)
        .then(renderLocDesc)
        .then(locService.getCurrLoc)
        .then(weatherService.getForcast)
        .then(res => renderForcast(res.data))
})

document.querySelector('.go-btn').addEventListener('click', () => {
    var locationInputEl = document.querySelector('.location-input')
    if (!locationInputEl.value) return

    locService.getLatLngFromTxt(locationInputEl.value)
        .then(locService.updateCurrLoc)
        .then(locService.getCurrLoc)
        .then(location => {
            const coordinates = {
                lat: location.lat,
                lng: location.lng
            }
            renderMyLoc(coordinates)
        })
        .then(locService.getCurrLoc)
        .then(renderLocDesc)
        .then(locService.getCurrLoc())
        .then(weatherService.getForcast)
        .then(res => renderForcast(res.data))
})

document.querySelector('.copy-loc').addEventListener('click', function () {
    locService.getCurrLoc()
        .then(pos => {
            const search = `?lat=${pos.lat}&lng=${pos.lng}`
            const { host, pathname } = window.location
            let address = host + pathname + search
            console.log('address:', address.replace(/\s/g, ''))
            let hiddenInput = document.querySelector('.hidden-input')
            hiddenInput.hidden = false
            hiddenInput.value = address;
            hiddenInput.select();
            document.execCommand("copy");
            hiddenInput.hidden = true
        })

})