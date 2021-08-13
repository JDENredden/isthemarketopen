


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
                "name" : "Pre-Trading",
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
                "name" : "Extended Hours",
                "openHour" : 16,
                "openMinute" : 0,
                "duration" : 240 
            }
        }
    },
    "nasdaq" : {
        "nameLong" : "Nasdaq Stock Exchange",
        "nameShort" : "Nasdaq",
        "timeZone" : "America/New_York",
        "openDays" : [1, 2, 3, 4, 5],
        "sessions" : {
            "pre" : {
                "name" : "Opening",
                "openHour" : 4,
                "openMinute" : 30,
                "duration" : 270
            },
            "core" : {
                "name" : "Core",
                "openHour" : 9,
                "openMinute" : 30,
                "duration" : 390 
            },
            "after" : {
                "name" : "Extended Hours",
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
        "emoji" : ":flag-gb:",
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
            "adjust" : {
                "name" : "Adjust",
                "openHour" : 16,
                "openMinute" : 12,
                "duration" : 158
            }
        }
    },
    "jse" : {
        "nameLong" : "Tokyo Stock Exchange",
        "nameShort" : "JPX",
        "timeZone" : "Asia/Tokyo",
        "openDays" : [1, 2, 3, 4, 5],
        "sessions" : {
            "core" : {
                "name" : "Morning",
                "openHour" : 9,
                "openMinute" : 0,
                "duration" : 150 
            },
            "lunch" : {
                "name" : "Lunch",
                "openHour" : 11,
                "openMinute" : 30,
                "duration" : 60
            },
            "core2" : {
                "name" : "Afternoon",
                "openHour" : 12,
                "openMinute" : 30,
                "duration" : 150
            }
        }
    },
    "tsx" : {
        "nameLong" : "Toronto Stock Exchange",
        "nameShort" : "TSX",
        "timeZone" : "America/Toronto",
        "openDays" : [1, 2, 3, 4, 5],
        "sessions" : {
            "core" : {
                "name" : "Continuous Trading",
                "openHour" : 9,
                "openMinute" : 30,
                "duration" : 390 
            },
            "after" : {
                "name" : "Extended Hours",
                "openHour" : 16,
                "openMinute" : 15,
                "duration" : 45
            }
        }
    },
    "psx" : {
        "nameLong" : "Paris Stock Exchange",
        "nameShort" : "PSX",
        "timeZone" : "Europe/Paris",
        "openDays" : [1, 2, 3, 4, 5],
        "sessions" : {
            "core" : {
                "name" : "Trading",
                "openHour" : 9,
                "openMinute" : 0,
                "duration" : 510 
            },
            "after" : {
                "name" : "Trading at Last",
                "openHour" : 17,
                "openMinute" : 35,
                "duration" : 5
            }
        }
    },
    "nze" : {
        "nameLong" : "New Zealand Stock Exchange",
        "nameShort" : "NZE",
        "timeZone" : "Pacific/Auckland",
        "openDays" : [1, 2, 3, 4, 5],
        "sessions" : {
            "core" : {
                "name" : "Normal",
                "openHour" : 10,
                "openMinute" : 0,
                "duration" : 405 
            }
        }
    },
    "six" : {
        "nameLong" : "Swiss Stock Exchange",
        "nameShort" : "SIX",
        "timeZone" : "Europe/Zurich",
        "openDays" : [1, 2, 3, 4, 5],
        "sessions" : {
            "core" : {
                "name" : "Trading",
                "openHour" : 8,
                "openMinute" : 30,
                "duration" : 530 
            },
            "after" : {
                "name" : "Post-Trading",
                "openHour" : 18,
                "openMinute" : 15,
                "duration" : 225
            }
        }
    },
    "btc" : {
        "nameLong" : "Bitcoin Exchanges",
        "nameShort" : "BTC",
        "timeZone" : "Europe/London",
        "openDays" : [1, 2, 3, 4, 5, 6, 7],
        "sessions" : {
            "core" : {
                "name" : "24/7 Trading",
                "openHour" : 0,
                "openMinute" : 0,
                "duration" : 1440 
            }
        }
    },
    "lme" : {
        "nameLong" : "London Metal Exchange",
        "nameShort" : "LME",
        "timeZone" : "Europe/London",
        "openDays" : [1, 2, 3, 4, 5],
        "sessions" : {
            "core" : {
                "name" : "LMEselect",
                "openHour" : 13,
                "openMinute" : 0,
                "duration" : 240 
            },
            "core2" : {
                "name" : "LMEprecious",
                "openHour" : 13,
                "openMinute" : 0,
                "duration" : 420
            },
            "ring" : {
                "name" : "1st Ring",
                "openHour" : 11,
                "openMinute" : 40,
                "duration" : 45
            },
            "ring2" : {
                "name" : "2nd Ring (Officials)",
                "openHour" : 12,
                "openMinute" : 30,
                "duration" : 45
            },
            "kerb" : {
                "name" : "Kerb Trading",
                "openHour" : 13,
                "openMinute" : 25,
                "duration" : 80
            },
            "ring3" : {
                "name" : "3rd Ring",
                "openHour" : 14,
                "openMinute" : 55,
                "duration" : 40
            },
            "ring4" : {
                "name" : "4th Ring (Unofficials)",
                "openHour" : 15,
                "openMinute" : 40,
                "duration" : 35
            },
            "kerb2" : {
                "name" : "Kerb Trading",
                "openHour" : 16,
                "openMinute" : 15,
                "duration" : 45
            }
        }
    },
    "cme" : {
        "nameLong" : "Chicago Mercantile Exchange",
        "nameShort" : "CME GLOBEX",
        "timeZone" : "America/Chicago",
        "openDays" : [2, 3, 4, 5, 6, 7],
        "sessions" : {
            "pre" : {
                "name" : "Pre-Open",
                "openHour" : 16,
                "openMinute" : 45,
                "duration" : 15
            },
            "core" : {
                "name" : "Weekday",
                "openHour" : 17,
                "openMinute" : 0,
                "duration" : 1380
            }
        }
    }
}

