// =============================================== PUBLIC METHOD ===============================================

function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.ActiveXString != "string") {
            var versions = [ " MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP" ],
                i, len;

            for ( i =0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.ActiveXString = versions[i];
                    break;
                } catch (ex) {
                    //
                }
            }
        }
        return new ActiveXObject(arguments.callee.ActiveXString);
    } else {
        throw new Error("No XHR object available.");
    }
}

var EventUtil =  {
    // =====================add/remove Event Handler=======================
    addHandler: function(element, type, handler) {
        if (element.addEventListner) {
            element.addEventListner(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    removeHandler: function(element, type, handler) {
        if (element.addEventListner) {
            element.removeEventListner(type, handler, false);
        } else if (element.attachEvent) {
            element.dettachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    // ==================================================================
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.getTarget || event.srcElement;
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    // ======================== Get Mouse Code =========================
    getButton: function(event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch(event.button) {
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
    // ======================== Get Wheel Event =======================
    getWheelDelta: function(event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? 
                    -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    // =========================== Get Key Code =======================
    getCharCode: function(event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }
}

function serialize(form) {
    var parts = [],
        field = null,
        i, len, j, optLen, option, optValue;

    for (i=0, len=form.elements.length; i<len; i++) {
        field = form.elements[i];

        switch(field.type) {
            case "select-one":
            case "select-multiple":
                if (field.name.length) {
                    for (j=0, optLen = field.options.length; j<optLen; j++) {
                        option = field.options[j];
                        if(option.selected) {
                            optValue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ? 
                                            option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ?
                                            option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" +
                                       encodeURIComponent(optValue));
                        }
                    }
                }
                break;

            case undefined:
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;
            case "radio":
            case "checkbox":
                if(!field.checked) {
                    break;
                }
            default:
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" + 
                               encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
}
// ============================================== END PUBILC METHOD============================================

window.onload = readDB();

var barrageBtn = document.getElementById("barrageIn");

// input into database
EventUtil.addHandler(barrageBtn, "mouseup", function(event) {
    var inputValue = document.getElementById("cmtIn").value;
    var getInput = document.getElementById("cmtIn");
    var event = EventUtil.getEvent(event);
    var getForm = document.getElementById("formA");
    EventUtil.preventDefault(event);
    if(inputValue !== "") {
        var serialized = serialize(getForm);

        var xhr = createXHR();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                try {
                    if ( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 ) {
                        console.log("connect success");
                    } else {
                        console.log("connect Error");
                    }
                } catch (ex) {
                    //
                }
            } 
        }
        xhr.open("POST", "index.php", false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(serialized);
        console.log(xhr.responseText);
        } else {
            console.log("can not be null");
        }
    getInput.value="";
    readDB();
});
// end into


// read from database
function readDB() {
    var barrageList = [];
    var getUl =document.getElementById("showUl");
    var dbContent =new Array();
    var dbCon = new Array();
    var xhr = createXHR();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            try {
                if ( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 ) {
                    console.log("connect success");
                } else {
                    console.log("connect Error");
                }
            } catch (ex) {
                //
            }
        } 
    }
    xhr.open("get", "index.php", false);
    //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(null);

    var resTxt = xhr.responseText;
    dbContent = resTxt.split(",");
    //console.log(dbContent);
    for (var i=0; i<dbContent.length; i++) {
        if(dbContent[i] !== "") {
            dbCon.push(dbContent[i]);
        }
    }
    for (var i=0; i<dbCon.length; i++) {
        var item = createContent(dbCon[i]);
        barrageList.push(item);
    }
    appendInto(barrageList);
    
}
// end read and go to show

function createContent(argList) {
    var every ="<li>" + argList + "</li>";
    return every;
}

function appendInto(argArr) {
    var getUl =document.getElementById("showUl");
    var test = "<li>test</li>";
    var list = argArr.join("");
    console.log(list);
    getUl.innerHTML = list;
}


