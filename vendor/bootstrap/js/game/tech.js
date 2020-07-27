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
        id: "disassembleCaravan";
        name: "Disassemble Caravan",
        description: "Filler",
        cost: [],
        resourceBoost: [0, 5, 50],
        prodBoost: [10],
        capBoost: [100, 0, 50],
        purchaseStatus: 1,
        resourcesUnlock: [resources.water, resources.workers, resources.materials],
        buildingsUnlock: [buildings.solarStill, buildings.tent, buildings.woodrunner],
        techsUnlock: [techs.stonecutters, techs.researchersCamp]
    },
    stonecutters: {

    },

};

