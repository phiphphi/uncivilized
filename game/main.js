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
       requirement: [
           _resources.workers.amount = 500,
           _resources.materials.amount = 5000
       ]
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