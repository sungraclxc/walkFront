$(document).ready(function () {
    var onMenu = false;
    var activeList;
    var subMenu = $(".subMenu");
    var prevList,
        presentList;
    var toTop = $("#toTop");
    var date =new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var currentTime = hour + " : " + minute + " : " + second;
    console.log(currentTime);
    var timeDiv = document.getElementById("time-show");

    $(".mainMenu").on("mouseenter", function(e) {
        activeList = $(e.target).attr("data-id");
        presentList = activeList;
        $("[data-id='" + presentList + "']").addClass("active");
        if(presentList) {
            subMenu.removeClass("none");
            $("#" + activeList).removeClass("none");
        }
    });

    $(".mainMenu").on("mouseleave", function(e) {
        $("[data-id='" + activeList + "']").removeClass("active");
        subMenu.addClass("none");
        $("#" + activeList).addClass("none");
    })

    timeDiv.innerHTML = currentTime;

});