resources = [
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
        0.1)
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

        // initializes resource header card
        let desc = "<i class=" + r.image + "/> <span id=r-header-" + r.id + ">" + r.name + ": " + r.amount + "<br/></span>"
        $("#r-header-" + r.id).append(desc);

        // initializes resource description pills
        let pillName = "<li class=nav-item>" +
            "<a class=nav-link id=r-name-" + r.id + " data-toggle=pill href=#r-desc-" + r.id + ">" + r.name + "</a>" +
            "</li>";
        let pillDesc = "<div class=\"tab-pane active\" id=r-desc-" + r.id + ">" +
            "<h3>" + r.name +"</h3>" + r.description +
            "<p id=r-desc-" + r.id + "-count>You currently have " + prettify(r.amount, 0) + " workers. <br/>" +
            "Your available amount of workers is increasing by " + prettify(r.production, 2) + " every second." +
            "</p></div>";
        $("#b-col-name-" + i).append(pillName);
        $("#b-col-desc-" + i).append(pillDesc);
    }
}

Resource.update = function() {
    for (let i = 0; i < resources.length; i++) {
        let r = resources[i];

        $("#r-header-" + r.id).html(r.name + ": " + prettify(r.amount, 0) + " " + getResourcesPerTime(r.production) + "</br>");

        $("#r-desc-" + r.id + "-count").html("You currently have " + prettify(r.amount, 0) + " " + r.id + ".<br/>" +
        "Your available amount of " + r.id + " is increasing by " + prettify(r.production, 2) + " every second.")
    }
}