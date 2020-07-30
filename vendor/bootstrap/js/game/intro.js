let walkButtonClicks = 0;
let currentText = 0;

intro = {
    text: [
        "The sand burns your feet.",
        "You feel what little water you have in your canteen slosh around.",
        "The sun beats down on your caravan with an unrelenting heat.",
        "There are only drops left, and the sand dunes ahead strech to eternity."
    ]
}

function introInit() {

    // hide certain game elements before they're unlocked
    // TODO: move UI to own file and optimize
    $("#resources-content").hide();
    for (let i = 0; i < resources.length; i++) {
        $("#" + resources[i].id + "-nav-item").hide();
    }


    $("#resources-card").css("max-width", "20rem");
    $("#resources-card").show();

    let walkButton = "<button type=button class=btn id=walk-btn onClick='getWalkText();'></button>" +
        "<div class='progress progress-custom' id='walk-bar' style='display: none'>" +
        "<div class='progress-bar progress-bar-custom' id='walk-progress-bar' role='progressbar'></div>" +
        "</div>"
    $("#alert-container").append(walkButton);
    $("#walk-btn").html("<b>Walk</b> <br/> -1<i class='" + resources[0].image + "'></i>");
}

function getWalkText() {
    let $alerts = $("#alert-container");

    switch (walkButtonClicks) {
        case 0:
            $alerts.append("<p class='intro-text' id='intro-text-" + walkButtonClicks + "' style='display: none'><i>" + intro.text[currentText] +"</i></div>");
            currentText++;
            break;
        case 2:
            $alerts.append("<div class='alert alert-custom' id='intro-text-" + walkButtonClicks + "' style='display: none'>" + intro.text[currentText] + "</div>");
            currentText++;
            break;
        case 3:
            $alerts.append("<p class='intro-text' id='intro-text-" + walkButtonClicks + "' style='display: none'><i>" + intro.text[currentText] +"</i></div>");
            currentText++;
            break;
        case 4:
            $alerts.append("<div class='alert alert-custom' id='intro-text-" + walkButtonClicks + "' style='display: none'>" + intro.text[currentText] + "</div>");
            currentText++;
            break;
        case 8:
            $alerts.append("<div class='alert alert-custom alert-dismissible fade show' id='intro-text-" + walkButtonClicks + "'>" +
                stats.introText + "<button type='button' class='close' data-dismiss='alert'>&times;</button></div>");
            break;
    }

    $("#intro-text-" + walkButtonClicks).fadeIn(1000);

    if (resources[0].amount > 0) {
        resources[0].amount--;
    }

    updateWalkButton();

    walkButtonClicks++;
}

function updateWalkButton() {

    // longer timeouts on additional clicks give player feeling of tiring out
    let btnTimeout = 1500 + (walkButtonClicks * 500);
    let progressBarCount = 0;
    let progressBarIncrement = btnTimeout / 100;

    // disables button for a second after each click
    $("#walk-btn").attr("disabled", "disabled");
    $("#walk-bar").fadeTo(250, 1)
;
    let progressBarUpdate = setInterval(updateBar, progressBarIncrement);

    function updateBar() {
        if (progressBarCount >= 100) {
            clearInterval(progressBarUpdate)
        } else {
            progressBarCount++;
            $("#walk-progress-bar").css("width", progressBarCount + "%");
            log(progressBarCount + "%");
        }
    }

    setTimeout(function() {
        $("#walk-btn").removeAttr("disabled");
        $("#walk-bar").fadeTo(500, 0);
    }, btnTimeout);
}


