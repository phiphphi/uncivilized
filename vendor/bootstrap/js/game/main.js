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
            content: "This quick tour will guide you through the basics of the game.",
            placement: "bottom"
        },
        {
            element: "#resources-card",
            title: "Resources, human and not",
            content: "Your currently unlocked resources, capacity, & production. Note that your workers are a bit " +
                "different - the right count tracks how much room you have to recruit more.",
            placement: "left"
        },
        {
            element: "#city-card",
            title: "Your city's status",
            content: "This keeps track of your total amount of workers and size overall.",
            placement: "bottom"
        },
        {
            element: "#research-card",
            title: "Knowledge is power",
            content: "Over here you can research technologies that unlock new buildings and bonuses for your civilization."
        },
        {
            element: "#infrastructure-tab",
            title: "The foundation of society",
            content: "Of note is the infrastructure tab - instead of providing resource production, these buildings " +
                "provide capacity for extra workers, which you can also hire under the workers section.",
            placement: "top"
        },
        {
            element: "#city-card",
            title: "Wrap it up",
            content: "That's all you need for now! I recommend buying some woodcutters to start producing materials and some " +
                "tents to hire new workers, then looking into new technologies!",
            placement: "bottom"
        },
    ],
    framework: 'bootstrap4',
    storage: false,
    showProgressBar: false,

});

let fps = 30;
let interval = (1000 / fps);
let rewardInterval = 10;
// default: save every 10 seconds
let saveInterval = 10000;

let version = "0.0.01";
let init = false;
let growthExponent = 1.1;

// TODO: worker rounding error


// log
function log(text) { console.log("uncivilized v" + version + ": " + text); }

function Main() {}

Main.init = function() {
    log("Calling Update.gameInit() - loading game!");
    // set init to true here when local storage is implemented

    // resource initializes before buildings to add resource descriptions
    Resources.init();
    Buildings.init();
    Tech.init();

    if (!init) {
        Intro.init();
        init = true;
    } else {
        Intro.skip();
    }
}

/**
 * Handles displaying the info for resources, population, city status...
 */
Main.updateCityData = function() {
    if (init === true) {
        $("#pop-count").text("Population: " + Helpers.prettify(stats.population, 0));
        $("#city-status").text(Helpers.getCityStatus(stats.population));
        $("#era").text("era " + stats.era);

        // update only changes ui - increment method updates actual numbers
        Resources.update();
        Buildings.update();
        Tech.update();
    }
}

/**
 * Retrieves saved game data from local storage before game initialization.
 */
Main.loadData = function() {
    let saveData = localStorage.getItem("gameSave");
    init = saveData["gameInit"];

    if (init) { // don't load on first startup
        log("Loading previous save!");
        Resources.load(saveData[resourcesKey]);
        Buildings.load(saveData[buildingsKey]);
        Tech.load(saveData[techKey]);
    } else {
        log("First time loading!");
    }

    // add delete save button for testing
    let removeSaveButton =
        "<button type=button class=btn id=remove-save-btn onClick='localStorage.removeItem(\"gameSave\");'>" +
        "Delete Save" +
        "</button>";
    $("#dev-tools").append(removeSaveButton);
}

/**
 * Saves current game data into local storage.
 */
Main.saveData = function() {
    log("Saving game!");
    // NOTE: current saving method won't work for updates when new stuff is added
    let saveData = {};
    saveData["gameInit"] = init;
    saveData[resourcesKey] = Resources.save();
    saveData[buildingsKey] = Buildings.save();
    saveData[techKey] = Tech.save();
    localStorage.setItem("gameSave", JSON.stringify(saveData));
}

/**
 * Loads saved game data and initializes the UI.
 */
window.onload = function() {
    Main.loadData();
    Main.init();
};

/**
 * Updates the UI at the set FPS.
 */
mainInterval = window.setInterval(function () {
    Main.updateCityData();
}, interval);

// note: set all producers internal stats as amount produced per 10 milliseconds, but described as per second
// so if description says 1 worker per second, then internal reward is 0.01 - since this goes every 10 milliseconds
rewardInterval = window.setInterval(function () {
    Buildings.increment();
    Resources.increment();
}, rewardInterval);

saveInterval = window.setInterval(function() {
    Main.saveData();
}, saveInterval);

// TODO: add custom scroll bar for tech