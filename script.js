//function httpGetAsync(url, callback) {
//    var xmlHttp = new XMLHttpRequest();
//    xmlHttp.onreadystatechange = function() {
//        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
//        callback(xmlHttp.responseText);
//    }
//    xmlHttp.open("GET", url, true); // true for asynchronous
//    xmlHttp.send(null);
//}
//
//var url = "https://timezone.abstractapi.com/v1/current_time/?api_key=5751e92a228841df95b320e2db87b89e&location=Oxford, United Kingdom"
//
//httpGetAsync(url)

//
//fetch('https://timezone.abstractapi.com/v1/current_time/?api_key=5751e92a228841df95b320e2db87b89e&location=Oxford, United Kingdom')
//    .then(response => response.json())
////    .then(data => obj = data)
//    .then(data => createTimeObj(data))
////    .then(() => console.log(obj.datatime))
//
//let createTimeObj = (data) => {
////    console.log(data.datetime)
//    obj = data
//}
//
//console.log(obj.datetime)

//async function fetchTimeData(input) {
//    try {
//        const response = await fetch(input);
//        const timeData = await response.json();
//        return timeData;
//    } catch (error) {
//        console.error(error);
//    }
//    
//} 

let timeData = "";
//let apiUrl = "https://timezone.abstractapi.com/v1/current_time/?api_key=5751e92a228841df95b320e2db87b89e&location=Oxford, United Kingdom";
let apiUrl = "http://worldtimeapi.org/api/timezone/America/New_York";

async function getJson(url) {
    try {
        const response = await fetch(url);
        let data = await response.json();
        return data;
//        return response.json();
    } catch (error) {
        console.error(error);
    }
    
}

//let timeData = await getJson(apiUrl);

var nyse = {
    // [openHour, openMinutes, session duration (in minutes)]
    "preMarket" : [6, 30, 180],
    "core": [9, 30, 450]
}

//console.log(data)
async function saveJson(data) {
    
    return await getJson(data)
}

async function main() {
    exchangeTimeData = await saveJson(apiUrl);
    console.log(exchangeTimeData.datetime);
    console.log(timeData);
    
    var exchangeDate = new Date(exchangeTimeData.datetime);
    var todayDate = new Date();
    
    console.log("exchange date" + exchangeDate);
    
    console.log(todayDate.toLocaleString('en-AU', { timeZone: exchangeTimeData.timezone }));
    
    var exchangeOptions = {
        timeZone: exchangeTimeData.timezone,
        hour12: true
//        timeZoneName: "long"
    }
    
    var localOptions = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour12: true
//        timeZoneName: "long"
    }
    
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    document.getElementById("location").innerHTML = exchangeTimeData.timezone.split("/")[1];
    document.getElementById("time").innerHTML = todayDate.toLocaleTimeString('en-AU', exchangeOptions);
    
    document.getElementById("localLocation").innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/")[1];
    document.getElementById("localTime").innerHTML = todayDate.toLocaleTimeString('en-AU', localOptions);
    
    console.log(nyse.preMarket[1]);
    
    console.log("offset " + exchangeDate.getTimezoneOffset());
    console.log("ceil" + Math.ceil(exchangeDate.getTimezoneOffset()/60));
    
    function createExchangeDate(exchangeDate, market, session) {
//        open = new Date(exchangeDate.setHours(market.session[0] + Math.ceil(exchangeDate.getTimezoneOffset()/60) - 1 + market.session[1] + (exchangeDate.getTimezoneOffset() % 60) % 60, market.session[1] + exchangeDate.getTimezoneOffset() % 60, 0));
        
        open = new Date(exchangeDate.setHours(market[session][0] + Math.ceil(exchangeDate.getTimezoneOffset()/60) - 1 + market[session][1] + (exchangeDate.getTimezoneOffset() % 60) % 60, market[session][1] + exchangeDate.getTimezoneOffset() % 60, 0));
        
        close = new Date();
        close.setTime(open.getTime());
        close.setHours(open.getHours() + (market[session][2] / 60));
        return [open, close];
    }
    
    todayPreOpen = createExchangeDate(exchangeDate, nyse, "preMarket")[0];
    todayPreClose = createExchangeDate(exchangeDate, nyse, "preMarket")[1];
    
    todayOpen = createExchangeDate(exchangeDate, nyse, "core")[0];
    todayClose = createExchangeDate(exchangeDate, nyse, "core")[1];
    
    console.log("new" + todayPreOpen);
    
