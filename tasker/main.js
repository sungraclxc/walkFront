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
// ============================================== END PUBILC METHOD========================================

setTimeout(connectPHP,100);

var getTask = document.getElementById("taskContent");
var getLabel = document.getElementById("labelContent");
var getStatus = document.getElementById("statusContent");
var cancelLabel = document.getElementById("back");


// get all the task under the label
EventUtil.addHandler(getLabel, "mouseup", function(event) {
    var label = event.target;
    var labelClass = label.className;
    var labelAllChild = getLabel.childNodes;
    for (var i=0; i<labelAllChild.length; i++) {
        if(labelAllChild[i].className !== labelClass) {
            hideThis(i);
        }
    }
    cancelLabel.classList.remove("none");
})

function hideThis(argI) {
    for(var i=0; i<getTask.childNodes.length; i++) {
        if(i === argI) {
            getTask.childNodes[i].classList.add("none");
        }
    }
    for(var i=0; i<getLabel.childNodes.length; i++) {
        if(i === argI) {
            getLabel.childNodes[i].classList.add("none");
        }
    }
    for(var i=0; i<getStatus.childNodes.length; i++) {
        if(i === argI) {
            getStatus.childNodes[i].classList.add("none");
        }
    }

    
}
// cancel choose a label
EventUtil.addHandler(cancelLabel, "mouseup", function(event) {
    for(var i=0; i<getTask.childNodes.length; i++) {
        getTask.childNodes[i].classList.remove("none");
    }
    for(var i=0; i<getLabel.childNodes.length; i++) {
        getLabel.childNodes[i].classList.remove("none");
    }
    for(var i=0; i<getStatus.childNodes.length; i++) {
        getStatus.childNodes[i].classList.remove("none");
    }
    cancelLabel.classList.add("none");
})







/* read from db */ 
function connectPHP() {
    var xhr = createXHR();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            try {
                if ( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 ) {
                    //console.log("connect success");
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
    handleTasks(xhr.responseText)
}

function handleTasks(argText) {
    var createTaskLi = "",
        createLabelLi ="",
        createStatusLi = "";
    var taskArr = argText.split("<br>");

    for (var i=0; i<taskArr.length;i++) {
        if(taskArr[i] !== ""){
            var theTask = taskArr[i];
            var taskInfo = theTask.split(",");
            var aTask = taskInfo[1];
            var status = taskInfo[2];
            var theLabel = taskInfo[3];
            var createNewStatus = whatStatus(status, theLabel);
            if(theLabel == "default") {
                theLabel ="";
            }
            createLabelLi += "<li class='" + theLabel +"'>" + theLabel + "</li>";

            createTaskLi += "<li class='" + theLabel +"'>" + aTask + "</li>";
            createStatusLi += createNewStatus;
            console.log(createStatusLi);
        
    }
    getTask.innerHTML =  createTaskLi;
    getLabel.innerHTML = createLabelLi;
    getStatus.innerHTML = createStatusLi;
}
}

function whatStatus(argStatus, classLa) {
    var statusLi ="";
    if (argStatus === "done") {
        statusLi = "<li class='" + classLa +"'>" + argStatus +"</li>";
    } else if (argStatus === "dated") {
        statusLi = "<li class='" + classLa +"'>" + argStatus +"</li>";
    } else if (argStatus === "progress") {
        statusLi = "<li class='" + classLa +"'>" + argStatus +"</li>";
    } else if (argStatus === "unbein") {
        statusLi = "<li class='" + classLa +"'>" + argStatus +"</li>";
    } else {
        statusLi = "<li class='default'>"> + argStatus + "</li>";
    }
    return statusLi;
}