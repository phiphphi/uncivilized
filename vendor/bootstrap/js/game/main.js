// Check if Jquery is loaded
if (typeof jQuery === "undefined") {
    console.log("jQuery hasn\"t loaded");
} else {
    console.log("jQuery has loaded");
}

// Variables

let stats = {
    name: "",
    era: "unknown",
    population: 0,
    cityStatus: "",
}

let introTour = new Tour({
    steps: [
        {
            element: "#city-card",
            title: "Welcome to uncivilized!",
            content: "This quick tour will guide you through the basics of the game."
        },
        {
            element: "#resources-card",
            title: "Resources, human and not",
            content: "Your currently unlocked resources, their max capacity, and net production per second. Note that " +
                "your workers are a bit different - the left count tracks how many you have available, and the right count " +
                "tracks how much available room you have to recruit more."
        },
        {
            element: "#city-card",
            title: "Your city's status",
            content: "This keeps track of your total amount of workers and size overall."
        },
        {
            element: "#research-card",
            title: "Knowledge is power",
            content: "Over here you can research technologies that unlock new buildings and bonuses for your civilization."
        },
        {
            element: "#infrastructure-tab",
            title: "The foundation of society",
            content: "Of note is the infrastructure tab, which is different than the others - instead of providing resource " +
                "production, these buildings provide capacity for extra workers, which you can also hire under the workers tab."
        },
        {
            element: "#city-card",
            title: "Wrap it up",
            content: "That's all you need for now! I recommend buying some woodcutters to start producing materials and some " +
                "tents to hire new workers, as well as researching new technologies - you'll need to find a way to produce extra " +
                "water, since that oasis can only support so many. Good luck!"
        },
    ],
    framework: 'bootstrap4',
    storage: false,
    showProgressBar: false,

});

let fps = 30;
let interval = (1000 / fps);
let rewardIntervalTime = 10;
let version = "0.0.01";
let init = false;
let growthExponent = 1.1;

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
        introInit();
    }

    init = true;
}

// Handles displaying the info for resources, population, city status...
function updateCityData() {
    if (init === true) {
        $("#pop-count").text("Population: " + prettify(stats.population, 0));
        $("#city-status").text(getCityStatus(stats.population));
        $("#era").text("era " + stats.era);

        // update only changes ui - increment method updates actual numbers
        resourceUpdate();
        buildingUpdate();
        techUpdate();
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
    resourceIncrement();
}, rewardIntervalTime);

// TODO: add custom scroll bar for tech