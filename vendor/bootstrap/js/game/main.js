// Check if Jquery is loaded
if (typeof jQuery === "undefined") {
    console.log("jQuery hasn\"t loaded");
} else {
    console.log("jQuery has loaded");
}

// Variables

let stats = {
    name: "",
    era: "exploration",
    population: 0,
    city_status: ""
}

let fps = 60;
let interval = (1000 / fps);
let rewardIntervalTime = 10;
let version = "0.0.01";
let init = false;

// log
function log(text) { console.log("uncivilized v" + version + ": " + text); }

function gameInit() {
    log("Calling Update.gameInit() - loading game!");
    // set init to true here when local storage is implemented

    // resource initializes before buildings to add resource descriptions
    resourceInit();
    buildingInit();
    techInit();

    if (!init) {
        $("#alert-container").html("<div class='alert alert-warning alert-dismissible fade show'>Test" +
            "<button type='button' class='close' data-dismiss='alert'>&times;</button></div>");
    }

    init = true;
}

// Handles displaying the info for resources, population, city status...
function updateCityData() {
    if (init === true) {
        $("#pop-count").text("Population: " + prettify(stats.population, 0));
        $("#city-status").text(getCityStatus(stats.population));
        $("#era").text("era of " + stats.era);

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
// TODO: add custom scroll bar for tech