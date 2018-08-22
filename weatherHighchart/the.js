// =============================================== Public Library =========================================

// xhr compability
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                i, len;

            for (i=0, len = versions.length; i<len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex){

                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}

// ============================================= End Public Library ======================================

window.onload = getData();

function connetPHP() {
    var xhr = createXHR();

    xhr.open("get", "index.php", false);
    xhr.send(null);
    
    if ( xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 ) {
        console.log("connect success");
    } else {
        console.log("connect failed");
    }
    var phpTxt = JSON.parse(xhr.responseText);
    
    var answernMsg = phpTxt["msg"];
    var answerResult = phpTxt["result"];
    return answerResult;
}

function getData() {
    var data = connetPHP();
    console.log(data);
    var city = data.city;
    var weekDays = data.daily;       // 接下来一周概要
    var theDay = data.hourly;        // 接下来24小时天气情况
    
    handleData(theDay, weekDays);
}

function handleData(argHourData, argWeekData) {
    // handle the next 24h data
    var hourlyData = [];
    var hours = [];
    for (var i=0; i<argHourData.length; i++) {
        hourlyData.push(Number(argHourData[i].temp));
        hours.push(argHourData[i].time);
    }
    showHours(hours, hourlyData);
    // handle the next week data
    var weekDays = [];
    var dayshigh = [];
    var dayslow = [];
    for (var i=0; i<argWeekData.length; i++) {
        weekDays.push(argWeekData[i].date + " " + argWeekData[i].week);
        dayshigh.push(Number(argWeekData[i].day.temphigh));
        dayslow.push(Number(argWeekData[i].night.templow));
    }
    showAWeek(weekDays, dayshigh, dayslow);
    
}

function showAWeek(argDays, argHigh, argLow) {
    var dayWrapper = document.getElementById("aWeek");
    var options = {
        chart: {
            type: 'line'
        },
        title: {
            text: '七天气温变化'
        },
        xAxis: {
            categories: argDays
        },
        yAxis: {
            title: {
                text: '气温 (°C)'
            }
        },
        plotOptions: {
            line: {
                // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                enableMouseTracking: true
            }
        },
        series: [{
            name: '一天最高气温',
            data: argHigh
        }, {
            name: '一天最低气温',
            data: argLow
        }]
    };
    Highcharts.chart(dayWrapper, options);
}

function showHours(argHour, argHourTemp) {
    var hourWrapper = document.getElementById("hourly");
    var options = {
        chart: {
            type: 'line'
        },
        title: {
            text: '24小时平均气温'
        },
        xAxis: {
            categories: argHour
        },
        yAxis: {
            title: {
                text: '气温 (°C)'
            }
        },
        plotOptions: {
            line: {
                // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                enableMouseTracking: true
            }
        },
        series: [{
            name: 'temperature',
            data: argHourTemp
        }]
    };
    Highcharts.chart(hourWrapper, options);
}