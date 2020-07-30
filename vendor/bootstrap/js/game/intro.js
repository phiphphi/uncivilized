let walkButtonClicks = 13;

function introInit() {

    // hide certain game elements before they're unlocked
    // TODO: move UI to own file and optimize
    $("#resources-content").hide();
    for (let i = 0; i < resources.length; i++) {
        $("#" + resources[i].id + "-nav-item").hide();
    }


    $("#resources-card").css("max-width", "20rem");
    $("#resources-card").show();

    let walkButton =  "<button type=button class=btn id=walk-btn onClick='getWalkText();'></button>"
    $("#alert-container").append(walkButton);
    $("#walk-btn").html("Walk <br/> -1<i class='" + resources[0].image + "'></i>");
}

function getWalkText() {
    let $alerts = $("#alert-container");

    switch (walkButtonClicks) {
        case 13:
            $alerts.append("<p class='intro-text' id='intro-13' style='display: none'>The sand burns your feet.</div>")
            $("#intro-13").fadeIn("slow");
            break;
        case 11:
            break;
        case 0:
            $alerts.append("<div class='alert alert-custom alert-dismissible fade show'>" + stats.introText +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button></div>");
            break;
    }

    if (resources[0].amount > 0) {
        resources[0].amount--;
    }

    walkButtonClicks--;
}

