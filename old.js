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