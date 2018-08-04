var currentCanvas = -1;

// if -1, no hide
// show

function ShowFrame(canvasID) {
  console.log(currentCanvas, canvasID);

  if (-1 != currentCanvas) {
    $("#" + currentCanvas).addClass("hide");
  }

  currentCanvas = canvasID;
    $("#" + currentCanvas).removeClass("hide");
}