console.log("JSON Test");
console.log(exchanges.nyse.nameLong);
console.log(Object.keys(exchanges.nyse.sessions).length);
console.log(exchanges.nyse.sessions.pre.openHour);
console.log(exchanges.nyse.sessions[1]);

localTime = DateTime.now();

let exchangeTime = DateTime.now();
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

function whatSessionIsOpen(exchange, day) {
    sessions = Object.keys(exchange.sessions);
    
    var openSessions = [];
    
    for (key of sessions) {
        let session = exchange.sessions[key];
        
        let open = day.set({ 
            hour: session.openHour, 
            minute: session.openMinute, 
            second: 0 
        });
        
        if (luxon.Duration.fromObject({ minutes: session.duration }).as("hours") > 12 && luxon.Duration.fromObject({ minutes: session.duration }).as("hours") < 24) {
            // if (luxon.Duration.fromObject({ minutes: session.duration }).as("hours") > 12) {
            open = open.plus({days: -1});   
        }
        
        let close = open.plus({ minutes: session.duration });
        if (exchange.nameShort == "CME") {
         console.log(exchange.nameShort +" "+close.toFormat("hh':'mm''a ccc"))
         console.log(day < close)
         // console.log("day > open: " + day > open +" day < close: "+day < close)   
        }
    
        if (isThisDayATradingDay(exchange, day)) {
            
            if (day > open && day < close) {
                openSessions.push(session);
            } 
            else {
                continue;
            }
        }
        else {
            continue;
        }
    }
    if (openSessions.length === 0) {
        openSessions.push(session = { 
            "name" : "Closed"
            })
    }
    return openSessions;
}

