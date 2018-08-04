var RenderLayer = {};
var MaterialLayer = {};

function MaterialLoadProgress() {

}

function MaterialLoad(callback) {
    MaterialLayer.planeImg = new Image();
    MaterialLayer.planeImg.src = "material/plane.png"
    MaterialLayer.planeImg.onload = function() {
        callback("Plane");
    }
    MaterialLayer.planeWidth = 50;
    MaterialLayer.planeHeight = 50;
    MaterialLayer.mapWidth = 400;
    MaterialLayer.mapHeight = 800;
}

function GetPlaneSize() {
    var size = [MaterialLayer.planeWidth, MaterialLayer.planeHeight];
    return size;
}

function GetMapSize() {
    var size = [MaterialLayer.mapWidth, MaterialLayer.mapHeight];
    return size;
}

function Render(data) {

    var SuitableCanvas;
    var PlaneHeadCord ;
    var Bullet = [];
    var BackgroundWidth;
    var BackgroundHeight;

    var DrawData = JSON.parse(data);


    PlaneHeadCord = DrawData["plane"];
    Bullet = DrawData["bullet"];

    DrawCanvas(RenderLayer.id, PlaneHeadCord, Bullet, RenderLayer.width, RenderLayer.height);
}
function DrawCanvas(getCanvas, planeHeadData, bulletData, bgWidth, bgHeight) {
    var chooseCanvas = document.getElementById(getCanvas);

    var drawBackground = chooseCanvas.getContext("2d");
    drawBackground.clearRect(0, 0, bgWidth, bgHeight);
    drawBackground.strokeRect(0, 0, bgWidth, bgHeight);
    drawBackground.strokeStyle = "#000";
    var drawPlane = chooseCanvas.getContext("2d");
    drawPlane.fillStyle = "#000";
    //drawPlane.fillRect(planeHeadData[0], planeHeadData[1], MaterialLayer.planeWidth, MaterialLayer.planeHeight);
    drawBackground.drawImage(MaterialLayer.planeImg, planeHeadData[0], planeHeadData[1], MaterialLayer.planeWidth, MaterialLayer.planeHeight);

    var drawBullet = chooseCanvas.getContext("2d");
    for(var i=0; i <bulletData.length; i++) {
        drawBullet.fillStyle = "#FF6A6A";
        drawBullet.fillRect(bulletData[i][0], bulletData[i][1], 4, 4);
    }
}

function RegisterCanvas(id, width, height) {
    RenderLayer.id = id;
    RenderLayer.width = width;
    RenderLayer.height = height;
}
