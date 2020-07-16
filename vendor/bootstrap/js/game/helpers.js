// Helper utility functions for other scripts

function getCityStatus(pop) {
    if (pop <= 100) {
        return "Settlement";
    } else if (pop <= 1000) {
        return "Hamlet";
    } else if (pop <= 10000) {
        return "Village";
    } else if (pop <= 100000) {
        return "Town";
    } else if (pop <= 1000000) {
        return "County";
    } else if (pop <= 10000000) {
        return "City";
    } else if (pop <= 100000000) {
        return "Metropolis";
    }

    else {
        return "Ecumenopolis";
    }
}

function getResourcesPerTime(amountPerSecond) {
    if (amountPerSecond === 0) { // don't display anything if no production
      return "";
    } else if (amountPerSecond < 1) { // convert to minutes
        return ("(" + prettify(amountPerSecond * 60) + " p/min)");
    } else { // present normally - per second
        return ("(" + prettify(amountPerSecond) + " p/sec)");
    }
}

function prettify(input) {
    let output = Math.round(input * 1000000)/1000000;
    return output;
}