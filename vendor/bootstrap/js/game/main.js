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
    {
       name: "Ancient Era",
       description: "",
       requirements: {
           population: 1000,
           materials: 500
       }

    },
    {

    },
];


let fps = 60;
let interval = (1000 / fps);
let rewardIntervalTime = 10;
let version = "0.0.01";
let init = false;

// log
function Log(text) { console.log("uncivilized v" + version + " : " + text); }

// update
function Update() { Log("This is needed to make the other Update.() functions work."); }

Update.gameInit = function() {
    Log("Calling Update.gameInit() - loading game!");
    // resource initializes before buildings to add resource descriptions
    Resource.init();
    Building.init();
    init = true;
};

// Handles displaying the info for resources, population, city status...
Update.cityData = function() {
    if (init === true) {
        $("#pop-count").text("Population: " + prettify(stats.population));
        $("#city-status").text(getCityStatus(stats.population));

        // updates resources
        Resource.update();

        // updates buildings
        Building.update();
    }
};

// Game loop
window.onload = function() {
    Update.gameInit();
};

mainInterval = window.setInterval(function () {
    Update.cityData();
}, interval);

// note: set all producers internal stats as amount produced per 10 milliseconds, but described as per second
// so if description says 1 worker per second, then internal reward is 0.01 - since this goes every 10 milliseconds
rewardInterval = window.setInterval(function () {
    Building.increment();
}, rewardIntervalTime);

// TODO: add input bar for purchasing buildings, add material and research buildings, make materials appear first