function createTableData(exchange, exchangeTime, daysTilNextOpen) {
    let tableData = [];
    // numberOfSessions = Object.keys(exchange.sessions).length;
    let data = Object.keys(exchange.sessions);
    // let formatting = DateTime.TIME_24_SIMPLE;
    let formatting = "hh':'mm''a";
    
    let openSessions = whatSessionIsOpen(exchange, exchangeTime);
    
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
        // sessionData["Local Time"] = "<span>" + sessionOpen.setZone(localTimeZone).toLocaleString(DateTime.TIME_SIMPLE) + "</span>" + " - " + "<span>" + sessionClose.setZone(localTimeZone).toLocaleString(DateTime.TIME_SIMPLE) + "</span>";\
        
        // if (openSessions.includes(session)) {
        //     sessionData["Countdown"] = "Now";
        // } else {
        //     if (openSessions[0].name == "Closed") {
        //         sessionData["Countdown"] = sessionOpen.plus({ days: daysTilNextOpen }).toRelative({ unit: ["hours", "minutes"] });
        //     } else {
        //     sessionData["Countdown"] = sessionOpen.plus({ days: daysTilNextOpen }).toRelative({ unit: ["hours", "minutes"] });
        // }   
        // }
        
        // Check if the market has closed for today
        if (openSessions.includes(session)) {
            sessionData["Countdown"] = "Now";
        } else if (exchangeTime.diff(sessionOpen.plus({days: daysTilNextOpen})) > 0) {
            sessionData["Countdown"] = sessionOpen.plus({ days: daysTilNextOpen }).toRelative({ unit: ["hours", "minutes"] });
        } else {
            sessionData["Countdown"] = sessionOpen.plus({ days: daysTilNextOpen }).toRelative({ unit: ["hours", "minutes"] });
        }
        
        // sessionData["Relative Close"] = sessionClose.toRelative( { unit: ["hours", "minutes"]});
        
        tableData.push(sessionData);
    }
    return tableData;
}

// function createTableData(exchange, exchangeTime, daysTilNextOpen) {
//     let tableData = [];
//     // numberOfSessions = Object.keys(exchange.sessions).length;
//     let data = Object.keys(exchange.sessions);
//     // let formatting = DateTime.TIME_24_SIMPLE;
//     let formatting = "hh':'mm' 'a";
//     
//     for (key of data) {
//         let sessionData = {};
//         let session = exchange.sessions[key];
//         let sessionOpen = exchangeTime.set({ 
//             hour: session.openHour, 
//             minute: session.openMinute, 
//             second: 0 
//         });
//         let sessionClose = sessionOpen.plus({ minute: session.duration });
//         
//         sessionData["className"] = key;
//         sessionData["Session"] = session.name;
//         // sessionData["Trading Hours"] = exchange.timeZone.split("/")[1] + " (" + buildAcronym(sessionOpen.toFormat("ZZZZZ")) + "): " + sessionOpen.toFormat(formatting).toLowerCase() + " - " + sessionClose.toFormat(formatting).toLowerCase() + "<br>" + 
//         //     localTime.zoneName.split("/")[1] + " (" + buildAcronym(sessionOpen.toFormat("ZZZZZ")) + "): " + sessionOpen.setZone(localTimeZone).toFormat(formatting).toLowerCase() + " - " + sessionClose.setZone(localTimeZone).toFormat(formatting).toLowerCase();
//         
//         sessionData["Trading Hours"] = exchange.timeZone.split("/")[1] + ": " + sessionOpen.toFormat(formatting).toLowerCase() + " - " + sessionClose.toFormat(formatting).toLowerCase() + "<br>" + 
//         localTime.zoneName.split("/")[1] + ": " + sessionOpen.setZone(localTimeZone).toFormat(formatting).toLowerCase() + " - " + sessionClose.setZone(localTimeZone).toFormat(formatting).toLowerCase();
//         
//         
//         // sessionData["Local Time (" + buildAcronym(localTime.toFormat("ZZZZZ")) + ")"] = sessionOpen.setZone(localTimeZone).toFormat(formatting).toLowerCase() + " - " + sessionClose.setZone(localTimeZone).toFormat(formatting).toLowerCase();
//         sessionData["Relative Open"] = sessionOpen.plus({ days: daysTilNextOpen }).toRelative({ unit: ["hours", "minutes"] });
//         
//         tableData.push(sessionData);
//     }
//     return tableData;
// }


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
            
            if (element[key] == "Now") {
                row.classList.add("now");
            }
            let text = document.createTextNode(element[key]);
            // cell.appendChild(text);
            cell.innerHTML = element[key];
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
        day = localTime.setZone(exchange.timeZone);
    }
    
    var isOpen;
    
    // let exchangeTime = exchange.sessions.core;
    // if (exchange.sessions.includes("lunch"))
    normalTrading = ["core", "core2"]; 
    
    for (session of normalTrading) {
        normalTrading = exchange.sessions[session];
        if (normalTrading == undefined) {
            break;
        }
        
        let open = day.set({ 
            hour: normalTrading.openHour, 
            minute: normalTrading.openMinute, 
            second: 0 
        });
        
        if (luxon.Duration.fromObject({ minutes: normalTrading.duration }).as("hours") > 12 && luxon.Duration.fromObject({ minutes: normalTrading.duration }).as("hours") < 24) {
            open = open.plus({days: -1});   
        }
        
        let close = open.plus({ minutes: normalTrading.duration });
    
        if (isThisDayATradingDay(exchange, day)) {
            
            if (day > open && day < close) {
                isOpen = true;
                break;
            } 
            else {
                isOpen = false;
            }
        }
        else {
            isOpen = false;
        }
    }
    return isOpen
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


