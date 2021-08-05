let DateTime = luxon.DateTime;

// var start = DateTime.now();
// setInterval(function() {
//     var delta = DateTime.now() - start; // milliseconds elapsed since start
//     …
//     output(Math.floor(delta / 1000)); // in seconds
//     // alternatively just show wall clock time:
//     output(new Date().toUTCString());
// }, 1000); // update about every second

var interval = 60000; // ms
var expected = Date.now() + interval;
var localTime= DateTime.now();
// setTimeout(step, interval);
// function step() {
//     var dt = Date.now() - expected; // the drift (positive for overshooting)
//     if (dt > interval) {
//         // something really bad happened. Maybe the browser (tab) was inactive?
//         // possibly special handling to avoid futile "catch up" run
//     }


var exchanges = {
    "nyse" : {
        "nameLong" : "New York Stock Exchange",
        "nameShort" : "NYSE",
        "timeZone" : "America/New_York",
        "sessions" : {
            "pre" : {
                "openHour" : 6,
                "openMinute" : 30,
                "duration" : 180
            },
            "core" : {
                "openHour" : 9,
                "openMinute" : 30,
                "duration" : 390 
            },
            "after" : {
                "openHour" : 4,
                "openMinute" : 0,
                "duration" : 240 
            }
        }
    }
}

console.log("JSON Test");
console.log(exchanges.nyse.nameLong);
console.log(Object.keys(exchanges.nyse.sessions).length);
console.log(exchanges.nyse.sessions.pre.openHour);

localTime = localTime.plus({seconds: 1});

let exchangeTime = localTime.setZone("America/New_York");
    let preSessionDuration = 180; //minutes
    let coreSessionDuration = 390;
    let afterSessionDuration = 240;
    console.log(exchangeTime);
    console.log(localTime.toString());
    
    var zone = exchangeTime.zoneName;
    
    document.getElementById("location").innerHTML = exchangeTime.zoneName.split("/")[1];
    document.getElementById("time").innerHTML = exchangeTime.toLocaleString(DateTime.TIME_SIMPLE);
    
    document.getElementById("localLocation").innerHTML = localTime.zoneName.split("/")[1];
    document.getElementById("localTime").innerHTML = localTime.toLocaleString(DateTime.TIME_SIMPLE);
    
    preOpen = exchangeTime.set({ hour: 6, minute: 30, second: 0 });
    preClose = preOpen.plus({ minutes: preSessionDuration });
    open = exchangeTime.set({ hour: 9, minute: 30, second: 0 });
    close = open.plus({ minutes: coreSessionDuration });
    afterOpen = exchangeTime.set({ hour: 16, minute: 0, second: 0 });
    afterClose = afterOpen.plus({ minutes: afterSessionDuration });
    // console.log(preOpen);
    // console.log(preOpen.diff(exchangeTime, 'minutes').toObject().minutes);
    // console.log(preClose);
    
    if (exchangeTime > open && exchangeTime < close) {
        var marketStatus = "Yes";
        var marketStatusVerb = "closes";
        var marketStatusTime = close.toRelative({ unit: [ "hours", "minutes"] });
    } else {
        var marketStatus = "No";
        var marketStatusVerb = "opens";
        var marketStatusTime = open.toRelative({ unit: [ "hours", "minutes"] });
    }
    
    document.getElementById("status").innerHTML = marketStatus;
    document.getElementById("statusVerb").innerHTML = marketStatusVerb;
    document.getElementById("statusTime").innerHTML = marketStatusTime;
    
    document.getElementById("coreOpen").innerHTML = open.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("coreClose").innerHTML = close.toLocaleString(DateTime.TIME_SIMPLE);
    
    document.getElementById("localCoreOpen").innerHTML = open.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("localCoreClose").innerHTML = close.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    
    document.getElementById("localCity").innerHTML = localTime.zoneName.split("/")[1];
    document.getElementById("exchangeCity").innerHTML = exchangeTime.zoneName.split("/")[1];
    
    
    
    
    
    document.getElementById("table").rows[1].cells.item(1).innerHTML = preOpen.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[1].cells.item(2).innerHTML = preOpen.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    // document.getElementById("table").rows[1].cells.item(3).innerHTML = preOpen.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
    document.getElementById("table").rows[1].cells.item(3).innerHTML = preOpen.toRelative({ unit: [ "hours", "minutes"] });
    
    document.getElementById("table").rows[2].cells.item(1).innerHTML = preClose.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[2].cells.item(2).innerHTML = preClose.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[2].cells.item(3).innerHTML = preClose.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
    
    document.getElementById("table").rows[3].cells.item(1).innerHTML = open.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[3].cells.item(2).innerHTML = open.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    var openDiff = open.diffNow(['hours', 'minutes']);
    document.getElementById("table").rows[3].cells.item(3).innerHTML = -openDiff.hours + " hours and " + -Math.floor(openDiff.minutes) + " minutes ago";
    
    document.getElementById("table").rows[4].cells.item(1).innerHTML = close.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[4].cells.item(2).innerHTML = close.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[4].cells.item(3).innerHTML = close.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
    
    document.getElementById("table").rows[5].cells.item(1).innerHTML = afterOpen.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[5].cells.item(2).innerHTML = afterOpen.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[5].cells.item(3).innerHTML = afterOpen.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
    
    document.getElementById("table").rows[6].cells.item(1).innerHTML = afterClose.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[6].cells.item(2).innerHTML = afterClose.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[6].cells.item(3).innerHTML = afterClose.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
// expected += interval;
// setTimeout(step, Math.max(0, interval - dt)); // take into account drift
// }