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
 * @param buildingsUnloc
 * @param techsUnlock:
 */
techs = {
    disassembleCaravan: {
        id: "disassembleCaravan",
        name: "Disassemble Caravan",
        description: "Converting our caravan into a camp will allow us to begin expanding and harvesting resources.",
        cost: [10, 20, 30, 40],
        resourceBoost: [0, 5, 50],
        prodBoost: [10],
        capBoost: [100, 0, 50],
        purchaseStatus: 1,
        resourcesUnlock: [resources.water, resources.workers, resources.materials],
        // still, tent, woodcutter
        buildingsUnlock: [buildings.water[0], buildings.infrastructure[0], buildings.materials[0]],
        techsUnlock: ["stonecutters", "researchersCamp"] // stored as strings instead because unlocked techs haven't loaded
    },
    stonecutters: {

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
        let techCard =
            "<div class='card'>" +
            "<h6>" + t.name + "</h6><hr class='tech-hr'>" + t.description + getTechCost(t) +
            "<button type='button' class='btn tech-btn' id='t-button-'" + t.id + ">Buy</button>" +
            "</div>";
        $("#tech").append(techCard);
    }
}

// might move this to helper functions later
function getTechCost(t) {
    if (t.cost.length === 0) {
        return "";
    } else {
        let cost = "<div> Cost: ";
        let firstCost = true; // deals with fencepost problem for listing cost

        for (let i = 0; i < t.cost.length; i++) {
            if (t.cost[i] !== 0) {
                if (firstCost) {
                    cost += "<i class=\"" + resources[i].image + "\"></i> " + t.cost[i];
                    firstCost = false;
                } else {
                    cost += ", <i class=\"" + resources[i].image + "\"></i> " + t.cost[i];
                }
            }
        }

        return cost += "</div>";
    }
}

function applyTech(t) {

}