// for (let days = 0; days < 1; days++) {
//         exchangeOpen = isExchangeOpen(exchanges.nyse, days);
//         console.log("do: " + exchangeOpen);
// 
//     }

// console.log(isExchangeOpen(exchanges.nyse, 3));

// console.log("1: " + exchangeTime.plus({ days: 1 }).toLocaleString(DateTime.TIME_SIMPLE));

function getDaysTilNextOpen (exchange, exchangeTime) {
    let exchangeOpenOnThisDay = isThisDayATradingDay(exchange, exchangeTime);
    let daysTilNextOpen = 0;
    for (var i=0; i < 7; i++) {
        if (!exchangeOpenOnThisDay) {
            daysTilNextOpen++;
            exchangeOpenOnThisDay = isThisDayATradingDay(exchange, exchangeTime.plus({ days: daysTilNextOpen }))
            if (exchangeOpenOnThisDay) {
                break;
            }
        }
    }
    return daysTilNextOpen;
}



function generateListElement(exchange, exchangeTime, tableData) {
    let formatting = "hh':'mm' 'a"
    let exchangeOpen = isExchangeOpen(exchange, exchangeTime);
    
    switch (exchangeOpen) {
        case true:
            exchangeOpenString = "open";
            break;
        case false:
            exchangeOpenString = "closed";
    }

    
    let coreOpen = exchangeTime.set({ 
        hour: exchange.sessions.core.openHour, 
        minute: exchange.sessions.core.openMinute, 
        second: 0 
    });
    let coreClose = coreOpen.plus({ minute: exchange.sessions.core.duration });
    
    let coreOpenString = coreOpen.setZone(localTimeZone).toFormat(formatting).toLowerCase() + " - " + coreClose.setZone(localTimeZone).toFormat(formatting).toLowerCase();
    
    let openSessions = whatSessionIsOpen(exchange, exchangeTime);
    let openDays = [exchange.openDays[0], exchange.openDays[exchange.openDays.length - 1]];
    var openDaysString = [];
    for (var i=0; i<2; i++) {
        switch (openDays[i]) {
            case 1:
                openDaysString[i] = "Monday";
                break;
            case 2:
                openDaysString[i] = "Tuesday";
                break;
            case 3:
            openDaysString[i] = "Wednesday";
            break;
            case 4:
            openDaysString[i] = "Thursday";
            break;
            case 5:
            openDaysString[i] = "Friday";
            break;
            case 6:
            openDaysString[i] = "Saturday";
            break;
            case 7:
            openDaysString[i] = "Sunday";
            break;
        }
    }
            
    let li = document.createElement("li");
    li.setAttribute("id", exchange.nameShort.toLowerCase());
    li.setAttribute("class", "exchange-item");
    
    let table = document.createElement('table');
    let title = document.createElement("h1");
    title.classList.add("title")
    let subHead = document.createElement("h3");
    let timeTag = document.createElement("time");
    let countDownTitle = document.createElement("h3");
    let countdown = document.createElement("h1");
    countdown.classList.add("countdown");
    let text = document.createElement("p");
    
    let referral = document.createElement("p");
    const localCountry = ct.getCountryForTimezone(localTime.zoneName);
    referral.innerHTML = "Buy and sell " + exchange.nameShort + "-listed stocks in " + localCountry.name;
    
    timeTag.innerHTML = exchangeTime.toFormat("cccc, L LLLL y");
    // title.innerHTML = "<span class='left'>" + exchange.nameLong + "</span><span class='right'>" + countryFlagEmoji.get(ct.getCountryForTimezone(exchangeTime.zoneName).id).emoji + "</span>";
    // title.innerHTML = exchange.nameLong + "<span class='emoji'>" + countryFlagEmoji.get(ct.getCountryForTimezone(exchangeTime.zoneName).id).emoji + "</span>";
    if (exchange.nameShort == "BTC") {
        title.innerHTML = String.fromCodePoint(0x1F3F4,0x200D,0x2620,0xFE0F) + " " + exchange.nameLong + " (" + exchange.nameShort + ") " + "<time>" + exchangeTime.toFormat("h':'mm''a").toLowerCase() + "</time>" ;
    } else {
        title.innerHTML = countryFlagEmoji.get(ct.getCountryForTimezone(exchangeTime.zoneName).id).emoji + " " + exchange.nameLong + " (" + exchange.nameShort.split(" ")[0] + ") " + "<time>" + exchangeTime.toFormat("h':'mm''a").toLowerCase() + "</time>" ;
    }
    subHead.innerHTML = "The " + exchange.nameShort + " is "+ exchangeOpenString + " for regular trading.";
    differenceInOffset = exchangeTime.offset - localTime.offset;
    var relativeOffset;
    var offset = luxon.Duration.fromObject({ minutes: Math.abs(differenceInOffset) }).shiftTo("hours", "minutes").toObject();
    if (differenceInOffset <= 0 ) {
        relativeOffset = "behind";
    } else {
        relativeOffset = "ahead of";
    }
    text.innerHTML = "Trading week: " + openDaysString[0] + " - " + openDaysString[1] + "<br>" +
        "Timezone: " + exchangeTime.toFormat("ZZZZZ") + " (UTC" + exchangeTime.toFormat("ZZ") + ") " + "<br>" +
        "Location: " + exchangeTime.zoneName.split("/")[1].replace(/_/g, ' ') + ", " + ct.getCountryForTimezone(exchangeTime.zoneName).name  + "<br>" +
        "Offset: " + exchangeTime.zoneName.split("/")[1].replace(/_/g, ' ')  + " is " + offset["hours"] + " hours and " + offset["minutes"] + " minutes " + relativeOffset + " " + localTime.zoneName.split("/")[1].replace(/_/g, ' ')
        ;
    
    let subHead2 = document.createElement("p");
    
    openSessionTimeOpen = exchangeTime.set({ 
        hour: openSessions[0].openHour, 
        minute: openSessions[0].openMinute, 
        second: 0 
    });
    
    // Check if session duration crosses two days
    var fullDuration = openSessions[0].duration;
    // if (luxon.Duration.fromObject({ minutes: openSessions[0].duration }).as("hours") > 12 && luxon.Duration.fromObject({ minutes: openSessions[0].duration }).as("hours") < 24) {
        if (luxon.Duration.fromObject({ minutes: openSessions[0].duration }).as("hours") > 12) {

        openSessionTimeOpen = openSessionTimeOpen.plus({days: -1});
    } else if (openSessions[0].name == "Lunch") {
        console.log(exchange.sessions.lunch)
        fullDuration = fullDuration + exchange.sessions.lunch.duration + exchange.sessions.lunch.duration;
    } 
    let openSessionTimeClose = openSessionTimeOpen.plus({ minutes: fullDuration });
    
    if (exchangeOpen) {
        status = "open";
        if (exchange.nameShort == "BTC") {
            countdown.innerHTML = "Never closes";
        } else {
            countdown.innerHTML = "Closing " + openSessionTimeClose.toRelative( { unit: ["hours", "minutes"]});
        }
    } else if (openSessions[0].name != "Closed") { // Any session that is not Core open or closed session
        status = "extendedOpen";
        if (openSessions.length == 1) {
            subHead.innerHTML = "The " + exchange.nameShort + " is open for extended trading.";
            countdown.innerHTML =  "Opening " + coreOpen.plus({days: daysTilNextOpen}).toRelative( { unit: ["hours", "minutes"]}) + "."; 
        } else {
            subHead.innerHTML = "The " + exchange.nameShort + " is open for extended trading, the current session are:";
            openSessions.forEach((session) => {
                subHead.innerHTML.concat(", ", session.name);
            })
        }
    } else {
        status = "closed";
        if (exchangeTime.diff(coreOpen.plus({days: daysTilNextOpen})) > 0) {
            countdown.innerHTML = "Opening " + coreOpen.plus({days: daysTilNextOpen + 1}).toRelative( { unit: ["hours", "minutes"]}) + ".";
        } else {
            countdown.innerHTML = "Opening " + coreOpen.plus({days: daysTilNextOpen}).toRelative( { unit: ["hours", "minutes"]}) + ".";   
        }
    }

    // Regualr trading is " + coreOpenString + ", Monday - Friday.";
    li.appendChild(title);
    li.appendChild(timeTag);
    li.appendChild(countdown);
    li.appendChild(subHead);
    li.appendChild(subHead2);
    li.appendChild(countDownTitle);
    table.setAttribute("id", exchange.nameShort.toLowerCase() + "Table");
    openSessions.forEach((session) => {
        // li.classList.add(openSessions[session].name.replace(/\s+/g, '-').toLowerCase());
        // table.classList.add(openSessions[session].name.replace(/\s+/g, '-').toLowerCase());
        li.classList.add(session.name.replace(/\s+/g, '-').toLowerCase());
        table.classList.add(session.name.replace(/\s+/g, '-').toLowerCase());
    })
    
    console.log(exchangeOpen);
    if (exchangeOpen) {
        table.classList.add("open");
        li.classList.add("open");
    }
    
    li.appendChild(table);
    li.appendChild(text);
    // container.appendChild(li);
    li.appendChild(referral);
    
    // if (exchangeOpen) {
    //     openExchanges.appendChild(li);
    // } else if (openSessions.name != "Closed") { // Any session that is not Core open or closed session
    //     extendedOpenExchanges.appendChild(li);
    // } else {
    //     closedExchanges.appendChild(li);
    // }
    

    
    // pivot.init({
    //     selector: "#" + exchange.nameShort.toLowerCase(),
    //     invert: true,
    //     shine: true
    // });
    
    return [li, table]
}

