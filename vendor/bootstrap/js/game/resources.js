resources = [
    new Resource("water",
        "fa fa-tint",
        "Water",
        "The lifeblood of your civilization - required for survival.",
        0,
        0),
    new Resource("workers",
        "fa fa-male",
        "Workers",
        "The hard working citizens that build your empire. Required for almost everything.",
        5,
        0),
    new Resource("materials",
        "fa fa-bars",
        "Materials",
        "The resources needed to build your cities.",
        50,
        0),
    new Resource("research",
        "fa fa-flask",
        "Research",
        "The combined knowledge of your civilization.",
        0,
        0)
];

/**
 * Represents a collectible resource.
 *
 * @param id the text used internally for HTML id
 * @param image FontAwesome icon used
 * @param name the text presented on the UI
 * @param description a short sentence on function and uses of the resource
 * @param amount current amount the player has
 * @param production how much of this resource is being produced over time
 * @constructor
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

        // initializes resource header card
        let desc = "<li class=list-group-item><i class=\"" + r.image + "\"></i> <span id=r-header-" + r.id + "></span></li>"
        $("#r-header").append(desc);

        // initializes resource description pills
        let pillName = "<li class=nav-item><a class=nav-link id=r-name-" + r.id + " data-toggle=pill href=#r-desc-" + r.id + ">" + r.name + "</a></li>";
        let pillDesc = "<div class=\"tab-pane active\" id=r-desc-" + r.id + "><h3>" + r.name +"</h3>" + r.description + "<p id=r-desc-" + r.id + "-count></p></div>";
        $("#b-col-name-" + i).append(pillName);
        $("#b-col-desc-" + i).append(pillDesc);
    }
}

Resource.update = function() {
    for (let i = 0; i < resources.length; i++) {
        let r = resources[i];

        let header = r.name + ": " + prettify(r.amount, 0) + " " + getResourcesPerTime(r.production);
        $("#r-header-" + r.id).text(header);

        $("#r-desc-" + r.id + "-count").html("You currently have " + prettify(r.amount, 0) + " " + r.id + ".<br/>" +
        "Your available amount of " + r.id + " is increasing by " + prettify(r.production, 2) + " every second.")
    }
}