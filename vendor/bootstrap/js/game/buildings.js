/**
 *
 * @param id
 * @param name
 * @param description
 * @param cost
 * @param currCost
 * @param production
 * @param upkeep
 * @param amount
 * @param purchasable
 * @param unlocked
 */
buildings = {
    water: [
        solarStill = {
            id: "solarStill",
            name: "Solar Still",
            description: "These simple, inefficient stills produce meager amounts of potable water from their surroundings.",
            cost: [0, 0, 5],
            currCost: [0, 0, 5],
            production: [1/3],
            upkeep: [],
            amount: 0,
            purchasable: 0,
            unlocked: false
        }
    ],
    infrastructure: [
        tent = {
            id: "tent",
            name: "Tent",
            description: "Primitive structures, providing shelter from the elements and predators.",
            cost: [0, 0, 10],
            currCost: [0, 0, 10],
            production: [0, 1/60],
            upkeep: [],
            amount: 0,
            purchasable: 0,
            unlocked: false
        },
        hut = {
            id: "hut",
            name: "Hut",
            description: "These dwellings constructed from local materials provide a better quality of housing than tents.",
            cost: [0, 0, 100],
            currCost: [0, 0, 100],
            production: [0, 0.1],
            upkeep: [],
            amount: 0,
            purchasable: 0,
            unlocked: false
        }
    ],
    materials: [
        woodrunner = {
            id: "woodrunner",
            name: "Woodrunner",
            description: "Workers tasked with scouting the plains for logs and branches to supply our stockpiles.",
            cost: [0, 1, 5],
            currCost: [0, 1, 5],
            production: [0, 0, 0.5],
            upkeep: [0.5],
            amount: 0,
            purchasable: 0,
            unlocked: false
        },
        stonecutter = {
            id: "stonecutter",
            name: "Stonecutter",
            description: "The desert stones can be shaped into more workable forms by our workers, if they can bear the heat.",
            cost: [0, 2, 25],
            currCost: [0, 2, 25],
            production: [0, 0, 2],
            upkeep: [1],
            amount: 0,
            purchasable: 0,
            unlocked: false
        }
    ],
    research: [
        researchersCamp = {
            id: "researchersCamp",
            name: "Researcher's Camp",
            description: "",
            cost: [0, 1, 50],
            currCost: [0, 1, 50],
            production: [0, 0, 2],
            upkeep: [],
            amount: 0,
            purchasable: 0,
            unlocked: false
        }
    ]
}

function buildingInit() {
    log("Calling buildingInit");
    for (const category in buildings) {
        for (let i = 0; i < buildings[category].length; i++) {
            let b = buildings[category][i];

            // initialize pills
            $("#b-col-name-" + category).prepend("<li class=nav-item><a class=nav-link id=b-name-" + b.id + " data-toggle=pill " +
                "href=#b-desc-" + b.id + ">" + b.name + "</a></li>")
            $("#b-col-desc-" + category).prepend("<div class=tab-pane id=b-desc-" + b.id + "></div>");

            // initialize pill descriptions
            let desc = "<h3>" + b.name + "</h3>" + b.description +
                "<p id=b-count-" + b.id + ">" + "You currently have " + b.amount + " " + String(b.name).toLowerCase() + "s. <br/> </p> <hr/> " +
                "<div class=\"btn-group btn-block\" id=b-buttons-" + b.id + "> " +
                    "<button type=button class=btn disabled id=b-button-" + b.id + "-0>Can't build</button> " +
                    "<button type=button class=btn id=b-button-" + b.id + "-1>Buy 1</button>" +
                    "<button type=button class=btn id=b-button-" + b.id + "-2>Buy 25</button>" +
                    "<button type=button class=btn id=b-button-" + b.id + "-3>Buy 100</button></div>";

            $("#b-desc-" + b.id).html(desc);
            // attach onClick attr to buy 1 button since amount will never change
            $("#b-button-" + b.id + "-1").attr("onclick", "buildingPurchase(buildings." + category + "." + b + ", 1);");
            
            determineButtonLayout(b);
            
            log("initializing id " + b.id + ", name: " + b.name);
        }
    }
}

function buildingUpdate() {
    for (const category in buildings) {
        for (let i = 0; i < buildings[category].length; i++) {
            let b = buildings[category][i];
            determineButtonLayout(b);

            let name = String(b.name).toLowerCase();
            if (b.amount === 0) {
                $("#b-count-" + b.id).text("You currently have no "  + name + "s.");
            } else if (b.amount === 1) {
                $("#b-count-" + b.id).text("You currently have 1 " + name + ".");
            } else {
                $("#b-count-" + b.id).text("You currently have " + b.amount + " " + name + "s.");
            }

            $("#b-button-" + b.id + "-2").attr("onclick", "buildingPurchase(buildings." + category + "." + b + ", " + Math.floor(b.purchasable / 4) + ");");
            $("#b-button-" + b.id + "-3").attr("onclick", "buildingPurchase(buildings." + category + "." + b + ", " + b.purchasable + ");");
        }
    }
}

/**
 * Purchases a certain quantity of a building. Assumes that the player has enough resources to buy.
 *
 * @param building the building to purchase
 * @param amount the amount of buildings being purchased
 */
function buildingPurchase(building, amount) {
    for (let i = 0; i < building.cost.length; i++) {
        resources[i].amount -= building.cost[i] * amount;
    }

    for (let j = 0; j < building.production.length; j++) {
        resources[j].production += building.production[j] * amount;
    }

    building.amount += amount;
    building.currCost = getCost(building);
    // TODO: change building prices to use curr cost
}

function buildingIncrement() {
    // number to divide building production by
    let divisor = 1000 / rewardIntervalTime;

    for (let i = 0; i < buildings.length; i++) {
        for (let j = 0; j < buildings[i].length; j++) {
            let b = buildings[i][j];
            for (let k = 0; k < b.production.length; k++) {
                // also update population
                if (k === 1) {
                    stats.population += ((b.production[k] * b.amount) / divisor);
                }

                resources[k].amount += ((b.production[k] * b.amount) / divisor);
            }
        }
    }
}