techs = [
    new Tech("tech-0",
        "Simple Tools",
        "The discovery of crude stone tools will let us accomplish tasks our hands cannot.",
        [0, 25, 0],
        [0, 0, 0],
        [1],
        true,
        false),
]


/**
 * Representables a technological advancement for your civilization.
 *
 * @param id the text used internally for HTML id
 * @param name the text presented on the UI
 * @param description a short sentence on function and uses of the resource
 * @param cost the price for the technology
 * @param boost the additive increase to the production of a resource (so 0.25 = extra 25% production)
 * @param unlocks the technologies unlocked by obtaining this one
 * @param available true if technology available to purchase, false if not
 * @param acquired true if technology owned, false if not
 * @constructor
 */
function Tech(id, name, description, cost, boost, unlocks, available, acquired) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.boost = boost;
    this.unlocks = unlocks;
    this.available = available;
    this.acquired = acquired;
}