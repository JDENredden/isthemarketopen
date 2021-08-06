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
                "name" : "Pre-Market",
                "openHour" : 6,
                "openMinute" : 30,
                "duration" : 180
            },
            "core" : {
                "name" : "Core",
                "openHour" : 9,
                "openMinute" : 30,
                "duration" : 390 
            },
            "after" : {
                "name" : "After-Market",
                "openHour" : 16,
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
console.log(exchanges.nyse.sessions[1]);

localTime = localTime.plus({seconds: 1});

let exchangeTime = localTime.setZone(exchanges.nyse.timeZone);
let preSessionDuration = exchanges.nyse.sessions.pre.duration; //minutes
let coreSessionDuration = exchanges.nyse.sessions.core.duration;
let afterSessionDuration = exchanges.nyse.sessions.after.duration;
console.log(exchangeTime);
console.log(localTime.toString());

var zone = exchangeTime.zoneName;

document.getElementById("location").innerHTML = exchangeTime.zoneName.split("/")[1];
document.getElementById("time").innerHTML = exchangeTime.toLocaleString(DateTime.TIME_SIMPLE);

document.getElementById("localLocation").innerHTML = localTime.zoneName.split("/")[1];
document.getElementById("localTime").innerHTML = localTime.toLocaleString(DateTime.TIME_SIMPLE);

preOpen = exchangeTime.set({ hour: exchanges.nyse.sessions.pre.openHour, minute: exchanges.nyse.sessions.pre.openMinute, second: 0 });
preClose = preOpen.plus({ minutes: preSessionDuration });
open = exchangeTime.set({ hour: exchanges.nyse.sessions.core.openHour, minute: exchanges.nyse.sessions.core.openMinute, second: 0 });
close = open.plus({ minutes: coreSessionDuration });
afterOpen = exchangeTime.set({ hour: exchanges.nyse.sessions.after.openHour, minute: exchanges.nyse.sessions.after.openMinute, second: 0 });
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

function createTableData(exchange, exchangeTime) {
    var tableData = [];
    numberOfSessions = Object.keys(exchange.sessions).length;
    let data = Object.keys(exchange.sessions);
    
    for (key of data) {
        let sessionData = {};
        let session = exchange.sessions[key];
        let sessionOpen = exchangeTime.set({ 
            hour: session.openHour, 
            minute: session.openMinute, 
            second: 0 
        });
        
        sessionData["Session"] = session.name;
        sessionData["Exchange Time"] = sessionOpen.toLocaleString(DateTime.TIME_SIMPLE);
        sessionData["Local Time"] = sessionOpen.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
        sessionData["Relative Time"] = sessionOpen.toRelative({ unit: [ "hours", "minutes"] });
        
        tableData.push(sessionData);
    }
    return tableData;
}



let tableData = createTableData(exchanges.nyse, exchangeTime);
// console.log(tableDataTest);
    
// let tableData = [
//     { 
//         "Session": exchanges.nyse.sessions.pre.name, 
//         "Exchange Time": preOpen.toLocaleString(DateTime.TIME_SIMPLE), 
//         "Local Time": preOpen.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE), 
//         "Relative Time": preOpen.toRelative({ unit: [ "hours", "minutes"] })
//     },
//     {
//         "Session": exchanges.nyse.sessions.core.name, 
//         "Exchange Time": open.toLocaleString(DateTime.TIME_SIMPLE), 
//         "Local Time": open.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE), 
//         "Relative Time": open.toRelative({ unit: [ "hours", "minutes"] })
//     },
//     {
//         "Session": exchanges.nyse.sessions.after.name, 
//         "Exchange Time": afterOpen.toLocaleString(DateTime.TIME_SIMPLE), 
//         "Local Time": afterOpen.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE), 
//         "Relative Time": afterOpen.toRelative({ unit: [ "hours", "minutes"] })
//     }
// ]

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

let table = document.getElementById("testTable");
let data = Object.keys(tableData[0])
generateTable(table, tableData);
generateTableHead(table, data);



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
// document.getElementById("table").rows[3].cells.item(3).innerHTML = -openDiff.hours + " hours and " + -Math.floor(openDiff.minutes) + " minutes ago";
document.getElementById("table").rows[3].cells.item(3).innerHTML = open.toRelative({ unit: [ "hours", "minutes"] });

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