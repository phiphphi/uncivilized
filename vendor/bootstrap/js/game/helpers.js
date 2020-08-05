// Helper utility functions for other scripts

function getCost(building) {
    let newCost = [];
    for (let i = 0; i < building.baseCost.length; i++) {
        let result = building.baseCost[i] * Math.pow(1.1, building.amount);

        if (i === 1) { // only change worker costs when over next num
            newCost.push(Math.floor(result));
        } else {
            newCost.push(result);
        }
    }
    return newCost;
}


function getCityStatus(pop) {
    status = "a desert";
    if (pop === 0) {
        return status;
    } if (pop <= 10) {
        return status + " camp";
    } if (pop <= 100) {
        return status + " settlement";
    } else if (pop <= 1000) {
        return status + " outpost";
    } else if (pop <= 10000) {
        return status + " village";
    } else if (pop <= 100000) {
        return status + " town";
    } else if (pop <= 1000000) {
        return status + " county";
    } else if (pop <= 10000000) {
        return status + " city";
    } else if (pop <= 100000000) {
        return status + " metropolis";
    }
    else {
        return "Ecumenopolis";
    }
}

// use for non-worker resources
function getResourcesPerTime(amountPerSecond) {
    if (amountPerSecond === 0) { // don't display anything if no production
      return "";
    } else { // present normally - per second
        return ("(" + prettify(amountPerSecond, 2) + " p/sec)");
    }
}

/**
 * Determines how many purchase buttons to show: 1 if only 1 purchasable,
 * 2 if 2-7 purchasable (1 and 100%) and 3 if 8+ purchasable (1, 25%, 100%).
 * Additionally, will show a disabled button if none purchasable.
 *
 * @param building the building's purchase buttons we want to calculate
 */
function determineButtonLayout(building) {
    // stores code for how many we can buy (0 for none, 1 for 1, 2 for 2-7, 3 for 8+)
    let purchasableVal = 3;
    let maxAmount = Number.MAX_VALUE;

    // set buy 1 button to input text if exists, otherwise 1
    let formInput = $("#b-input-" + building.id).val();
    if (formInput === "") {
        formInput = 1;
    }

    for (let i = 0; i < building.currCost.length; i++) {
        let resourceCount = resources[i].amount;
        let buildingResCost = building.currCost[i];

        if (buildingResCost !== 0) {
            let maxBuyable = Math.floor(
                Math.log(
                    (
                        (resourceCount * (growthExponent - 1)) /
                        (building.baseCost[i] * Math.pow(growthExponent, building.amount))
                    )
                    + 1
                ) / Math.log(growthExponent)
            );

            if (maxBuyable < maxAmount) {
                maxAmount = maxBuyable;
            }

            if (buildingResCost > resourceCount) { // if we can't afford one, then break
                purchasableVal = 0;
                break;
            } else if (getBuildingAmountBuyable(building, i, 2) > resourceCount) { // show buy 1
                purchasableVal = 1;
            } else if (getBuildingAmountBuyable(building, i, 8) > resourceCount) { // show buy 1 and 100%
                if (purchasableVal > 2) {
                    purchasableVal = 2;
                }
            } // otherwise we can show buy 1, buy 25%, and buy 100%
        }
    }

    building.purchasable = maxAmount;
    if (formInput > maxAmount) {
        formInput = maxAmount;
    }

    let $noBuyButton = $("#b-button-" + building.id + "-0");
    let $oneBuyButton = $("#b-button-" + building.id + "-1");
    let $25BuyButton = $("#b-button-" + building.id + "-2");
    let $100BuyButton = $("#b-button-" + building.id + "-3");

    if (purchasableVal === 0) {
        $noBuyButton.show();

        // TODO: buttons at start and end of button group are rounded, we only want to round visible buttons

        $oneBuyButton.hide();
        $25BuyButton.hide();
        $100BuyButton.hide();
    } else {
        $noBuyButton.hide();

        $oneBuyButton.html("Buy " + formInput + "<br/>" + getCostDisplay(building.currCost, formInput, building));
        $oneBuyButton.show();

        $25BuyButton.hide();
        $100BuyButton.hide();

        if (purchasableVal >= 2) {
            $100BuyButton.html("Buy " + maxAmount + "<br/>" + getCostDisplay(building.currCost, maxAmount, building));
            $100BuyButton.show();

            if (purchasableVal === 3) {
                let quarter = Math.floor(maxAmount / 4);
                $25BuyButton.html("Buy " + quarter + "<br/>" + getCostDisplay(building.currCost, quarter, building));
                $25BuyButton.show();
            }
        }
    }
}

