buildings = [
    [ // infrastructure
        new Building( "tent",
            "Tent",
            "Primitive structures, providing shelter from the elements and predators.",
            [0, 10, 0],
            [0, 10, 0],
            [0.0166, 0, 0], // 1 worker per min
            0,
            0),
        new Building( "hut",
            "Hut",
            "These dwellings constructed from local materials provide a better quality of " +
            "housing than tents.",
            [0, 100, 0],
            [0, 100, 0],
            [0.1, 0, 0], // 1 worker per 10 seconds
            0,
            0)
    ],
    [ // materials
        new Building("woodcutter",
            "Woodcutter",
            "Workers tasked with harvesting logs and branches to supply our stockpiles.",
            [1, 5, 0],
            [1, 5, 0],
            [0, 0.5, 0],
            0,
            0)

    ],
    [ // research

    ]
];

// need to make javadoc for these
function Building(id, name, description, cost, currCost, production, amount, purchasable) {
    this.id = id;
    this.name = name;
    this.description = description;

    // cost is an array of [workers, materials, research, ...]
    this.cost = cost;
    this.currCost = currCost;

    // production is the same as cost array
    // production is per second, but resources are incremented every 1/100th of a second
    this.production = production;
    this.amount = amount;

    // how many currently buyable
    this.purchasable = purchasable;
}

Building.init = function() {
    Log("Calling Building.init()");
    for (let i = 0; i < buildings.length; i++) {
        for (let j = 0; j < buildings[i].length; j++) {
            let b = buildings[i][j];

            // initialize pills
            $("#b-col-name-" + i).prepend("<li class=nav-item><a class=nav-link id=b-name-" + b.id + " data-toggle=pill " +
                "href=#b-desc-" + b.id + ">" + b.name + "</a></li>")
            $("#b-col-desc-" + i).prepend("<div class=tab-pane id=b-desc-" + b.id + "></div>");

            // initialize pill descriptions
            let desc = "<h3>" + b.name + "</h3>" + b.description +
                "<p id=b-count-" + b.id + ">" + "You currently have " + b.amount + " " + b.id + "s. <br/> </p> <hr/> " +
                "<div class=\"btn-group btn-block\" id=b-buttons-" + b.id + "> " +
                    "<button type=button class=btn disabled id=b-button-" + b.id + "-0>Can't build</button> " +
                    "<button type=button class=btn id=b-button-" + b.id + "-1>Buy 1</button>" +
                    "<button type=button class=btn id=b-button-" + b.id + "-2>Buy 25</button>" +
                    "<button type=button class=btn id=b-button-" + b.id + "-3>Buy 100</button></div>";

            $("#b-desc-" + b.id).html(desc);
            // attach onClick attr to buy 1 button since amount will never change
            $("#b-button-" + b.id + "-1").attr("onclick", "Building.purchase(" + i + ", " + j + ", 1);");
            
            determineButtonLayout(b);
            
            Log("initializing id " + b.id + ", name: " + b.name);
        }
    }
}

Building.update = function() {
    for (let i = 0; i < buildings.length; i++) {
        for (let j = 0; j < buildings[i].length; j++) {
            let b = buildings[i][j];
            determineButtonLayout(buildings[i][j]);

            if (b.amount === 0) {
                $("#b-count-" + b.id).text("You currently have no "  + b.id + "s.");
            } else if (b.amount === 1) {
                $("#b-count-" + b.id).text("You currently have 1 " + b.id + ".");
            } else {
                $("#b-count-" + b.id).text("You currently have " + b.amount + " " + b.id + "s.");
            }

            $("#b-button-" + b.id + "-2").attr("onclick", "Building.purchase(" + i + ", " + j + ", " + Math.floor(b.purchasable / 4) + ");");
            $("#b-button-" + b.id + "-3").attr("onclick", "Building.purchase(" + i + ", " + j + ", " + b.purchasable + ");");
        }
    }
}

/**
 * Purchases a certain quantity of a building. Assumes that the player has enough resources to buy.
 *
 * @param categoryIndex the group of buildings purchased from
 * @param buildingIndex the specific building being purchased
 * @param amount the amount of buildings being purchased
 */
Building.purchase = function(categoryIndex, buildingIndex, amount) {
    let building = buildings[categoryIndex][buildingIndex];

    for (let i = 0; i < building.cost.length; i++) {
        resources[i].amount -= building.cost[i] * amount;
    }

    for (let j = 0; j < building.production.length; j++) {
        resources[j].production += building.production[j] * amount;
    }

    building.amount += amount;
    building.currCost = getCost(building);
}

Building.increment = function() {
    // number to divide building production by
    let divisor = 1000 / rewardIntervalTime;

    for (let i = 0; i < buildings.length; i++) {
        for (let j = 0; j < buildings[i].length; j++) {
            let b = buildings[i][j];
            for (let k = 0; k < b.production.length; k++) {
                // also update population
                if (k === 0) {
                    stats.population += ((b.production[k] * b.amount) / divisor);
                }

                resources[k].amount += ((b.production[k] * b.amount) / divisor);
            }
        }
    }
}