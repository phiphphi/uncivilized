resources = [
    new Resource("workers",
        "fa fa-male",
        "Workers",
        "The hard working citizens that build your empire. Required for almost everything.",
        10,
        0),
    new Resource("materials",
        "fa fa-bars",
        "Materials",
        "The hard working citizens that build your empire. Required for almost everything.",
        50000,
        0),
    new Resource("research",
        "fa fa-flask",
        "Research",
        "The hard working citizens that build your empire. Required for almost everything.",
        0,
        0)
];

/**
 * Represents a collectable resource.
 *
 * @param id the text used internally for HTML id
 * @param image FontAwesome icon used
 * @param name the text presented on the UI
 * @param description a short sentence on function and uses of the resource
 * @param amount current amount the player has
 * @param production how much of this resource is being produced over time
 */
function Resource(id, image, name, description, amount, production) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.production = production;
}

Resource.init = function() {
    for (let i = 0; i < resources.length; i++) {
        let r = resources[i];

        let desc = "<i class=" + r.image + "/> <span id=r-header-" + r.id + ">" + r.name + ": " + r.amount + "<br/></span>"

        $("#r-header-" + r.id).append(desc);
    }
}

Resource.update = function() {
    for (let i = 0; i < resources.length; i++) {
        let r = resources[i];

        $("#r-header-" + r.id).html(r.name + ": " + prettify(r.amount) + " " + getResourcesPerTime(r.production) + "</br>");
    }
}