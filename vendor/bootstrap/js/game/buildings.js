/**
 *
 * @param id
 * @param name
 * @param description
 * @param baseCost
 * @param currCost
 * @param production
 * @param productionMod
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
            baseCost: [0, 0, 5],
            currCost: [0, 0, 5],
            production: [1/3],
            productionMod: 1,
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
            baseCost: [0, 0, 10],
            currCost: [0, 0, 10],
            production: [0, 1/60],
            productionMod: 1,
            upkeep: [],
            amount: 0,
            purchasable: 0,
            unlocked: false
        },
        hut = {
            id: "hut",
            name: "Hut",
            description: "These dwellings constructed from local materials provide a better quality of housing than tents.",
            baseCost: [0, 0, 100],
            currCost: [0, 0, 100],
            production: [0, 0.1],
            productionMod: 1,
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
            baseCost: [0, 1, 0],
            currCost: [0, 1, 0],
            production: [0, 0, 0.5],
            productionMod: 1,
            upkeep: [0.5],
            amount: 0,
            purchasable: 0,
            unlocked: false
        },
        stonecutter = {
            id: "stonecutter",
            name: "Stonecutter",
            description: "The desert stones can be shaped into more workable forms by our workers, if they can bear the heat.",
            baseCost: [0, 2, 25],
            currCost: [0, 2, 25],
            production: [0, 0, 2],
            productionMod: 1,
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
            description: "Establishing camps at points of interest",
            baseCost: [0, 1, 50],
            currCost: [0, 1, 50],
            production: [0, 0, 0, 2],
            productionMod: 1,
            upkeep: [1],
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

            log("initializing building, id " + b.id + ", name: " + b.name);
            addBuilding(b, category, i);

            if (!b.unlocked) {
                $("#b-name-" + b.id).hide();
            }
        }
    }
}

function addBuilding(b, category, index) {
    // initialize pills
    $("#b-col-name-" + category).prepend("<li class=nav-item><a class=nav-link id=b-name-" + b.id + " data-toggle=pill " +
        "href=#b-desc-" + b.id + ">" + b.name + "</a></li>")
    $("#b-col-desc-" + category).prepend("<div class=tab-pane id=b-desc-" + b.id + "></div>");

    // What a message! there's gotta be a way to clean this up
    // initialize pill descriptions
    let desc = "<h3>" + b.name + "</h3>" + b.description + "</br>" +
        "<span id='b-count-" + b.id + "'>You currently have " + b.amount + " " + String(b.name).toLowerCase() + "s. </span><br/>" +
        "<span id='b-prod-" + b.id + "'>Each " + String(b.name).toLowerCase() + " produces " + getCostDisplay(b.production, 1, null) + " per second.</span> <hr> " +
        "<form class='form-inline'>" +
            "Building<input type='number' id='b-input-" + b.id + "' placeholder='1' class='form-control'>will cost" +
            "<span id='b-cost-display-" + b.id + "'>"+ getCostDisplay(b.currCost, 1, b) + "</span>." +
        "</form>" +
        "<div class=\"btn-group btn-block\" id=b-buttons-" + b.id + ">" +
        "<button type=button class=btn disabled id=b-button-" + b.id + "-0>Can't build</button>" +
        "<button type=button class=btn id=b-button-" + b.id + "-1>Buy 1</button>" +
        "<button type=button class=btn id=b-button-" + b.id + "-2>Buy 25</button>" +
        "<button type=button class=btn id=b-button-" + b.id + "-3>Buy 100</button></div>";

    $("#b-desc-" + b.id).html(desc);

    // attach onClick attr to Buy 1 button for form input
    $("#b-button-" + b.id + "-1").attr("onclick", "buildingPurchase(buildings." + category + "[" + index + "], 1);");

    determineButtonLayout(b);
}

function buildingUpdate() {
    for (const category in buildings) {
        for (let i = 0; i < buildings[category].length; i++) {
            let b = buildings[category][i];

            if (b.unlocked) {
                determineButtonLayout(b);

                let name = String(b.name).toLowerCase();
                if (b.amount === 0) {
                    $("#b-count-" + b.id).text("You currently have no "  + name + "s.");
                } else if (b.amount === 1) {
                    $("#b-count-" + b.id).text("You currently have 1 " + name + ".");
                } else {
                    $("#b-count-" + b.id).text("You currently have " + b.amount + " " + name + "s.");
                }

                // Not currently necessary to update - only update when production multiplier changes
                //$("#b-prod-" + b.id).text("Each " + b.name + " produces " + getCostDisplay(b.production, 1, null) + ".");

                let formInput = $("#b-input-" + b.id).val();
                if (formInput === "") {
                    formInput = 1;
                }
                $("#b-button-" + b.id + "-1").attr("onclick", "buildingPurchase(buildings." + category + "[" + i + "], " + formInput + ");");
                $("#b-button-" + b.id + "-2").attr("onclick", "buildingPurchase(buildings." + category + "[" + i + "], " + Math.floor(b.purchasable / 4) + ");");
                $("#b-button-" + b.id + "-3").attr("onclick", "buildingPurchase(buildings." + category + "[" + i + "], " + b.purchasable + ");");
            }
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
    for (let i = 0; i < building.currCost.length; i++) {
        resources[i].amount -= getBuildingAmountBuyable(building, i, amount);
    }

    for (let j = 0; j < building.production.length; j++) {
        resources[j].production += building.production[j] * amount;
    }

    building.amount += amount;
    building.currCost = getCost(building);
}

function buildingIncrement() {
    // number to divide building production by
    let divisor = 1000 / rewardIntervalTime;

    for (const category in buildings) {
        for (let i = 0; i < buildings[category].length; i++) {
            let b = buildings[category][i];
            for (let k = 0; k < b.production.length; k++) {
                // also update population
                if (k === 1) {
                    stats.population += ((b.production[k] * b.amount) / divisor);
                }

                resources[k].amount += ((b.production[k] * b.amount) / divisor);

                if (resources[k].amount > resources[k].capacity) {
                    resources[k].amount = resources[k].capacity;
                }
            }
        }
    }
}