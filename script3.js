let DateTime = luxon.DateTime;

const localTime = DateTime.now();
// const localTime = DateTime.now().plus({day: 0}).set({
// 	hour: 23,
// 	minute: 59,
// 	second: 0
// });
const localTimeZone = localTime.zoneName;

const buildAcronym = (string = '') => {
	const stringArray = string.split(' ');
	let res = '';
	stringArray.forEach(el => {
		const [char] = el;
		if (char === char.toUpperCase() && char !== char.toLowerCase()) {
			res += char;
		};
	});
	return res;
};

function whatSessionIsOpen(exchange, time) {
	sessions = Object.keys(exchange.sessions);
	var openSessions = [];
	for (key of sessions) {
		let session = exchange.sessions[key];
		
		let open = time.set({ 
			hour: session.openHour, 
			minute: session.openMinute, 
			second: 0 
		});
		
		// To check if current time is before or after the close
		if (luxon.Duration.fromObject({ minutes: session.duration }).as("hours") > 12 && luxon.Duration.fromObject({ minutes: session.duration }).as("hours") < 24) {
			// if (luxon.Duration.fromObject({ minutes: session.duration }).as("hours") > 12) {
			open = open.plus({days: -1});   
		}
		
		let close = open.plus({ minutes: session.duration });
	
		if (isThisDayATradingDay(exchange, time)) {
			if (time > open && time < close) {
				openSessions.push(session);
			} else {
				continue;
			}
		} else {
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

function createTableData(exchange, time, daysTilNextOpen) {
	let tableData = [];
	let data = Object.keys(exchange.sessions);
	let formatting = "hh':'mm''a";
	
	let openSessions = whatSessionIsOpen(exchange, time);
	let todayIsTradingDay = isThisDayATradingDay(exchange, time);
	
	let coreOpen = time.set({ 
		hour: exchange.sessions.core.openHour, 
		minute: exchange.sessions.core.openMinute, 
		second: 0 
	});
	
	if (exchange.sessions.core2) {
		coreClose = coreOpen.plus({ minute: exchange.sessions.core2.duration });	
	} else {
		coreClose = coreOpen.plus({ minute: exchange.sessions.core.duration });
	}
	
	for (key of data) {
		let sessionData = {};
		let session = exchange.sessions[key];
		let sessionOpen = time.set({ 
			hour: session.openHour, 
			minute: session.openMinute, 
			second: 0 
		});
		let sessionClose = sessionOpen.plus({ minute: session.duration });
		
		sessionData["className"] = key;
		sessionData["Session"] = session.name;
		sessionData["Exchange Time (" + buildAcronym(sessionOpen.toFormat("ZZZZZ")) + ")"] = sessionOpen.toFormat(formatting).toLowerCase() + " - " + sessionClose.toFormat(formatting).toLowerCase();
		sessionData["Local Time (" + buildAcronym(localTime.toFormat("ZZZZZ")) + ")"] = sessionOpen.setZone(localTimeZone).toFormat(formatting).toLowerCase() + " - " + sessionClose.setZone(localTimeZone).toFormat(formatting).toLowerCase();
		
		// Countdown logic. If session open now -> "Now". If it is opening today -> Count down. If all sessions closed -> count down to next open day session.
		if (openSessions.includes(session)) {
			sessionData["Countdown"] = "Now";
		// } else if (time.diff(sessionOpen.plus({days: daysTilNextOpen})) > 0) {
		} else if (time.diff(sessionClose) > 0 && todayIsTradingDay) {
			sessionData["Countdown"] = sessionClose.toRelative({ unit: ["hours", "minutes"] });
		} else {
			sessionData["Countdown"] = sessionOpen.plus({ days: daysTilNextOpen }).toRelative({ unit: ["hours", "minutes"] });
		}
		
		// sessionData["Relative Close"] = sessionClose.toRelative( { unit: ["hours", "minutes"]});
		
		tableData.push(sessionData);
	}
	return tableData;
}

// Table generating functions
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

function isThisDayATradingDay(exchange, time) {
	if (exchange.openDays.includes(time.weekday)) {
		return true;
	} else {
		return false;
	}
}

function isExchangeOpen(exchange, time) {
	var isOpen;

	normalTrading = ["core", "core2"]; 
	
	for (session of normalTrading) {
		normalTrading = exchange.sessions[session];
		if (normalTrading == undefined) {
			break;
		}
		
		let open = time.set({ 
			hour: normalTrading.openHour, 
			minute: normalTrading.openMinute, 
			second: 0 
		});
		
		// Need to fix this
		if (luxon.Duration.fromObject({ minutes: normalTrading.duration }).as("hours") > 12 && luxon.Duration.fromObject({ minutes: normalTrading.duration }).as("hours") < 24) {
			open = open.plus({days: -1});   
		}
		
		let close = open.plus({ minutes: normalTrading.duration });
	
		if (isThisDayATradingDay(exchange, time)) {
			if (time > open && time < close) {
				isOpen = true;
				break;
			} else {
				isOpen = false;
			}
		} else {
			isOpen = false;
		}
	}
	return isOpen
}

function getDaysTilNextOpen(exchange, time) {
	let exchangeOpenOnThisDay = isThisDayATradingDay(exchange, time);
	let daysTilNextOpen = 0;
	for (var i=0; i < 7; i++) {
		if (!exchangeOpenOnThisDay) {
			daysTilNextOpen++;
			exchangeOpenOnThisDay = isThisDayATradingDay(exchange, time.plus({ days: daysTilNextOpen }))
			if (exchangeOpenOnThisDay) {
				break;
			}
		}
	}
	return daysTilNextOpen;
}

function generateListElement(exchange, time, tableData) {
	let formatting = "hh':'mm' 'a"
	let exchangeOpen = isExchangeOpen(exchange, time);
	
	switch (exchangeOpen) {
		case true:
			exchangeOpenString = "open";
			break;
		case false:
			exchangeOpenString = "closed";
	}
	
	let coreOpen = time.set({ 
		hour: exchange.sessions.core.openHour, 
		minute: exchange.sessions.core.openMinute, 
		second: 0 
	});
	
	//Testing
	// if (exchange.nameShort == "CME GLOBEX") {
	// 	console.log("Time: " + time.weekday)
	// 	console.log("Open: " + coreOpen.weekday);
	// 	console.log("Close: " + coreOpen.plus({ minute: exchange.sessions.core.duration }).weekday);
	// 	// console.log(coreOpen.diff(time));
	// 	// console.log(time.diff(coreOpen));
	// 	daySessionOpened = time.plus(time.diff(coreOpen));
	// 	console.log("day session opened: " + daySessionOpened.weekday)
	// }
	
	// If the session opened yesterday
	if (time.plus(time.diff(coreOpen)).weekday < time.weekday) {
		coreOpen = coreOpen.plus({ days: -1 });
	}
	
	if (exchange.sessions.core2) {
		coreOpen = time.set({ 
			hour: exchange.sessions.core2.openHour, 
			minute: exchange.sessions.core2.openMinute, 
			second: 0 
		});
		coreClose = coreOpen.plus({ minute: exchange.sessions.core2.duration });	
	} else {
		coreClose = coreOpen.plus({ minute: exchange.sessions.core.duration });
	} 
	
	// If session closes the day after it opened.
	if (coreClose.weekday - time.weekday < 0) {
		coreClose = coreClose.plus({days: -1});
	}
	
	let coreOpenString = coreOpen.setZone(localTimeZone).toFormat(formatting).toLowerCase() + " - " + coreClose.setZone(localTimeZone).toFormat(formatting).toLowerCase();
	
	let openSessions = whatSessionIsOpen(exchange, time);
	let openDays = [exchange.openDays[0], exchange.openDays[exchange.openDays.length - 1]];
	
	var openDaysString = [];
	for (var i = 0; i < 2; i++) {
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
	li.classList.add("exchange-item");
	
	let table = document.createElement('table');
	let title = document.createElement("h1");
	title.classList.add("title")
	let subHead = document.createElement("h3");
	let timeTag = document.createElement("time");
	let countDownTitle = document.createElement("h3");
	let countdown = document.createElement("h1");
	countdown.classList.add("countdown");
	let text = document.createElement("ul");
	text.classList.add("exchange-info");
	
	let referral = document.createElement("p");
	const localCountry = ct.getCountryForTimezone(localTime.zoneName);
	referral.innerHTML = "Buy and sell " + exchange.nameShort + "-listed stocks in " + localCountry.name;
	
	timeTag.innerHTML = time.toFormat("cccc, L LLLL y");
	if (exchange.nameShort == "BTC") {
		title.innerHTML = String.fromCodePoint(0x1F3F4,0x200D,0x2620,0xFE0F) + " " + exchange.nameLong + " (" + exchange.nameShort + ") " + "<time>" + time.toFormat("h':'mm''a").toLowerCase() + "</time>" ;
	} else {
		title.innerHTML = countryFlagEmoji.get(ct.getCountryForTimezone(time.zoneName).id).emoji + " " + exchange.nameLong + " (" + exchange.nameShort.split(" ")[0] + ") " + "<time>" + time.toFormat("h':'mm''a").toLowerCase() + "</time>" ;
	}
	subHead.innerHTML = "The " + exchange.nameShort + " is "+ exchangeOpenString + " for regular trading.";
	differenceInOffset = time.offset - localTime.offset;
	var relativeOffset;
	var offset = luxon.Duration.fromObject({ minutes: Math.abs(differenceInOffset) }).shiftTo("hours", "minutes").toObject();
	if (differenceInOffset <= 0 ) {
		relativeOffset = "behind";
	} else {
		relativeOffset = "ahead of";
	}
	
	if (exchange.nameShort == "BTC") {
		text.innerHTML = "<li><b>Trading week</b> " + openDaysString[0] + " - " + openDaysString[1] + "</li>" +
		"<li><b>Location</b> Global</li>" +
		"<li><b>Timezone</b> " + time.toFormat("ZZZZZ") + " (UTC" + time.toFormat("ZZ") + ") " + "</li>" +
		"<li><b>Offset</b> " + time.zoneName.split("/")[1].replace(/_/g, ' ')  + " is " + offset["hours"] + " hours and " + offset["minutes"] + " minutes " + relativeOffset + " " + localTime.zoneName.split("/")[1].replace(/_/g, ' ') + "</li>"
		;
	} else {
		text.innerHTML = "<li><b>Trading week</b> " + openDaysString[0] + " - " + openDaysString[1] + "</li>" +
		"<li><b>Location</b> " + time.zoneName.split("/")[1].replace(/_/g, ' ') + ", " + ct.getCountryForTimezone(time.zoneName).name  + "</li>" +
		"<li><b>Timezone</b> " + time.toFormat("ZZZZZ") + " (UTC" + time.toFormat("ZZ") + ") " + "</li>" +
		"<li><b>Offset</b> " + time.zoneName.split("/")[1].replace(/_/g, ' ')  + " is " + offset["hours"] + " hours and " + offset["minutes"] + " minutes " + relativeOffset + " " + localTime.zoneName.split("/")[1].replace(/_/g, ' ') + "</li>"
		;	
	}
	
	let subHead2 = document.createElement("p");
	
	openSessionTimeOpen = time.set({ 
		hour: openSessions[0].openHour, 
		minute: openSessions[0].openMinute, 
		second: 0 
	});
	
	// Countdown logic
	
	// Check if session duration crosses two days
	var fullDuration = openSessions[0].duration;
	// if (luxon.Duration.fromObject({ minutes: openSessions[0].duration }).as("hours") > 12 && luxon.Duration.fromObject({ minutes: openSessions[0].duration }).as("hours") < 24) {
		if (luxon.Duration.fromObject({ minutes: openSessions[0].duration }).as("hours") > 12) {
		openSessionTimeOpen = openSessionTimeOpen.plus({days: -1});
	} else if (openSessions[0].name == "Lunch") {
		// console.log(exchange.sessions.lunch)
		fullDuration = fullDuration + exchange.sessions.lunch.duration + exchange.sessions.lunch.duration;
	} 
	let openSessionTimeClose = openSessionTimeOpen.plus({ minutes: fullDuration });
	
	let todayIsTradingDay = isThisDayATradingDay(exchange, time);
	
	if (exchangeOpen) {
		status = "open";
		if (exchange.nameShort == "BTC") {
			countdown.innerHTML = "Never closes";
		} else {
			countdown.innerHTML = "Closing " + coreClose.toRelative( { unit: ["hours", "minutes"]});
		}
	} else if (openSessions[0].name != "Closed") { // Extended open
		status = "extendedOpen";
		if (openSessions.length == 1) {
			subHead.innerHTML = "The " + exchange.nameShort + " is open for extended trading.";
			if (time.diff(coreOpen.plus({ days: daysTilNextOpen })) > 0) {
				countdown.innerHTML =  "Closed " + coreClose.toRelative( { unit: ["hours", "minutes"]}); 
			} else {
				countdown.innerHTML =  "Opening " + coreOpen.plus({ days: daysTilNextOpen}).toRelative( { unit: ["hours", "minutes"]} ); 	
			}
		} else {
			subHead.innerHTML = "The " + exchange.nameShort + " is open for extended trading, the current session are:";
			openSessions.forEach((session) => {
				subHead.innerHTML.concat(", ", session.name);
			})
		}
	} else {
		status = "closed";
		if (time.diff(coreClose) > 0 && todayIsTradingDay) {
			countdown.innerHTML = "Closed " + coreClose.toRelative( { unit: ["hours", "minutes"]});
		} else {
			countdown.innerHTML = "Opening " + coreOpen.plus({days: daysTilNextOpen}).toRelative( { unit: ["hours", "minutes"]});   
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
		li.classList.add(session.name.replace(/\s+/g, '-').toLowerCase());
		table.classList.add(session.name.replace(/\s+/g, '-').toLowerCase());
	})
	
	// console.log(exchangeOpen);
	if (exchangeOpen) {
		table.classList.add("open");
		li.classList.add("open");
	}
	
	li.appendChild(table);
	li.appendChild(text);
	// container.appendChild(li);
	li.appendChild(referral);
	
	return [li, table]
}

function generateAds() {
	// ad = document.createElement("li");
	document.getElementById("ad");
	ad.classList.add("ad", "exchange-item");
	
	let title = document.createElement("h1");
	title.innerHTML = "Ad";
	let adImg = document.createElement("img");
	adImg.setAttribute("src", "testAd.png");
	let text = document.createElement("p");
	text.innerHTML = "MariahCoin to the moon.";
	// ad.innerHTML = '<ins class="adsbycontextcue" data-cc-site="3be5690f-465e-4fe1-90eb-8e23b5a2216c" data-cc-slot="yn4LwZ0aL" style="width:300px;height:250px;"></ins>';
	// ad.innerHTML = '<ins class="adsbycontextcue" data-cc-site="3be5690f-465e-4fe1-90eb-8e23b5a2216c" data-cc-slot="9jWtVgXUz" style="width:300px;height:250px;"></ins>';
	// ad.innerHTML = '<div id="container-727c14fa740149ed6c4d984df64bdcb8"></div>';
	// ad.innerHTML = '<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.effectivedisplayformat.com/f87a01fb9d81d4a56680550f54cdd8db/invoke.js"></scr' + 'ipt>';
	// ad.innerHTML = 	  "<script>atOptions = {'key' : 'f87a01fb9d81d4a56680550f54cdd8db','format' : 'iframe','height' : 250,'width' : 300,'params' : {}};\n</script>" + document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.effectivedisplayformat.com/f87a01fb9d81d4a56680550f54cdd8db/invoke.js"></scr' + 'ipt>');
	// ad.appendChild(adImg);
	// ad.appendChild(text);
	
	
	return ad
}

let openExchanges = document.createElement('ul');
openExchanges.classList.add("exchange-list");
let extendedOpenExchanges = document.createElement('ul');
extendedOpenExchanges.classList.add("exchange-list");
let closedExchanges = document.createElement('ul');
closedExchanges.classList.add("exchange-list");

let exchangeData = Object.keys(exchanges);
let container = document.getElementById("tableContainer");

for (key of exchangeData) {
	let exchange = exchanges[key];
	let exchangeTime = localTime.setZone(exchange.timeZone);
	let exchangeOpenOnThisDay = isThisDayATradingDay(exchange, exchangeTime);
	let exchangeOpen = isExchangeOpen(exchanges[key], exchangeTime);
	let exchangeTimeNextOpen = exchangeTime;
	
	daysTilNextOpen = getDaysTilNextOpen(exchange, exchangeTime);
	
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
		
	generateTable(table, tableData);
	generateTableHead(table, Object.keys(tableData[0]));
}

ad = generateAds();

container.appendChild(openExchanges);
container.appendChild(extendedOpenExchanges);
container.appendChild(closedExchanges);

adLocation = Math.floor(Math.random() * container.childNodes.length);
adLocation2 = Math.floor(Math.random() * container.childNodes[adLocation].childNodes.length);
// container.childNodes[adLocation].childNodes[adLocation2].insertNode(ad);
container.childNodes[adLocation].insertBefore(ad, container.childNodes[adLocation].childNodes[adLocation2 + 1]);


document.getElementById("browserTimezone").innerHTML = localTime.zoneName;
document.getElementById("detectedLocation").innerHTML = localTime.zoneName.split("/")[1] + ", " + ct.getCountryForTimezone(localTime.zoneName).name;

const supportsMasonry = CSS.supports('grid-template-rows', 'masonry');

if (supportsMasonry) {
	console.log('Native masonry is supported, do nothing');
} else {
	const elem = document.querySelector('.masonry');
	const msnry = new Masonry(elem, {
		// options
		itemSelector: '.exchange-item',
		fitWidth: true
	});
}

let adCheck = document.querySelector(".aa_container");
if (adCheck == null) {
	ad = document.getElementById("aa-ad");
	ad.innerHTML = "";
	ad.style.visibility = "hidden";
}

// if (navigator.brave && await navigator.brave.isBrave() || false) {
// 	console.log("brave")
// }

if (navigator.brave !== undefined) {
	list = document.querySelector(".fallback-list");
	li = document.createElement("li")
	li.classList.add("brave");
	li.innerHTML = "Send me a tip with Brave Rewards"
	list.appendChild(li);
}