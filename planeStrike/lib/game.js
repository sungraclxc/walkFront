var planeX = 0,
    planeY = 0,
    bulletArr = [],
    cordData = [0,0];

var GameData = {};

//---------------------------------------------------------------------------

function GameLayerInit(canvasWidth, canvasHeight) {
    GameData.bulletSpeed = 10;
    GameData.bulletNumber = canvasHeight / GameData.bulletSpeed * 2;
    planeX = canvasWidth * 0.5;
    planeY = canvasHeight * 0.9;
    GameData.planeSize = GetPlaneSize();
    var bullet = setInterval(function() {
        addBullet(planeX + GameData.planeSize[0] / 2 - 2, planeY - 10);
    }, 200);
    var bullet = setInterval(function() {
        updateBullet();
    }, 20);
}

function UserCommand(command) {
    var nextX = planeX;
    var nextY = planeY;

    switch(command)
    {
        case "Left":
            nextX = planeX - 10;
            break;
        case "Right":
            nextX = planeX + 10;
            break;
        case "Up":
            nextY = planeY - 10;
            break;
        case "Down":
            nextY = planeY + 10;
            break;
    }
    var nextCord = [nextX, nextY];
    var result = IsOutOfEdge(nextCord);
    if(false == result) {
        planeX = nextX;
        planeY = nextY;
    }
}

function GetData() {
    cordData = {
        "plane" : [planeX, planeY],
        "bullet": bulletArr
    };
    cordData = JSON.stringify(cordData);
    return cordData;
}

//---------------------------------------------------------------------------

function addBullet(elemX, elemY) {

    bulletArr.unshift([elemX, elemY]);

    var arrLen = bulletArr.length;

    if (GameData.bulletNumber+1 == arrLen) {
        bulletArr.pop();
    }

    return bulletArr;
}

function updateBullet() {

    var arrLen = bulletArr.length;

    for(var i=0; i<arrLen; i++) {
        bulletArr[i][1] -= GameData.bulletSpeed;
    }

    return bulletArr;
}