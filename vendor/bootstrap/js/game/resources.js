/**
 * Represents a collectible resource.
 *
 * @param id the text used internally for HTML id
 * @param image FontAwesome icon used
 * @param name the text presented on the UI
 * @param description a short sentence on function and uses of the resource
 * @param amount current amount the player has
 * @param production how much of this resource is being produced over time
 * @param upkeep how much of this resource is being consumed over time
 * @param netProduction ((production * productionMod) * amount) - (upkeep * amount) for each building
 * @param capacity the max amount of this resource that can be stored
 * @unlocked true if unlocked and visible, false otherwise
 */
resources = [
    {
        id: "water",
        image: "fa fa-tint",
        name: "Water",
        description: "The lifeblood of your civilization - required for survival.",
        amount: 7,
        production: 0,
        upkeep: 0,
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
        upkeep: 0,
        capacity: 5,

        // extra stats for workers that tracks price and how many can be bought
        price: 25,
        purchasable: 0,
        unlocked: false
    },
    {
        id: "materials",
        image: "fa fa-bars",
        name: "Materials",
        description: "The matter from which our empire is built.",
        amount: 0,
        production: 0,
        upkeep: 0,
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
        upkeep: 0,
        capacity: 0,
        unlocked: false
    }
]


function resourceInit() {
    log("Calling resourceInit");
    for (let i = 0; i < resources.length; i++) {
        let r = resources[i];

        log("initializing resource, id " + r.id + ", name: " + r.name);
        addResourceDisplay(r, i);

        if (!r.unlocked) {
            $("#r-" + r.id).hide();
        }
    }
}

function addResourceDisplay(r, index) {
    // initializes resource header card
    let desc =
        "<div id='r-" + r.id + "'>" +
            "<li class=list-group-item>" +
                "<i class='" + r.image + "'></i> " +
                "<span id=r-header-" + r.id + "></span>" +
            "</li>" +
        "</div>"
    $("#r-header").append(desc);

    // initializes resource description pills
    let pillName = "" +
        "<li class=nav-item>" +
            "<a class=nav-link id=r-name-" + r.id + " data-toggle=pill href=#r-desc-" + r.id + ">" + r.name + "</a>" +
        "</li>";
    let pillDesc =
        "<div class='tab-pane active' id=r-desc-" + r.id + ">" +
            "<h3>" + r.name +"</h3>" + r.description + "<p id=r-desc-" + r.id + "-count></p>" +
        "</div>";

    if (index === 1) { // add workers to infrastructure tab
        $("#b-col-name-infrastructure").append(pillName);
        $("#b-col-desc-infrastructure").append(pillDesc);

        // TODO: add buttons to buy workers with water
        $("#r-desc-" + r.id).append(
            "<hr><form class='form-inline'>" +
            "Recruiting <input type='number' id='r-input-" + r.id + "' placeholder='1' class='form-control'>will cost" +
            "<span id='r-cost-display-" + r.id + "'></span>" +
            "</form>" +
            "<div class='btn-group btn-block' id=r-buttons-" + r.id + ">" +
            "<button type=button class=btn disabled id=r-button-" + r.id + "-0>Can't build</button>" +
            "<button type=button class=btn id=r-button-" + r.id + "-1>Buy 1</button>" +
            "<button type=button class=btn id=r-button-" + r.id + "-2>Buy 25</button>" +
            "<button type=button class=btn id=r-button-" + r.id + "-3>Buy 100</button></div>"
        );
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
            header = amount + "/" + r.capacity;
        } else {
            // TODO: change to show net production
            amount = prettify(r.amount, 0);
            header = amount + "/" + r.capacity + " " + getResourcesPerTime(r.production);
        }

        $("#r-header-" + r.id).text(header);

        let desc = "You currently have " + amount + " " + r.id + ".<br/>" +
            "Your capacity for " + r.id + " is " + r.capacity + ".<br/>";

        if (i === 0) {
            // only used for water - might use for others later, add consumption stat to resources
            let netProd = prettify(r.production - resources[1].amount, 2);
            desc += "Your available amount of " + r.id + " is increasing by " + prettify(r.production, 2) + " every second.<br/>" +
                "Your workers consume " + resources[1].amount + " water per second, making your net water gain " + netProd + " per second.";
        } else if (i === 1) {
            desc += "Each worker requires 1 water per second. In total, they consume " + r.amount + " water per second.";

            //update worker buttons
            determineWorkersButtonLayout();

            // update purchase worker buttons
            let formInput = $("#r-input-" + r.id).val();
            if (formInput === "") {
                formInput = 1;
            }

            // update formInput display
            $("#r-cost-display-" + r.id).html(
                (formInput * r.price) + " <i class='" + resources[0].image + "'></i>."
            );

            // TODO: implement recruit buttons
            /*
            $("#r-button-" + r.id + "-1").attr("onclick", "addResource(buildings." + category + "[" + i + "], " + formInput + ");");
            $("#r-button-" + r.id + "-2").attr("onclick", "buildingPurchase(buildings." + category + "[" + i + "], " + Math.floor(b.purchasable / 4) + ");");
            $("#r-button-" + r.id + "-3").attr("onclick", "buildingPurchase(buildings." + category + "[" + i + "], " + b.purchasable + ");");
             */
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