/**
 * techs: Represents a technological advancement for your civilization.
 *
 * @param id the text used internally for HTML id
 * @param name the text presented on the UI
 * @param description a short sentence on function and uses of the resource
 * @param cost the price for the technology
 * @param resourceBoost the amount of these resources to add to the stockpile
 * @param prodBoost the additive increase to the production of a resource (so 0.25 = extra 25% production)
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
        capBoost: [100, 5, 50],
        purchaseStatus: 1,
        // water, workers, materials
        resourcesUnlock: [resources[0], resources[1], resources[2]],
        // still, tent, woodcutter
        buildingsUnlock: [buildings.water[0], buildings.infrastructure[0], buildings.materials[0]],
        techsUnlock: ["stonecutters"], // stored as strings instead because unlocked techs haven't loaded (use brackets to get, like techs[var])
        otherUnlock: ["resources-content", "water-nav-item", "infrastructure-nav-item", "materials-nav-item"],
        erasUnlock: ["of establishment"]
    },
    stonecutters: {
        id: "stonecutters",
        name: "Stonecutters",
        description: "Stonecutters description",
        cost: [0, 0, 25],
        capBoost: [0, 0, 25],
        purchaseStatus: 0,
        // stonecutter
        buildingsUnlock: [buildings.materials[1]],
    },
    researchersCamp: {

    }
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

        log("adding card: " + t.id);

        let techCard =
            "<div class='card' id='t-" + t.id + "'>" +
            "<h6>" + t.name + "</h6><hr class='tech-hr'>" + t.description + "<div>Cost: " + getCostDisplay(t.cost, 1, null) + "</div>" +
            "<button type='button' class='btn tech-btn disabled' id='t-button-" + t.id + "-disabled'>Can't research</button>" +
            "<button type='button' class='btn tech-btn' id='t-button-" + t.id + "'>Research</button>" +
            "</div>";
        $("#tech").append(techCard);

        $("#t-button-" + t.id).attr("onclick", "applyTech(techs." + t.id + ");");
    }
}

function applyTech(t) {
    if (t.hasOwnProperty("resourceBoost")) {
        for (let i = 0; i < t.resourceBoost.length; i++) {
            resources[i].amount += t.resourceBoost[i];
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

    if (t.hasOwnProperty("resourcesUnlock")) {
        for (let i = 0; i < t.resourcesUnlock.length; i++) {
            let unlockedResource = t.resourcesUnlock[i];
            unlockedResource.unlocked = true;
            $("#r-" + unlockedResource.id).show();
        }
    }

    if (t.hasOwnProperty("buildingsUnlock")) {
        for (let i = 0; i < t.buildingsUnlock.length; i++) {
            let unlockedBuilding = t.buildingsUnlock[i];
            unlockedBuilding.unlocked = true;
            $("#b-name-" + unlockedBuilding.id).show();
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
            $("#" + t.otherUnlock[i]).show();
        }
    }

    if (t.hasOwnProperty("erasUnlock")) {
        stats.era = t.erasUnlock;
    }

    $("#t-" + t.id).remove();
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


