buildings = [
    [ // infrastructure
        new Building( "tent",
            "Tent",
            "Primitive structures, providing shelter from the elements and predators.",
            [0, 10, 0],
            [0.0166, 0, 0],
            0), // 1 worker per min
        new Building( "hut",
            "Hut",
            "These dwellings constructed from local materials provide a better quality of " +
            "housing than tents.",
            [0, 100, 0],
            [0.1, 0, 0], // 1 worker per 10 seconds
            0)
    ],
    [ // materials

    ],
    [ // research

    ]
];

function Building(id, name, description, cost, production, amount) { // production is per second, but resources incremented every 1/100th of a second
    this.id = id;
    this.name = name;
    this.description = description;
    // cost is an array of [workers, materials, research, ...]
    this.cost = cost;
    // production is the same as cost array
    this.production = production;
    this.amount = amount;
}

Building.init = function() {
    Log("Calling Building.init()");
    for (let i = 0; i < buildings.length; i++) {
        let category = buildings[i];
        for (let j = 0; j < category.length; j++) {
            let b = category[j];

            $("#b-name-" + b.id).text(b.name);

            let desc = "<h3>" + b.name + "</h3>" + b.description +
                "<p id=b-count-" + b.id + ">" + "You currently have " + b.amount + " " + b.id + "s. <br/> </p> <hr/> " +
                "<div class=btn-group id=b-buttons-" + b.id + "> " +
                    "<button type=button class=btn disabled id=b-button-" + b.id + "-0>Can't build</button> " +
                    "<button type=button class=btn id=b-button-" + b.id + "-1>Buy 1</button>" +
                    "<button type=button class=btn id=b-button-" + b.id + "-2>Buy 25</button>" +
                    "<button type=button class=btn id=b-button-" + b.id + "-3>Buy 100</button></div>";

            $("#b-desc-" + b.id).html(desc);
            determineButtonLayout(b);
            Log("initalizing id " + b.id + ", name: " + b.name);
        }
    }
}

Building.purchase = function() {

}

Building.increment = function() {

}