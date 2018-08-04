var EngineLayer = {};
function EngineLayerInit() {
    setInterval("RequestGameData()", 40);
    EngineLayer.planeSize = GetPlaneSize();
    EngineLayer.mapSize = GetMapSize();
}

function KeyInput(elemkey) {
    var KeySetting = {
        "Left" : 37,
        "Up" : 38,
        "Right" : 39,
        "Down" : 40
    }
    for(var key in KeySetting) {
        if(elemkey == KeySetting[key]) {
            Command = key;
            UserCommand(Command);
            break;
        }
    }
}

function RequestGameData() {
    var data = GetData();
    var dataChecked = edgeCheckAndCorrect(data);
    Render(dataChecked);
}

function IsOutOfEdge(elemPlaneCord) {
    var checkX = elemPlaneCord[0];
    var checkY = elemPlaneCord[1];
    if(checkX < 0 ||
        checkX > (EngineLayer.mapSize[0] - EngineLayer.planeSize[0]) ||
        checkY > (EngineLayer.mapSize[1] - EngineLayer.planeSize[1]) ||
        checkY < 0) {
        return true;
    }
    return false;
}

//--------------------------------------------------------------

function edgeCheckAndCorrect(data) {
    var forCheck = JSON.parse(data);
    var bulletCheck = forCheck["bullet"];
    var checkedBullet = checkBullet(bulletCheck);
    data = {
        "plane" : forCheck["plane"],
        "bullet" : checkedBullet
    }
    data = JSON.stringify(data);
    return data;
}

function checkBullet(elemBulletArr) {
    for(;;) {
        arrLen = elemBulletArr.length;
        if (0 == arrLen) {
            break;
        }

        // remove outrange
        if(elemBulletArr[arrLen-1][1] <= 0 ) {
            elemBulletArr.pop();
        }

        else {
            break;
        }
    }
    return elemBulletArr;
}
