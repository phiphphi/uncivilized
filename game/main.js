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



// strings to move to own json file eventually
$(function () {

});



// Game loop
window.setInterval(function () {
    updateDisplay();
    updateStats();

}, 1000);