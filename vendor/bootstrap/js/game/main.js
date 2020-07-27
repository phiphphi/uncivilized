// Check if Jquery is loaded
if (typeof jQuery === "undefined") {
    console.log("jQuery hasn\"t loaded");
} else {
    console.log("jQuery has loaded");
}

// Variables

let stats = {
    name: "",
    era: 0,
    population: 10,
    city_status: ""
}

_city_statuses = {

};

_eras = [

];


let fps = 60;
let interval = (1000 / fps);
let rewardIntervalTime = 10;
let version = "0.0.01";
let init = false;

// log
function log(text) { console.log("uncivilized v" + version + " : " + text); }

function gameInit() {
    log("Calling Update.gameInit() - loading game!");
    // resource initializes before buildings to add resource descriptions
    resourceInit();
    buildingInit();
    init = true;
}

// Handles displaying the info for resources, population, city status...
function updateCityData() {
    if (init === true) {
        $("#pop-count").text("Population: " + prettify(stats.population, 0));
        $("#city-status").text(getCityStatus(stats.population));

        // update only changes ui - increment method updates actual numbers
        resourceUpdate();
        buildingUpdate();
    }
}

// Game loop
window.onload = function() {
    gameInit();
};

mainInterval = window.setInterval(function () {
    updateCityData();
}, interval);

// note: set all producers internal stats as amount produced per 10 milliseconds, but described as per second
// so if description says 1 worker per second, then internal reward is 0.01 - since this goes every 10 milliseconds
rewardInterval = window.setInterval(function () {
    buildingIncrement();
}, rewardIntervalTime);

// TODO: add input bar for purchasing buildings