let openExchanges = document.createElement('ul');
let extendedOpenExchanges = document.createElement('ul');
let closedExchanges = document.createElement('ul');

for (key of exchangeData) {
    let exchange = exchanges[key];
    // let exchangeTime = localTime.setZone(exchange.timeZone).plus({ hours: 0 });
    let exchangeTime = localTime.setZone(exchange.timeZone);

    let exchangeOpenOnThisDay = isThisDayATradingDay(exchange, exchangeTime);
    let exchangeOpen = isExchangeOpen(exchanges[key], exchangeTime);

    let exchangeTimeNextOpen = exchangeTime;
    // Check if exchange open and adjust relative times
    // days = 0;
    
    // let daysTilNextOpen = 0;
    // while(!exchangeOpenOnThisDay) {
    //     ++daysTilNextOpen;
    //     // console.log("do: " + exchangeOpen);
    //     exchangeOpenOnThisDay = isThisDayATradingDay(exchanges[key], exchangeTimeNextOpen);
    //     if (exchangeOpenOnThisDay) {
    //         break;
    //     }
    //     exchangeTimeNextOpen = exchangeTimeNextOpen.plus({ days: daysTilNextOpen });
    //     console.log(exchangeTimeNextOpen.weekday);
    //     console.log(exchangeOpenOnThisDay);
    // }
    
    daysTilNextOpen = getDaysTilNextOpen(exchange, exchangeTime);
    
    
    // console.log(daysTilNextOpen);
    
    // days = 0;
    // for (let days = 0; days < 5; days++) {
    //     console.log("do: " + exchangeOpen);
    //     exchangeOpen = isExchangeOpen(exchanges[key], days);
    // }
    
    let tableData = createTableData(exchange, exchangeTime, daysTilNextOpen);

    
    [li, table] = generateListElement(exchange, exchangeTime, tableData);
    
    let openSessions = whatSessionIsOpen(exchange, exchangeTime);

    if (exchangeOpen) {
        openExchanges.appendChild(li);
    } else if (openSessions[0].name != "Closed") { // Any session that is not Core open or closed session
        extendedOpenExchanges.appendChild(li);
    } else {
        closedExchanges.appendChild(li);
    }
    
    // if (exchangeOpen) {
    //     container.insertBefore(li, container.firstChild);
    // } else if (openSessions.name != "Closed") { // Any session that is not Core open or closed session
    //     container.insertBefore(li, container.firstChild);
    // } else {
    //     container.appendChild(li);
    // }
    

    
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

ad = document.createElement("li");
ad.classList.add("ad", "exchange-item");


let title = document.createElement("h1");
title.innerHTML = "Ad";
let adImg = document.createElement("img");
adImg.setAttribute("src", "testAd.png");
// title.classList.add("title")
// let subHead = document.createElement("h3");
// let timeTag = document.createElement("time");
// let countDownTitle = document.createElement("h3");
// let countdown = document.createElement("h1");
// countdown.classList.add("countdown");
let text = document.createElement("p");
text.innerHTML = "MariahCoin to the moon.";

// ad.appendChild(title);
ad.appendChild(adImg);
// li.appendChild(timeTag);
// li.appendChild(subHead);
// li.appendChild(subHead2);
// li.appendChild(countDownTitle)
// li.appendChild(countdown);
ad.appendChild(text);

// console.log(container.childNodes.length())

// openExchanges.insertBefore(ad, container.childNodes[2]);

container.appendChild(openExchanges);
container.appendChild(extendedOpenExchanges);
container.appendChild(closedExchanges);

// container.appendChild( openExchanges.appendChild((extendedOpenExchanges).appendChild(closedExchanges)) );
// container.appendChild( openExchanges.appendChild(extendedOpenExchanges) )

adLocation = Math.floor(Math.random() * container.childNodes.length);
console.log(adLocation)
adLocation2 = Math.floor(Math.random() * container.childNodes[adLocation].childNodes.length);
console.log(adLocation2)
console.log(container.childNodes[adLocation].childNodes[adLocation2])
// container.childNodes[adLocation].childNodes[adLocation2].insertNode(ad);
container.childNodes[adLocation].insertBefore(ad, container.childNodes[adLocation].childNodes[adLocation2 + 1]);


document.getElementById("browserTimezone").innerHTML = localTime.zoneName;
document.getElementById("detectedLocation").innerHTML = localTime.zoneName.split("/")[1] + ", " + ct.getCountryForTimezone(localTime.zoneName).name;

// Rearrange so open exhanges are up the top
// table = document.getElementById("tableContainer");
// listItems = table.querySelectorAll("li.open");
// 
// for (var i=0; i < listItems.length; i++) {
//     table.insertBefore(listItems[i], table.firstChild);
// }


// expected += interval;
// setTimeout(step, Math.max(0, interval - dt)); // take into account drift
// }

// let grids = [...document.querySelectorAll('.masonry')];
// 
// if(grids.length && getComputedStyle(grids[0]).gridTemplateRows !== 'masonry') {
//     grids = grids.map(grid => ({
//         _el: grid, 
//         gap: parseFloat(getComputedStyle(grid).gridRowGap), 
//         items: [...grid.childNodes].filter(c => c.nodeType === 1), 
//         ncol: 0
//     }));
// 
//     function layout() {
//         grids.forEach(grid => {
//             /* get the post relayout number of columns */
//             let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length;
// 
//             /* if the number of columns has changed */
//             if(grid.ncol !== ncol) {
//                 /* update number of columns */
//                 grid.ncol = ncol;
// 
//                 /* revert to initial positioning, no margin */
//                 grid.items.forEach(c => c.style.removeProperty('margin-top'));
// 
//                 /* if we have more than one column */
//                 if(grid.ncol > 1) {
//                     grid.items.slice(ncol).forEach((c, i) => {
//                         let prev_fin = grid.items[i].getBoundingClientRect().bottom /* bottom edge of item above */, 
//                                 curr_ini = c.getBoundingClientRect().top /* top edge of current item */;
//                         
//                         c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`
//                     })
//                 }
//             }
//         })
//     }
// 
//     addEventListener('load', e => {
//         layout(); /* initial load */
//         addEventListener('resize', layout, false) /* on resize */
//     }, false);
// }

// let mainId = '.masonry';
// let itemIdentifier = '.exchange-item';
// 
// document.addEventListener('DOMContentLoaded', function(e) {
// 
//     // Programmatically get the column width
//     let item = document.querySelector(itemIdentifier);
//     let parentWidth = item.parentNode.getBoundingClientRect().width;
//     let itemWidth = item.getBoundingClientRect().width + parseFloat(getComputedStyle(item).marginLeft) + parseFloat(getComputedStyle(item).marginRight);
//     let columnWidth = Math.round((1 / (itemWidth / parentWidth)));
// 
//     // We need this line since JS nodes are dumb
//     let arrayOfItems = Array.prototype.slice.call( document.querySelectorAll(itemIdentifier) );
//     let trackHeights = {};
//     arrayOfItems.forEach(function(item) {
//         // Get index of item
//         let thisIndex = arrayOfItems.indexOf(item);
//         // Get column this and set width
//         let thisColumn = thisIndex % columnWidth;
//         if(typeof trackHeights[thisColumn] == "undefined") {
//             trackHeights[thisColumn] = 0;
//         }
//         trackHeights[thisColumn] += item.getBoundingClientRect().height + parseFloat(getComputedStyle(item).marginBottom);
//         // If the item has an item above it, then move it to fill the gap
//         if(thisIndex - columnWidth >= 0) {
//             let getItemAbove = document.querySelector(`${itemIdentifier}:nth-of-type(${thisIndex - columnWidth + 1})`);
//             let previousBottom = getItemAbove.getBoundingClientRect().bottom;
//             let currentTop = item.getBoundingClientRect().top - parseFloat(getComputedStyle(item).marginBottom);
//             item.style.top = `-${currentTop - previousBottom}px`;
//         }
//     });
//     let max = Math.max(...Object.values(trackHeights));
//     document.getElementById(mainId).style.height = `${max}px`;
// });

// var masonry = new MiniMasonry({
//     container: document.querySelector('.masonry'),
//     basewidth: 1000
// }); 



    // Full blown masonry
    // const supportsMasonry = CSS.supports('grid-template-rows', 'masonry');
    // 
    // if (supportsMasonry) {
    //   console.log('Native masonry is supported, do nothing');
    // } else {
    //   console.log('Native masonry not supported');
    //   console.log('Loading alternative library');
    // 
    //   const newScript = document.createElement("script");
    //   newScript.src = "https://unpkg.com/masonry-layout@4.2.2/dist/masonry.pkgd.min.js";
    //   document.body.appendChild(newScript);
    // }
    
    const supportsMasonry = CSS.supports('grid-template-rows', 'masonry');
    
    if (supportsMasonry) {
      console.log('Native masonry is supported, do nothing');
    } else {
    const elem = document.querySelector('.masonry');
    const msnry = new Masonry( elem, {
      // options
      itemSelector: '.exchange-item',
      fitWidth: true
    });
}
    


// layout();

// pivot.init({
//     selector: "#nyse"
//     invert: true,
//     shine: true
// });
