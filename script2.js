let DateTime = luxon.DateTime;

// var start = DateTime.now();
// setInterval(function() {
//     var delta = DateTime.now() - start; // milliseconds elapsed since start
//     …
//     output(Math.floor(delta / 1000)); // in seconds
//     // alternatively just show wall clock time:
//     output(new Date().toUTCString());
// }, 1000); // update about every second

var interval = 1000; // ms
var expected = Date.now() + interval;
var localTime= DateTime.now();
setTimeout(step, interval);
function step() {
    var dt = Date.now() - expected; // the drift (positive for overshooting)
    if (dt > interval) {
        // something really bad happened. Maybe the browser (tab) was inactive?
        // possibly special handling to avoid futile "catch up" run
    }




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
        var marketOpen = true;
    } else {
        var marketOpen = false;
    }
    
    document.getElementById("open").innerHTML = marketOpen;
    
    document.getElementById("table").rows[1].cells.item(1).innerHTML = preOpen.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[1].cells.item(2).innerHTML = preOpen.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    // document.getElementById("table").rows[1].cells.item(3).innerHTML = preOpen.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
    document.getElementById("table").rows[1].cells.item(3).innerHTML = preOpen.toRelative({ unit: [ "hours", "minutes"] });
    
    document.getElementById("table").rows[2].cells.item(1).innerHTML = preClose.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[2].cells.item(2).innerHTML = preClose.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[2].cells.item(3).innerHTML = preClose.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
    
    document.getElementById("table").rows[3].cells.item(1).innerHTML = open.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[3].cells.item(2).innerHTML = open.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[3].cells.item(3).innerHTML = open.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
    
    document.getElementById("table").rows[4].cells.item(1).innerHTML = close.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[4].cells.item(2).innerHTML = close.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[4].cells.item(3).innerHTML = close.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
    
    document.getElementById("table").rows[5].cells.item(1).innerHTML = afterOpen.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[5].cells.item(2).innerHTML = afterOpen.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[5].cells.item(3).innerHTML = afterOpen.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
    
    document.getElementById("table").rows[6].cells.item(1).innerHTML = afterClose.toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[6].cells.item(2).innerHTML = afterClose.setZone("Australia/Adelaide").toLocaleString(DateTime.TIME_SIMPLE);
    document.getElementById("table").rows[6].cells.item(3).innerHTML = afterClose.diff(exchangeTime, 'hours').toFormat('hh:mm:ss');
expected += interval;
setTimeout(step, Math.max(0, interval - dt)); // take into account drift
}