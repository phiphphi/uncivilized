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
    population: 10
}

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
function Update() { Log("This is needed to make the other Update.() function to work."); }

Update.gameInit = function() {
    Log("Calling Update.gameInit() - loading game!");
    Building.init();
    init = true;
};

Update.UI = function() {

}

// Game loop
window.onload = function() {
    Update.gameInit();
}
let mainInterval = window.setInterval(function () {
    //Update.playerStats();
}, interval);

// note: set all producers internal stats as amount produced per 10 milliseconds, but described as per second
// so if description says 1 worker per second, then internal reward is 0.01 - since this goes every 10 milliseconds
let rewardInterval = window.setInterval(function () {
    Building.increment();
    //Update.UI();
}, rewardIntervalTime);