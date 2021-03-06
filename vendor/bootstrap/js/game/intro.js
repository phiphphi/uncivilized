let walkButtonClicks = 0;
let currentText = 0;

intro = {
    text: [
        "The sand burns your feet.",
        "You feel what little water you have in your canteen slosh around.",
        "As you walk, the sun beats down on your caravan with an unrelenting heat.",
        "As your last drops run out, the sand dunes ahead seem to stretch to eternity.",
        "The others fall one by one, into the embrace of the desert.",
        "Unable to stand any longer, you fall to the ground.",
        "The crest of the dune lies within an arm's reach away.",
        "As you hurdle the crest of the dune, your find a glimmering oasis in the desert - a mystical sight to " +
        "your party's parched throats. For the first time in a long while, you feel hope. It may not be much, but it's " +
        "enough for your people to survive - for now."
    ],
    tutorial: [

    ]
}

function Intro() {}

Intro.init = function() {
    // hide certain game elements before they're unlocked
    for (let i = 0; i < resources.length; i++) {
        $("#" + resources[i].id + "-nav-item").hide();
    }

    let walkButton = "<button type=button class=btn id=walk-btn onClick='Intro.getWalkText();' style='display: none'></button>" +
        "<div class='progress progress-custom' id='walk-bar' style='display: none'>" +
        "<div class='progress-bar progress-bar-custom' id='walk-progress-bar' role='progressbar'></div>" +
        "</div>"
    $("#alert-container").append(walkButton);
    $("#walk-btn").html("<b>Walk</b> <br/> -1<i class='" + resources[0].image + "'></i>");


    // add skip button
    let skipButton = "<button type=button class=btn id=skip-intro-btn onClick='Intro.skip();'>Skip Intro</button>";
    $("#dev-tools").append(skipButton);

    // some style and animations for the intro
    $("#resources-card").css("margin", "0 auto").css("max-width", "20rem");
    $("#resources-card").show(1000);
    $("#walk-btn").delay(500).fadeIn(1000);
}

Intro.getWalkText = function() {
    let $alerts = $("#alert-container");

    if (walkButtonClicks === 0 || walkButtonClicks === 4 || walkButtonClicks === 8 || walkButtonClicks === 11) { // add intro text
        Intro.addText($alerts, intro.text[currentText], walkButtonClicks);
    } else if (walkButtonClicks === 2 || walkButtonClicks === 6 || walkButtonClicks === 10 || walkButtonClicks === 12) { // add intro alert
        Intro.addAlert($alerts, intro.text[currentText], walkButtonClicks);
    }

    if (walkButtonClicks === 12) { // add start game button and remove walk button
        $alerts.append(
            "<button type=button class=btn id='intro-start-btn' onClick='Intro.startGame()' style='display: none'><b>Begin</b></button>"
        );
        $("#intro-start-btn").fadeIn(1000);

        $("#walk-btn").fadeOut(1000);
        // stop cancels any in progress animations
        $("#walk-bar").stop(true).fadeOut(1000);
        setTimeout(function() {
            $("#walk-btn").remove();
            $("#walk-bar").remove();
        }, 1000);
    }

    if (resources[0].amount > 0) {
        resources[0].amount--;
    }

    Intro.updateWalkButton();

    walkButtonClicks++;
}

/**
 * Adds italicized text to a given container. Used in getWalkText() for the intro sequence.
 *
 * @param alerts the container to add to
 * @param text the text string to be displayed
 * @param id the desired id for the created object
 */
Intro.addText = function(alerts, text, id) {
    alerts.append(
        "<p class='intro-text' id='intro-text-" + id + "' style='display: none'><i>" + text +"</i></div>");
    currentText++;
    $("#intro-text-" + id).fadeIn(1000);
}

/**
 * Adds an alert to a given container. These alerts are undismissable. Used in getWalkText() for the intro sequence.
 *
 * @param alerts the container to add to
 * @param text the text string to be displayed
 * @param id the desired id for the created object
 */
Intro.addAlert = function(alerts, text, id) {
    alerts.append(
        "<div class='alert alert-custom' id='intro-text-" + id + "' style='display: none'>" + text + "</div>");
    currentText++;
    $("#intro-text-" + id).fadeIn(1000);
}

Intro.updateWalkButton = function() {
    let $walkBtn = $("#walk-btn");
    // update walk button text
    if (walkButtonClicks === 6) {
        $walkBtn.text("Walk");
    } else if (walkButtonClicks === 10) {
        $walkBtn.text("crawl");
    }

    // longer timeouts on additional clicks give player feeling of tiring out
    let btnTimeout = 1000 + (walkButtonClicks * 333);
    let progressBarCount = 0;
    let progressBarIncrement = btnTimeout / 100;

    // disables button for a second after each click
    $walkBtn.attr("disabled", "disabled");
    $("#walk-bar").fadeTo(250, 1)
;
    let progressBarUpdate = setInterval(updateBar, progressBarIncrement);

    function updateBar() {
        if (progressBarCount >= 100) {
            clearInterval(progressBarUpdate)
        } else {
            progressBarCount++;
            $("#walk-progress-bar").css("width", progressBarCount + "%");
        }
    }

    // add delay to timeout to let bar complete
    setTimeout(function() {
        $walkBtn.removeAttr("disabled");
        $("#walk-bar").fadeTo(500, 0);
    }, btnTimeout + 50);
}

Intro.startGame = function() {
    let initialFadeOutTime = 1500;
    let titleFadeinTime = 3000;
    let titleShowTime = 5000;
    let gameFadeinTime = 10000;

    for (let i = 0; i < 13; i++) {
        $("#intro-text-" + i).fadeOut(initialFadeOutTime);
    }
    $("#intro-start-btn").fadeOut(initialFadeOutTime);
    $("#resources-card").fadeOut(initialFadeOutTime);

    // timeout lets animations play before removing the elements
    setTimeout(function() {
        for (let i = 0; i < 13; i++) {
            $("#intro-text-" + i).remove();
        }
        $("#intro-start-btn").remove();


        let titleText = "<div class='title-text' id='title-text' style='position: fixed'>" +
            "<span class='title-start' id='title-start'>un</span>" +
            "<span class='title-end' id='title-end'>civilized.</span>" +
            "</div>"

        $("body").append(titleText);
    }, initialFadeOutTime);

    // handles the title fadein and fadeout animations
    setTimeout(function() {
        $("#title-end").fadeTo(250, 1);

        setTimeout(function() {
            $("#title-start").fadeTo(1000, 1);
        }, 1000);

        setTimeout(function() {
            $("#title-text").fadeOut(1500);
        }, titleShowTime);
    }, titleFadeinTime);

    setTimeout(function() {
        // show main ui cards
        $("#resources-card").css("max-width", "none").css("margin", "").addClass("card-main");
        $("#resources-card").show(2500);
        $("#city-card").show(2500);
        $("#city-card").css("display", "flex");
        $("#research-card").show(2500);
    }, gameFadeinTime);
}

// dev use for skipping straight to gameplay
Intro.skip = function() {
    $("#walk-btn").remove();
    $("#walk-bar").remove();

    for (let i = 0; i < 13; i++) {
        $("#intro-text-" + i).remove();
    }
    $("#intro-start-btn").remove();
    $("#skip-intro-btn").remove();

    $("#resources-card").css("max-width", "none").css("margin", "").addClass("card-main");
    $("#resources-card").show();
    $("#city-card").show();
    $("#city-card").css("display", "flex");
    $("#research-card").show();
}


