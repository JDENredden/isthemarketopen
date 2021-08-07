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

function obj(id){
    return document.getElementById(id);
}

var exchanges = {
    "nyse" : {
        "nameLong" : "New York Stock Exchange",
        "nameShort" : "NYSE",
        "timeZone" : "America/New_York",
        "openDays" : [1, 2, 3, 4, 5],
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
        "openDays" : [1, 2, 3, 4, 5],
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
    },
    "hkse" : {
        "nameLong" : "Hong Kong Stock Exchange",
        "nameShort" : "HKEX",
        "timeZone" : "Asia/Hong_Kong",
        "openDays" : [1, 2, 3, 4, 5],
        "sessions" : {
            "pre" : {
                "name" : "Pre-Opening",
                "openHour" : 9,
                "openMinute" : 0,
                "duration" : 30
            },
            "core" : {
                "name" : "Morning",
                "openHour" : 9,
                "openMinute" : 30,
                "duration" : 150 
            },
            "lunch" : {
                "name" : "Lunch",
                "openHour" : 12,
                "openMinute" : 0,
                "duration" : 60
            },
            "core2" : {
                "name" : "Afternoon",
                "openHour" : 13,
                "openMinute" : 0,
                "duration" : 180,
            },
            "after" : {
                "name" : "Closing Auction",
                "openHour" : 16,
                "openMinute" : 0,
                "duration" : 10
            }
        }
    },
    "asx" : {
        "nameLong" : "Australian Stock Exchange",
        "nameShort" : "ASX",
        "timeZone" : "Australia/Sydney",
        "openDays" : [1, 2, 3, 4, 5],
        "sessions" : {
            "pre" : {
                "name" : "Pre-Open",
                "openHour" : 7,
                "openMinute" : 0,
                "duration" : 180
            },
            "core" : {
                "name" : "Normal",
                "openHour" : 10,
                "openMinute" : 0,
                "duration" : 360 
            },
            "preAuction" : {
                "name" : "Pre-Closing Single Price Auction",
                "openHour" : 16,
                "openMinute" : 0,
                "duraton" : 10
            },
            "auction" : {
                "name" : "Closing Single Price Auction",
                "openHour" : 16,
                "openMinute" : 10,
                "duration" : 2
            },
            "adjuust" : {
                "name" : "Adjust",
                "openHour" : 16,
                "openMinute" : 12,
                "duration" : 158
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

const buildAcronym = (str = '') => {
    const strArr = str.split(' ');
    let res = '';
    strArr.forEach(el => {
        const [char] = el;
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
            res += char;
        };
    });
    return res;
};

function createTableData(exchange, exchangeTime) {
    let tableData = [];
    // numberOfSessions = Object.keys(exchange.sessions).length;
    let data = Object.keys(exchange.sessions);
    // let formatting = DateTime.TIME_24_SIMPLE;
    let formatting = "hh':'mm' 'a";
    
    for (key of data) {
        let sessionData = {};
        let session = exchange.sessions[key];
        let sessionOpen = exchangeTime.set({ 
            hour: session.openHour, 
            minute: session.openMinute, 
            second: 0 
        });
        let sessionClose = sessionOpen.plus({ minute: session.duration });
        
        sessionData["className"] = key;
        sessionData["Session"] = session.name;
        // sessionData["Exchange Time"] = sessionOpen.toFormat(formatting).replace(/^0+/, '\xa0') + " - " + sessionClose.toFormat(formatting).replace(/^0+/, '\xa0');
        // sessionData["Local Time"] = sessionOpen.setZone(localTimeZone).toFormat(formatting).replace(/^0+/, '\xa0') + " - " + sessionClose.setZone(localTimeZone).toFormat(formatting).replace(/^0+/, '\xa0');
        sessionData["Exchange Time (" + buildAcronym(sessionOpen.toFormat("ZZZZZ")) + ")"] = sessionOpen.toFormat(formatting).toLowerCase() + " - " + sessionClose.toFormat(formatting).toLowerCase();
        sessionData["Local Time (" + buildAcronym(localTime.toFormat("ZZZZZ")) + ")"] = sessionOpen.setZone(localTimeZone).toFormat(formatting).toLowerCase() + " - " + sessionClose.setZone(localTimeZone).toFormat(formatting).toLowerCase();
        // sessionData["Exchange Time"] = "<span>" + sessionOpen.toLocaleString(DateTime.TIME_SIMPLE) + "</span>" + " - " + "<span>" + sessionClose.toLocaleString(DateTime.TIME_SIMPLE) + "</span>";
        // sessionData["Local Time"] = "<span>" + sessionOpen.setZone(localTimeZone).toLocaleString(DateTime.TIME_SIMPLE) + "</span>" + " - " + "<span>" + sessionClose.setZone(localTimeZone).toLocaleString(DateTime.TIME_SIMPLE) + "</span>";
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
        if (key == "className") {
            continue;
        }
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        row.setAttribute("class", element.className);
        for (key in element) {
            if (key == "className") {
                continue;
            }
            let cell = row.insertCell();
            
            if (key.includes("Time")) {
                cell.setAttribute("class", "time");   
            }
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
let currentTable = document.getElementById("lseTable");

let exchangeData = Object.keys(exchanges);
let container = document.getElementById("tableContainer");


function isThisDayATradingDay(exchange, day) {
    if (exchange.openDays.includes(day.weekday)) {
        return true;
    } else {
        return false;
    }
}

function isExchangeOpen(exchange, day = 0) {
    if (day == 0) {
        day = localTime.setZone(exchange.timeZone).plus({ days: 3 });
    }
    
    // let exchangeTime = exchange.sessions.core;
    // if (exchange.sessions.includes("lunch"))
    normalTrading = exchange.sessions.core;
    
    let open = day.set({ 
        hour: normalTrading.openHour, 
        minute: normalTrading.openMinute, 
        second: 0 
    });
    
    let close = open.plus({ minutes: normalTrading.duration });

    if (isThisDayATradingDay(exchange, day)) {
        
        if (day > open && day < close) {
            return true;
        } 
        else {
            return false;
        }
    }
    else {
        return false;
    }
    
// // if (!exchangeTime) {
//     // console.log("ExchangeTime: " + localTime.setZone(exchange.timeZone).weekday)
//     exchangeTime = localTime.setZone(exchange.timeZone).plus({ days: days });
//     // console.log("ExchangeTime + days: " + exchangeTime.weekday)
//     // console.log("Include " + exchange.openDays.includes(exchangeTime.weekday))
//     // console.log(exchangeTime);
// // }
// 
// // let exchangeTime = exchange.sessions.core;
// 
// 
// 
// 
// // if (exchange.sessions.includes("lunch"))
// normalTrading = exchange.sessions.core;
// 
// let open = exchangeTime.set({ 
//     hour: normalTrading.openHour, 
//     minute: normalTrading.openMinute, 
//     second: 0 
// });
// 
// let close = open.plus({ minutes: normalTrading.duration });
// 
// console.log(exchangeTime.diff(open).as('hours'));
// console.log(exchangeTime.diff(close).as('hours'));
// 
// openDiff = exchangeTime.diff(open);
// closeDiff = exchangeTime.diff(close);
// 
// // if (exchangeTime > open && exchangeTime < close) {
//     if (openDiff >= 0 && closeDiff <=0 ) {
//         return true;
//         exit;
//     } else {
//         return false;
//     }
// } else {
//     return false;
// }

}

// for (let days = 0; days < 1; days++) {
//         exchangeOpen = isExchangeOpen(exchanges.nyse, days);
//         console.log("do: " + exchangeOpen);
// 
//     }

// console.log(isExchangeOpen(exchanges.nyse, 3));

// console.log("1: " + exchangeTime.plus({ days: 1 }).toLocaleString(DateTime.TIME_SIMPLE));

for (key of exchangeData) {
    let exchange = exchanges[key];
    let exchangeTime = localTime.setZone(exchange.timeZone);
    let exchangeOpenOnThisDay = isThisDayATradingDay(exchange, exchangeTime);
    let exchangeOpen = isExchangeOpen(exchanges[key], exchangeTime);


    // Check if exchange open and adjust relative times
    // days = 0;
    do {
        console.log("do: " + exchangeOpen);
        exchangeOpenOnThisDay = isThisDayATradingDay(exchanges[key], exchangeTime);
        exchangeTime = exchangeTime.plus({ days: 1 });
    }
    while (!exchangeOpenOnThisDay);
    
    // days = 0;
    // for (let days = 0; days < 5; days++) {
    //     console.log("do: " + exchangeOpen);
    //     exchangeOpen = isExchangeOpen(exchanges[key], days);
    // }

    
    let li = document.createElement("li");
    li.setAttribute("id", exchange.nameShort.toLowerCase());

    let tableData = createTableData(exchange, exchangeTime);
    console.log(tableData);
    let table = document.createElement('table');
    let title = document.createElement("h2");
    let subHead = document.createElement("h3");
    // subHead.innerHTML = "The " + exchange.nameShort + " is open for regular trading " + tableData. + " "
    title.innerHTML = exchange.nameLong + " open: " + exchangeOpen;
    container.appendChild(title);
    table.setAttribute("id", exchange.nameShort.toLowerCase() + "Table");
    li.appendChild(table);
    container.appendChild(li);
    
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