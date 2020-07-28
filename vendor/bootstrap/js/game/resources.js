/**
 * Represents a collectible resource.
 *
 * @param id the text used internally for HTML id
 * @param image FontAwesome icon used
 * @param name the text presented on the UI
 * @param description a short sentence on function and uses of the resource
 * @param amount current amount the player has
 * @param production how much of this resource is being produced over time
 * @param capacity the max amount of this resource that can be stored
 * @unlocked true if unlocked and visible, false otherwise
 */
resources = [
    {
        id: "water",
        image: "fa fa-tint",
        name: "Water",
        description: "The lifeblood of your civilization - required for survival.",
        amount: 0,
        production: 0,
        capacity: 0,
        unlocked: false
    },
    {
        id: "workers",
        image: "fa fa-male",
        name: "Workers",
        description: "The laborers of your city, carrying your civilization into the future.",
        amount: 0,
        production: 0,
        capacity: -1,
        unlocked: false
    },
    {
        id: "materials",
        image: "fa fa-bars",
        name: "Materials",
        description: "The matter from which our empire is built.",
        amount: 1000,
        production: 0,
        capacity: 0,
        unlocked: false
    },
    {
        id: "research",
        image: "fa fa-flask",
        name: "Research",
        description: "The combined knowledge of your civilization.",
        amount: 0,
        production: 0,
        capacity: 0,
        unlocked: false
    }
]


function resourceInit() {
    log("Calling resourceInit");
    for (let i = 0; i < resources.length; i++) {
        let r = resources[i];

        // TODO: add capacity to UI
        if (r.unlocked) {
            // initializes resource header card
            let desc = "<li class=list-group-item><i class=\"" + r.image + "\"></i> <span id=r-header-" + r.id + "></span></li>"
            $("#r-header").append(desc);

            // initializes resource description pills
            let pillName = "<li class=nav-item><a class=nav-link id=r-name-" + r.id + " data-toggle=pill href=#r-desc-" + r.id + ">" + r.name + "</a></li>";
            let pillDesc = "<div class=\"tab-pane active\" id=r-desc-" + r.id + "><h3>" + r.name +"</h3>" + r.description + "<p id=r-desc-" + r.id + "-count></p></div>";

            if (i === 1) { // add workers to infrastructure tab
                $("#b-col-name-infrastructure").append(pillName);
                $("#b-col-desc-infrastructure").append(pillDesc);
            } else {
                $("#b-col-name-" + r.id).append(pillName);
                $("#b-col-desc-" + r.id).append(pillDesc);
            }
        }
    }
}

function resourceUpdate() {
    for (let i = 0; i < resources.length; i++) {
        let r = resources[i];
        let amount, header;

        if (i === 1) {
            amount = prettify(r.amount, 0);
            header = amount + " " + getWorkersPerTime(r.production);
        } else {
            amount = prettify(r.amount, 2);
            header = amount + " " + getResourcesPerTime(r.production);
        }

        $("#r-header-" + r.id).text(header);

        $("#r-desc-" + r.id + "-count").html("You currently have " + amount + " " + r.id + ".<br/>" +
        "Your available amount of " + r.id + " is increasing by " + prettify(r.production, 2) + " every second.")
    }
}