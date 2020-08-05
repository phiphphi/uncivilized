/**
 * techs: Represents a technological advancement for your civilization.
 *
 * @param id the text used internally for HTML id
 * @param name the text presented on the UI
 * @param description a short sentence on function and uses of the resource
 * @param cost the price for the technology
 * @param resourceBoost the amount of these resources to add to the stockpile
 * @param prodBoost the flat bonus to the production of a resource
 * @param prodMultBoost the multiplative increase to the production of a resource (so 3 means x3 bonus)
 * @param capBoost the increase to the capacity of these resources
 * @param purchaseStatus 0 if undiscovered, 1 if available to purchase, 2 if purchased
 * @param resourcesUnlock
 * @param buildingsUnlock
 * @param techsUnlock
 * @param otherUnlock
 */
techs = {
    disassembleCaravan: {
        id: "disassembleCaravan",
        name: "Disassemble Caravan",
        description: "Converting our caravan into a camp will allow us to begin expanding and harvesting resources.",
        cost: [],
        resourceBoost: [0, 5, 50],
        prodBoost: [10],
        capBoost: [240, 5, 100],
        purchaseStatus: 1,
        // water, workers, materials
        resourcesUnlock: [resources[0], resources[1], resources[2]],
        // tent, woodcutter
        buildingsUnlock: [buildings.infrastructure[0], buildings.materials[0]],
        techsUnlock: ["stonecutters"], // stored as strings instead because unlocked techs haven't loaded (use brackets to get, like techs[var])
        otherUnlock: ["resources-content", "water-nav-item", "infrastructure-nav-item", "materials-nav-item"],
        erasUnlock: ["of establishment"]
    },
    stonecutters: {
        id: "stonecutters",
        name: "Stonecutters",
        description: "Improved tools will let us extract stone from the local hills for building materials.",
        cost: [0, 0, 25],
        capBoost: [0, 0, 25],
        purchaseStatus: 0,
        // stonecutter
        buildingsUnlock: [buildings.materials[1]],
        techsUnlock: ["sharpenedAxes", "solarStills"]
    },
    researchersCamp: {
        id: "researchersCamp",
        name: "Researcher's Camp",
        description: "Tasking some of our workers with gathering insights will allow us to improve our crude level of technology.",
        cost: [0, 0, 30],
        capBoost: [0, 0, 0, 100],
        purchaseStatus: 0,
        // research
        resourcesUnlock: [resources[3]],
        // researcher's camp
        buildingsUnlock: [buildings.research[0]],
        techsUnlock: ["permanentConstructions", "longTermStorage"],
        otherUnlock: ["research-nav-item"]
    },
    sharpenedAxes: {
        id: "sharpenedAxes",
        name: "Sharpened Axes",
        description: "With a steady supply of stone, we can fashion whetstones to keep our axes sharp.",
        cost: [10, 0, 50],
        prodMultBoost: [0, 0, 2],
        purchaseStatus: 0,
        // techsUnlock: ["duneSleds"]
    },
    solarStills: {
        id: "solarStills",
        name: "Solar Stills",
        description: "To support growth beyond the oasis, we must look for any way to produce extra water.",
        cost: [0, 0, 35],
        purchaseStatus: 0,
        // still
        buildingsUnlock: [buildings.water[0]],
        // techsUnlock: ["reinforcedStills"]
    },
    permanentConstructions: {
        id: "permanentConstructions",
        name: "Permanent Constructions",
        description: "The development of stronger homes will provide more room for workers.",
        cost: [0, 0, 30, 30],
        capBoost: [100, 0, 50],
        purchaseStatus: 0,
        // hut
        buildingsUnlock: [buildings.infrastructure[1]],
        //techsUnlock: ["deepWaterExtraction", "exploration"],
    },

    // TODO: add tech requirements for when techs require multiple techs
    /*
    longTermStorage: {
        id: "longTermStorage",
        name: "Researcher's Camp",
        description: "research camp description",
        cost: [0, 0, 30],
        capBoost: [0, 0, 0, 100],
        purchaseStatus: 0,
        // research
        resourcesUnlock: [resources[3]],
        // researcher's camp
        buildingsUnlock: [buildings.research[0]],
        techsUnlock: ["permanentConstructions", "longTermStorage"],
        otherUnlock: ["research-nav-item"]
    }

     */
}

function techInit() {
    log("Calling techInit");

    for (let tech in techs) {
        let t = techs[tech];
        addTechCard(t);
    }
}

function addTechCard(t) {
    if (t.purchaseStatus === 1) {

        log("initializing tech: " + t.id);

        let techCard =
            "<div class='card' id='t-" + t.id + "'>" +
            "<h6>" + t.name + "</h6><hr class='tech-hr'>" + t.description + "<br/> Cost: " + getCostDisplay(t.cost, 1, null) +
            "<br/>" + getTechReward(t) +
            "<button type='button' class='btn tech-btn disabled' id='t-button-" + t.id + "-disabled'>Can't research</button>" +
            "<button type='button' class='btn tech-btn' id='t-button-" + t.id + "'>Research</button>" +
            "</div>";
        $("#tech").append(techCard);

        $("#t-button-" + t.id).attr("onclick", "applyTech(techs." + t.id + ");");
        $("#t-" + t.id).slideDown(1000);
    }
}

