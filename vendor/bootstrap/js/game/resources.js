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
        amount: 5,
        production: 0,
        capacity: 50,
        unlocked: true
    },
    {
        id: "workers",
        image: "fa fa-male",
        name: "Workers",
        description: "The laborers of your city, carrying your civilization into the future.",
        amount: 0,
        production: 0,
        capacity: 0,
        unlocked: false
    },
    {
        id: "materials",
        image: "fa fa-bars",
        name: "Materials",
        description: "The matter from which our empire is built.",
        amount: 0,
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

        log("initializing resource, id " + r.id + ", name: " + r.name);
        addResource(r, i);

        if (!r.unlocked) {
            $("#r-" + r.id).hide();
        }
    }
}

function addResource(r, index) {
    // initializes resource header card
    let desc = "<div id='r-" + r.id + "'><li class=list-group-item><i class=\"" + r.image + "\"></i> <span id=r-header-" + r.id + "></span></li></div>"
    $("#r-header").append(desc);

    // initializes resource description pills
    let pillName = "<li class=nav-item><a class=nav-link id=r-name-" + r.id + " data-toggle=pill href=#r-desc-" + r.id + ">" + r.name + "</a></li>";
    let pillDesc = "<div class=\"tab-pane active\" id=r-desc-" + r.id + "><h3>" + r.name +"</h3>" + r.description + "<p id=r-desc-" + r.id + "-count></p></div>";

    if (index === 1) { // add workers to infrastructure tab
        $("#b-col-name-infrastructure").append(pillName);
        $("#b-col-desc-infrastructure").append(pillDesc);
    } else {
        $("#b-col-name-" + r.id).append(pillName);
        $("#b-col-desc-" + r.id).append(pillDesc);
    }
}

// TODO: clean this function up
function resourceUpdate() {
    for (let i = 0; i < resources.length; i++) {
        let r = resources[i];
        let amount, header;


        if (i === 1) {
            amount = prettify(r.amount, 0);
            header = amount + "/" + r.capacity + " " + getWorkersPerTime(r.production);
        } else {
            // TODO: change to show net production
            amount = prettify(r.amount, 0);
            header = amount + "/" + r.capacity + " " + getResourcesPerTime(r.production);
        }

        $("#r-header-" + r.id).text(header);

        let desc = "You currently have " + amount + " " + r.id + ".<br/>" +
            "Your capacity of " + r.id + " is " + r.capacity + ".<br/>";

        if (i === 0) {
            // only used for water - might use for others later, add consumption stat to resources
            let netProd = prettify(r.production - resources[1].amount, 2);
            desc += "Your available amount of " + r.id + " is increasing by " + netProd + " every second.<br/>" +
                "Your workers consume " + resources[1].amount + " water per second, making your net water gain " + netProd + " per second.";
        } else if (i === 1) {
            desc += "Your available amount of " + r.id + " is increasing by " + prettify(r.production, 2) + " every second.<br/>" +
                "Each worker requires 1 water per second. In total, they consume " + r.amount + " water per second.";
        } else {
            desc += "Your available amount of " + r.id + " is increasing by " + prettify(r.production, 2) + " every second.";
        }

        $("#r-desc-" + r.id + "-count").html(desc);
    }
}

function resourceIncrement() {
    let divisor = 1000 / rewardIntervalTime;

    for (let i = 0; i < resources.length; i++) {
        let r = resources[i];

        if (i === 0) { // worker water consumption
            r.amount -= (resources[1].amount / divisor);
        }

        r.amount += (r.production / divisor);

        if (r.amount > r.capacity) {
            r.amount = r.capacity;
        }
    }
}