//    todayPreOpen = new Date(exchangeDate.setHours(nyse.preMarket[0] + Math.ceil(exchangeDate.getTimezoneOffset()/60) - 1 + nyse.preMarket[1] + (exchangeDate.getTimezoneOffset() % 60) % 60, nyse.preMarket[1] + exchangeDate.getTimezoneOffset() % 60, 0));
        
//    todayPreClose = new Date(exchangeDate.setHours(nyse.preMarket[2] + Math.ceil(exchangeDate.getTimezoneOffset()/60) - 1 + nyse.preMarket[1] + (exchangeDate.getTimezoneOffset() % 60) % 60, nyse.preMarket[3] + exchangeDate.getTimezoneOffset() % 60, 0));
//    
//    todayOpen = new Date(exchangeDate.setHours(nyse.core[0] + Math.ceil(exchangeDate.getTimezoneOffset()/60) - 1 + nyse.core[1] + (exchangeDate.getTimezoneOffset() % 60) % 60, nyse.core[1] + exchangeDate.getTimezoneOffset() % 60, 0));
//        
//    todayClose = new Date(exchangeDate.setHours(nyse.core[2] + Math.ceil(exchangeDate.getTimezoneOffset()/60) - 1 + nyse.core[1] + (exchangeDate.getTimezoneOffset() % 60) % 60, nyse.core[3] + exchangeDate.getTimezoneOffset() % 60, 0));
    
    console.log(todayDate.setHours(nyse.preMarket[0], nyse.preMarket[1]));
    
    console.log("exchange time: " + exchangeDate.getTime());
    console.log("today time: " + todayDate.getHours());
    console.log("open time: " + todayOpen.getHours());
    console.log(todayDate.getHours() >= todayOpen.getHours());
    console.log("close time: " + todayClose.getHours());
    console.log(todayDate.getHours() <= todayClose.getHours());
    
    if (todayDate.getTime() + Math.ceil(exchangeDate.getTimezoneOffset()/60) - 1>= todayOpen.getTime() && todayDate.getTime() + Math.ceil(exchangeDate.getTimezoneOffset()/60) - 1 <= todayClose.getTime()) {
        var marketOpen = true;
    } else {
        var marketOpen = false;
    }
    
    document.getElementById("open").innerHTML = marketOpen;
    
    
    document.getElementById("table").rows[1].cells.item(1).innerHTML = todayPreOpen.toLocaleTimeString('en-AU', exchangeOptions);
    document.getElementById("table").rows[1].cells.item(2).innerHTML = todayPreOpen.toLocaleTimeString('en-AU', localOptions);
    
    document.getElementById("table").rows[2].cells.item(1).innerHTML = todayPreClose.toLocaleTimeString('en-AU', exchangeOptions);
    document.getElementById("table").rows[2].cells.item(2).innerHTML = todayPreClose.toLocaleTimeString('en-AU', localOptions);
    
    document.getElementById("table").rows[3].cells.item(1).innerHTML = todayOpen.toLocaleTimeString('en-AU', exchangeOptions);
    document.getElementById("table").rows[3].cells.item(2).innerHTML = todayOpen.toLocaleTimeString('en-AU', localOptions);
    
    document.getElementById("table").rows[4].cells.item(1).innerHTML = todayClose.toLocaleTimeString('en-AU', exchangeOptions);
    document.getElementById("table").rows[4].cells.item(2).innerHTML = todayClose.toLocaleTimeString('en-AU', localOptions);

}
main();

//const timeData = await fetchTimeData('https://timezone.abstractapi.com/v1/current_time/?api_key=5751e92a228841df95b320e2db87b89e&location=Oxford, United Kingdom');
//console.log(timeData);