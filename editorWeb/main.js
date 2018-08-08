// ============================================ Public Method Library ==========================================

var EventUtil = {

    // 事件处理兼容：DOM0,2,IE
    addHandler: function (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
      } else {
        element['on' + type] = handler;
      }
    },
  
    removeHandler: function (element, type, handler) {
      if (element.removeEventListner) {
        element.removeEventListner(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler);
      } else {
        element['on' + type] = null;
      }
    },
  
    // event对象
    getEvent: function (event) {
      return event || window.event;
    },
    // target 获得事件实际对象
    getTarget: function (event) {
      return event.target || event.srcElement;
    },
    // 阻止事件默认程序
    preventDefault: function (event) {
      if (event.preventDefault) {
        event.preventDefault()
      } else {
        event.returnValue = false;
      }
    },
    // 停止传播
    stopPropagation: function (event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
  
    // 获得鼠标按钮事件
    // 0：主鼠标，1：中间按钮，2：次鼠标
    getButton: function(event) {
      if(document.implementation.hasFeature("MouseEvents", "2.0")) {
        return event.button;
      } else {
        switch (event.button) {
          case 0:
          case 1:
          case 3:
          case 5:
          case 7:
            return 0;
          case 2:
          case 6:
            return 2;
          case 4:
            return 1;
        }
      }
    },
  
    // 获得鼠标滚轮增量
    getWheelDelta: function (event) {
      if (event.wheelDelta) {
        return ( client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta );
      } else {
        return -event.detail * 40;
      }
    },
  
    // 获得键盘编码
    getCharCode: function (event) {
      if (typeof event.charCode == "number") {
        return event.charCode;
      } else {
        return event.keyCode;
      }
    },
  
    // 剪贴板事件
    // 获取剪贴板文本
    getClipboardText: function(event) {
      var clipboardData = (event.clipboardData || window.clipboardData);
      return clipboardData.getData("text");
    },
    // 设置剪贴板文本
    setClipboardText: function(event, value) {
      if (event.clipboardData) {
        return event.clipboardData.setData("text/plain", value);
      } else if (window.clipboardData) {
        return window.clipboardData.setData("text", value);
      }
    }  
  }

// =========================================== End Public Method Library =======================================

var scriptNode = document.createElement("script");

var runBtn = document.getElementById("runBtn");

var htmlCode = document.getElementById("htmlCode");
var jsCode = document.getElementById("jsCode");
var cssCode = document.getElementById("cssCode");

var resultBox = document.getElementById("result");

EventUtil.addHandler(runBtn, "mouseup", function (event) {
    showHTML();
    runJS();
    // runCSS();
})

// html code
function showHTML() {
    var code = htmlCode.innerHTML;
    var result = handleCode(code);
    resultBox.innerHTML = "";
    resultBox.innerHTML = result;
}

function handleCode(argCode) {
    var result = argCode.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/, "&");
    return result;
}
// javascript code
function runJS() {
    var code = jsCode.innerHTML;
    code = handleCode(code);
    var script = document.createElement('script');
    script.type="text/javascript";
    script.text=code;
    document.getElementsByTagName('head')[0].appendChild(script);
    document.head.removeChild(document.head.lastChild);
}
//css code
// building.....
function runCSS() {
    var code = cssCode.innerHTML;
    code = handleCode(code);
    var test = "h1 {color:red;}";
    var style = document.createElement('style');
    style.type = "text/style";
    document.getElementsByTagName('head')[0].appendChild(style);
    var getStyle = document.getElementsByTagName("style")[0];
    //document.head.removeChild(document.head.lastChild);
}