function applyTech(t) {
    if (t.hasOwnProperty("cost")) {
        for (let i = 0; i < t.cost.length; i++) {
            resources[i].amount -= t.cost[i];
        }
    }

    if (t.hasOwnProperty("prodBoost")) {
        for (let i = 0; i < t.prodBoost.length; i++) {
            resources[i].production += t.prodBoost[i];
        }
    }

    if (t.hasOwnProperty("capBoost")) {
        for (let i = 0; i < t.capBoost.length; i++) {
            resources[i].capacity += t.capBoost[i];
        }
    }

    // has to go after capBoost so can add resources to increased capacity
    if (t.hasOwnProperty("resourceBoost")) {
        for (let i = 0; i < t.resourceBoost.length; i++) {
            addResource(t.resourceBoost[i], resources[i]);
        }
    }

    if (t.hasOwnProperty("resourcesUnlock")) {
        for (let i = 0; i < t.resourcesUnlock.length; i++) {
            let unlockedResource = t.resourcesUnlock[i];
            unlockedResource.unlocked = true;
            $("#r-" + unlockedResource.id).slideDown(500);
        }
    }

    if (t.hasOwnProperty("buildingsUnlock")) {
        for (let i = 0; i < t.buildingsUnlock.length; i++) {
            let unlockedBuilding = t.buildingsUnlock[i];
            unlockedBuilding.unlocked = true;
            $("#b-name-" + unlockedBuilding.id).show(500);
        }
    }

    if (t.hasOwnProperty("techsUnlock")) {
        for (let i = 0; i < t.techsUnlock.length; i++) {
            let unlockedTech = techs[t.techsUnlock[i]];
            unlockedTech.purchaseStatus = 1;
            addTechCard(unlockedTech);
        }
    }

    if (t.hasOwnProperty("otherUnlock")) {
        for (let i = 0; i < t.otherUnlock.length; i++) {
            $("#" + t.otherUnlock[i]).show(1000);
        }
    }

    if (t.hasOwnProperty("erasUnlock")) {
        stats.era = t.erasUnlock;
    }

    $("#t-" + t.id).remove();
}

// TODO: change tech reward for disassemble caravan to reduce new player shock
function getTechReward(t) {
    let reward = "Reward: <br/>";
    let firstReward = true;

    if (t.hasOwnProperty("resourceBoost")) {
        for (let i = 0; i < t.resourceBoost.length; i++) {
            if (t.resourceBoost[i] !== 0) {
                if (firstReward) {
                    reward += "+" + t.resourceBoost[i] + " " + "<i class='" + resources[i].image + "'></i>";
                    firstReward = false;
                } else {
                    reward += ", +" + t.resourceBoost[i] + " " + "<i class='" + resources[i].image + "'></i>";
                }
            }
        }
        reward += "<br/>";
        firstReward = true;
    }

    if (t.hasOwnProperty("prodBoost")) {
        for (let i = 0; i < t.prodBoost.length; i++) {
            if (t.prodBoost[i] !== 0) {
                if (firstReward) {
                    reward += "+" + t.prodBoost[i] + " " + "<i class='" + resources[i].image + "'></i>" + "/sec";
                    firstReward = false;
                } else {
                    reward += ", +" + t.prodBoost[i] + " " + "<i class='" + resources[i].image + "'></i>" + "/sec";
                }
            }
        }
        reward += "<br/>";
        firstReward = true;
    }

    if (t.hasOwnProperty("capBoost")) {
        for (let i = 0; i < t.capBoost.length; i++) {
            if (t.capBoost[i] !== 0) {
                if (firstReward) {
                    reward += "+" + t.capBoost[i] + " " + "<i class='" + resources[i].image + "'></i>" + " cap";
                    firstReward = false;
                } else {
                    reward += ", +" + t.capBoost[i] + " " + "<i class='" + resources[i].image + "'></i>" + " cap";
                }
            }
        }
        reward += "<br/>";
        firstReward = true;
    }

    if (t.hasOwnProperty("resourcesUnlock")) {
        reward += "Unlock resources: "
        for (let i = 0; i < t.resourcesUnlock.length; i++) {
            if (firstReward) {
                reward += t.resourcesUnlock[i].id;
                firstReward = false;
            } else {
                reward += ", " + t.resourcesUnlock[i].id;
            }
        }
        reward += "<br/>";
        firstReward = true;
    }

    if (t.hasOwnProperty("buildingsUnlock")) {
        reward += "Unlock buildings: "
        for (let i = 0; i < t.buildingsUnlock.length; i++) {
            if (firstReward) {
                reward += t.buildingsUnlock[i].name.toLowerCase();
                firstReward = false;
            } else {
                reward += ", " + t.buildingsUnlock[i].name.toLowerCase();
            }
        }
        reward += "<br/>";
        firstReward = true;
    }

    /* remove for now - overwhelming info at start
    if (t.hasOwnProperty("techsUnlock")) {
        reward += "Unlock technologies: "
        for (let i = 0; i < t.techsUnlock.length; i++) {
            if (firstReward) {
                reward += techs[t.techsUnlock[i]].id;
                firstReward = false;
            } else {
                reward += ", " + techs[t.techsUnlock[i]].id;
            }
        }
        reward += "<br/>";
        firstReward = true;
    }
    *
     */

    return reward;
}

/**
 * Updates UI buttons for purchasing techs
 */
function techUpdate() {
    for (let tech in techs) {
        let t = techs[tech];

        if (t.purchaseStatus === 1) {
            let purchasable = true;

            for (let i = 0; i < t.cost.length; i++) {
                if (resources[i].amount < t.cost[i]) {
                    purchasable = false;
                }
            }

            let $disabledBtn = $("#t-button-" + t.id + "-disabled");
            let $buyBtn = $("#t-button-" + t.id)
            if (purchasable) {
                $disabledBtn.hide();
                $buyBtn.show();
            } else {
                $disabledBtn.show();
                $buyBtn.hide();
            }
        }
    }
}