function determineWorkersButtonLayout() {
    // stores code for how many we can buy (0 for none, 1 for 1, 2 for 2-7, 3 for 8+)
    let purchasableVal = 3;
    let workers = resources[1];

    // set buy 1 button to input text if exists, otherwise 1
    let formInput = $("#r-input-workers").val();
    if (formInput === "") {
        formInput = 1;
    }

    let maxPurchasable = Math.floor(resources[0].amount / workers.price);
    let capacity = workers.capacity - workers.amount;

    if (maxPurchasable > capacity) {
        maxPurchasable = capacity;
    }

    workers.purchasable = maxPurchasable;

    if (formInput > maxPurchasable) {
        formInput = maxPurchasable;
    }

    let $noBuyButton = $("#r-button-workers-0");
    let $oneBuyButton = $("#r-button-workers-1");
    let $25BuyButton = $("#r-button-workers-2");
    let $100BuyButton = $("#r-button-workers-3");

    if (maxPurchasable === 0 || workers.capacity === 0) {
        $noBuyButton.show();
        $oneBuyButton.hide();
        $25BuyButton.hide();
        $100BuyButton.hide();
    } else {
        let waterImage = "<i class='" + resources[0].image + "'></i>";

        $noBuyButton.hide();

        $oneBuyButton.html(
            "Recruit " + formInput + "<br/>" +
            (formInput * workers.price) + waterImage + ", -" + formInput + waterImage + "/sec"
        );
        $oneBuyButton.show();

        $25BuyButton.hide();
        $100BuyButton.hide();

        if (maxPurchasable >= 2) {
            $100BuyButton.html(
                "Recruit " + maxPurchasable + "<br/>" +
                (maxPurchasable * workers.price) + waterImage + ", -" + maxPurchasable + waterImage + "/sec"
            );
            $100BuyButton.show();

            if (maxPurchasable >= 8) {
                let quarter = Math.floor(maxPurchasable / 4);
                $25BuyButton.html("Recruit " + maxPurchasable + "<br/>" +
                    (quarter * workers.price) + waterImage + ", -" + quarter + waterImage + "/sec"
                );
                $25BuyButton.show();
            }
        }
    }
}

/**
 * Function that calculates how many of this building can be bought with the exponential cost formula.
 *
 * @param building
 * @param index
 * @param amountWanted
 * @returns {number}
 */
function getBuildingAmountBuyable(building, index, amountWanted) {
    return (
        building.baseCost[index] * (
          (
              Math.pow(growthExponent, building.amount) * (
                  Math.pow(growthExponent, amountWanted) - 1
              )
          ) / (growthExponent - 1)
        )
    );
}

/**
 * Lists price in resources of this purchase, comma separated.
 *
 * @param purchaseCost the cost array of the object being purchased
 * @param multiplier amount to multiply cost by
 * @param building if non-null, then represents a building object to calculate expotential pricing for
 * @returns {string} representation of purchase, comma separated
 */
function getCostDisplay(purchaseCost, multiplier, building) {
    if (purchaseCost.length === 0) {
        return "Free!";
    }

    let cost = "";
    let firstCost = true; // deals with fencepost problem for listing cost

    if (building === null) { // use for displaying tech costs and production - flat costs/production
        for (let i = 0; i < purchaseCost.length; i++) {
            if (purchaseCost[i] !== 0) {
                if (firstCost) {
                    cost += prettify((purchaseCost[i] * multiplier), 2) + " <i class='" + resources[i].image + "'></i>";
                    firstCost = false;
                } else {
                    cost += ", " + prettify((purchaseCost[i] * multiplier), 2) + "<i class='" + resources[i].image + "'></i>";
                }
            }
        }
        return cost;
    } else { // use for displaying building costs - exponential costs
        for (let i = 0; i < purchaseCost.length; i++) {
            if (purchaseCost[i] !== 0) {
                if (firstCost) {
                    firstCost = false;
                } else {
                    cost += ", ";
                }

                if (i === 1) { // round for workers
                    cost += prettify(getBuildingAmountBuyable(building, i, multiplier), 0);
                } else {
                    cost += prettify(getBuildingAmountBuyable(building, i, multiplier), 2);
                }

                cost += " <i class='" + resources[i].image + "'></i>";
            }
        }
        return cost;
    }
}

/**
 * Displays the boost in resource capacities for this building.
 *
 * @param building
 * @param multiplier
 */
function getCapBoostDisplay(building, multiplier) {
    let boost = "";
    let firstBoost = true; // deals with fencepost problem for listing boost

    for (let i = 0; i < building.capBoost.length; i++) {
        if (building.capBoost[i] !== 0) {
            if (firstBoost) {
                boost += "+" + (building.capBoost[i] * multiplier) + " <i class='" + resources[i].image + "'></i>";
                firstBoost = false;
            } else {
                boost += ", +" + (building.capBoost[i] * multiplier) + "<i class='" + resources[i].image + "'></i>";
            }
        }
    }

    log(boost);
    return boost;
}



/**
 * Increments a given resource by the given amount, and also increments pop if the stat is workers.
 *
 * @param amount
 * @param resource
 */
function addResource(amount, resource) {
    if (resource.id === "workers") {
        // add to population and water upkeep
        stats.population += amount;
        resources[0].upkeep += amount;
        resource.netCapacity -= amount;
    }

    if (resource.amount + amount > resource.capacity) {
        resource.amount = resource.capacity;
    } else {
        resource.amount += amount;
    }
}

/**
 * Makes numbers look nicer for human eyes.
 *
 * @param input the number to prettify
 * @param decimals the number of decimal places to show
 * @returns {number} a cleaner number for display
 */
function prettify(input, decimals) {
    if (decimals === 0) {
        return Math.floor(input);
    } else {
        if (input === 0) {
            return 0;
        }

        return input.toFixed(decimals);
    }
}
