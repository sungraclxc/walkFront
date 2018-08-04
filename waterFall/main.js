window.onload = function() {

    waterfull("album", "main");
    var data = {
        "data" :
            [{ "src": "img/3040204_163613035_2.jpg"},
             { "src": "img/adera.png"},
             { "src": "img/20111121_15600634574657033191250.jpg"},
             { "src": "img/p22.jpg"},
             {"src": "img/Geralt_sword-size_1920x1080.png"},
             {"src": "img/1.png"}]
    };

    window.onscroll = function () {
       if(checkScrollSlide("album")  == true) {
            getDataNShow(data, "main", "album", "img");
           waterfull("album", "main");
           //假设数据变量为data
        }
    }

}

function waterfull(elemClass, elemParent) {
    var getAlbum = document.getElementsByClassName(elemClass);
    var albumWid = getAlbum[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / albumWid);
    document.getElementById(elemParent).style.cssText = "width:" + albumWid*cols + "px";


    var imgHeightArr = [];
    for(var i=0; i< getAlbum.length; i++) {
        if(i<cols) {
            imgHeightArr.push(getAlbum[i].offsetHeight);
        }else {
            var minHeight = Math.min.apply(null,imgHeightArr);
            var varIndex = imgHeightArr.indexOf(minHeight);
            getAlbum[i].style.position = "absolute";
            getAlbum[i].style.top = minHeight + "px";
            getAlbum[i].style.left =albumWid * varIndex + "px";
            imgHeightArr[varIndex] += getAlbum[i].offsetHeight;
            //getAlbum[i].style.left = getAlbum[minAlbum].offsetLeft + "px";
        }
    }
    console.log(imgHeightArr.indexOf(minHeight));
}

function checkScrollSlide(elemClass) {
    var getAlbum = document.getElementsByClassName(elemClass);
    var lastOneHeight = getAlbum[getAlbum.length - 1].offsetTop + Math.floor(getAlbum[getAlbum.length - 1].offsetHeight / 2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var browserHeight = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastOneHeight < browserHeight + scrollTop) ? true:false;
}

function getDataNShow(elemData, elemBoxId, elemDivCls, elemImgCls) {
    var mainMake = document.getElementById(elemBoxId);

    for(var i=0; i<elemData.data.length; i++) {
        var albumMake = document.createElement("div");
        albumMake.className=elemDivCls;
        mainMake.appendChild(albumMake);
        var PicMake = document.createElement("div");
        PicMake.className=elemImgCls;
        albumMake.appendChild(PicMake);
        var imgMake = document.createElement("img");
        imgMake.src = elemData.data[i].src;
        PicMake.appendChild(imgMake);
    }
}