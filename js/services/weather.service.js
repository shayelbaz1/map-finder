
import { storageService } from './storage.service.js'
export const weatherService = {
    getForcast
}

function getForcast(loc) {
    const currW = storageService.loadFromStorage('currW')
    if (currW) return Promise.resolve(currW)

    const W_KEY = '5821dd7892826533bb3f04bc6d181c3c'; //TODO: Enter your API Key
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lng}&APPID=${W_KEY}`)
        .then(res => {
            // console.log('res:', res.data)
            storageService.saveToStorage('currW', res)
            return res.data
        })
}


// const API_KEY_WEATHER = '5821dd7892826533bb3f04bc6d181c3c'
// `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${W_KEY}`