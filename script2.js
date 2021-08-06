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
localTimeZone = DateTime.local().zoneName;

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
    },
    "lse" : {
        "nameLong" : "London Stock Exchange",
        "nameShort" : "LSE",
        "timeZone" : "Europe/London",
        "sessions" : {
            "pre" : {
                "name" : "Pre-Trading",
                "openHour" : 5,
                "openMinute" : 5,
                "duration" : 165
            },
            "core" : {
                "name" : "Core",
                "openHour" : 8,
                "openMinute" : 0,
                "duration" : 240 
            },
            "lunch" : {
                "name" : "Lunch",
                "openHour" : 12,
                "openMinute" : 0,
                "duration" : 2
            },
            "core2" : {
                "name" : "Core",
                "openHour" : 12,
                "openMinute" : 2,
                "duration" : 238,
            },
            "after" : {
                "name" : "Post Market",
                "openHour" : 16,
                "openMinute" : 40,
                "duration" : 35 
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
    // numberOfSessions = Object.keys(exchange.sessions).length;
    let data = Object.keys(exchange.sessions);
    
    for (key of data) {
        let sessionData = {};
        let session = exchange.sessions[key];
        let sessionOpen = exchangeTime.set({ 
            hour: session.openHour, 
            minute: session.openMinute, 
            second: 0 
        });
        let sessionClose = sessionOpen.plus({ minute: session.duration });
        
        sessionData["Session"] = session.name;
        sessionData["Exchange Time"] = sessionOpen.toLocaleString(DateTime.TIME_SIMPLE) + " - " + sessionClose.toLocaleString(DateTime.TIME_SIMPLE);
        sessionData["Local Time"] = sessionOpen.setZone(localTimeZone).toLocaleString(DateTime.TIME_SIMPLE) + " - " + sessionClose.setZone(localTimeZone).toLocaleString(DateTime.TIME_SIMPLE);
        sessionData["Relative Open"] = sessionOpen.toRelative({ unit: [ "hours", "minutes"] });
        sessionData["Relative Close"] = sessionClose.toRelative();
        
        tableData.push(sessionData);
    }
    return tableData;
}

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
let currentTable = document.getElementById("lseTable");

let exchangeData = Object.keys(exchanges);
for (key of exchangeData) {
    let exchange = exchanges[key];
    let exchangeTime = localTime.setZone(exchange.timeZone);



    
    let tableData = createTableData(exchange, exchangeTime);
    
    let table = document.createElement('table');
    table.setAttribute("id", exchange.nameShort);
    document.body.insertBefore(table, currentTable);
    generateTable(table, tableData);
    generateTableHead(table, Object.keys(tableData[0]));
    
    // let table = document.getElementById("testTable");
    // let data = Object.keys(tableData[0])
    // generateTable(table, tableData);
    // generateTableHead(table, data);
    // 
    // let lseExchangeTime = localTime.setZone(exchanges.lse.timeZone);
    // let lseTableData = createTableData(exchanges.lse, lseExchangeTime);
    // let lseTable = document.getElementById("lseTable");
    // let lseData = Object.keys(lseTableData[0])
    // generateTable(lseTable, lseTableData);
    // generateTableHead(lseTable, lseData);
}


// expected += interval;
// setTimeout(step, Math.max(0, interval - dt)); // take into account drift
// }