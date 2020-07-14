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
    population: 0
}


_resources = {
    workers: {
        name: "Workers",
        description: "The hard working citizens that build your empire. Required for almost everything.",
        amount: 0,
        production: 0
    },
    materials: {

    },
    research: {

    }
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

_buildings = {
    infrastructure: {
        building1a: {
            name: "Tent",
            description: "Primitive structures, providing shelter from the elements and predators.",
        },
        building1b: {

        },
        building2a: {
            name: "Hut",
            description: "These dwellings constructed from local materials provide a better quality of " +
                "housing than tents."
        }
    },
    materials: {},
    research: {}
};

let fps = 60;
let interval = (1000 / fps);
let rewardInterval = 10;
let version = "0.0.01";
let init = false;

// log
function Log(text) { console.log("uncivilized v" + version + " : " + text); }

// update
function Update() { Log("This is needed to make the other Update.() function to work."); }

Update.gameInit = function() {
    Log("Calling Update.gameInit() - loading game!");

    init = true;
};


// Game loop
window.onload = function() {
    Update.gameInit();
}
let mainInterval = window.setInterval(function () {
    Update.playerStats();
}, interval);
// note: set all producers internal stats as amount produced per 10 milliseconds, but described as per second
// so if description says 1 worker per second, then internal reward is 0.01 - since this goes every 10 milliseconds
let rewardInterval = window.setInterval(function () {
    Producers.reward();
}, rewardInterval);