'use strict';
export const storageService = {
    loadFromStorage,
    saveToStorage
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, val) {
    localStorage[key] = JSON.stringify(val);
}