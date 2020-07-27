// Helper utility functions for other scripts

function getCost(building) {
    let newCost = [];
    for (let i = 0; i < building.cost.length; i++) {
        let result = building.cost[i] * Math.pow(1.1, building.amount);

        if (i === 1) { // only change worker costs when over next num
            newCost.push(Math.floor(result));
        } else {
            newCost.push(result);
        }
    }
    return newCost;
}


function getCityStatus(pop) {
    if (pop <= 100) {
        return "a desert settlement";
    } else if (pop <= 1000) {
        return "a desert hamlet";
    } else if (pop <= 10000) {
        return "a desert village";
    } else if (pop <= 100000) {
        return "a desert town";
    } else if (pop <= 1000000) {
        return "a desert county";
    } else if (pop <= 10000000) {
        return "a desert city";
    } else if (pop <= 100000000) {
        return "a desert metropolis";
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

function getWorkersPerTime(amountPerSecond) {
    if (amountPerSecond === 0) { // don't display anything if no production
        return "";
    } else if (amountPerSecond < 1) { // present per minute
        return ("(" + Math.round(amountPerSecond * 60) + " p/sec)");
    } else { // present normally - per second
        return ("(" + prettify(amountPerSecond, 0) + " p/sec)");
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

    for (let i = 0; i < building.cost.length; i++) {
        let resourceCount = resources[i].amount;
        let buildingResCost = building.cost[i];

        if (buildingResCost !== 0) {
            let maxBuyable = Math.floor(resourceCount / buildingResCost);
            if (maxBuyable < maxAmount) {
                maxAmount = maxBuyable;
            }

            if (buildingResCost > resourceCount) { // if we can't afford one, then break
                purchasableVal = 0;
                break;
            } else if (buildingResCost * 2 > resourceCount) { // show buy 1
                purchasableVal = 1;
            } else if (buildingResCost * 8 > resourceCount) { // show buy 1 and 100%
                if (purchasableVal > 2) {
                    purchasableVal = 2;
                }
            } // otherwise we can show buy 1, buy 25%, and buy 100%
        }
    }

    building.purchasable = maxAmount;

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
        $oneBuyButton.show();

        $25BuyButton.hide();
        $100BuyButton.hide();

        if (purchasableVal >= 2) {
            $100BuyButton.text("Buy " + maxAmount);
            $100BuyButton.show();

            if (purchasableVal === 3) {
                $25BuyButton.text("Buy " + Math.floor(maxAmount / 4));
                $25BuyButton.show();
            }
        }
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
        // parseFloat and toString remove trailing zeros
        return parseFloat(input.toFixed(decimals).toString());
    }
}
