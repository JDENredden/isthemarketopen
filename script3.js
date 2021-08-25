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
		
		if (exchange.nameShort == "FX") {
			open = time.setZone(session.timeZone);
		} else {
			open = time;
		}
		
		open = open.set({ 
			hour: session.openHour, 
			minute: session.openMinute, 
			second: 0 
		});
		
		// To check if current time is before or after the close
		// if (luxon.Duration.fromObject({ minutes: session.duration }).as("hours") > 12 && luxon.Duration.fromObject({ minutes: session.duration }).as("hours") < 24) {
		// 	// if (luxon.Duration.fromObject({ minutes: session.duration }).as("hours") > 12) {
		// 	open = open.plus({days: -1});   
		// }
		
		let close = open.plus({ minutes: session.duration });
		
				
		if ((close.weekday - open.weekday)%7 > 0) {
			open = open.plus({ days: -1 });
		}
	
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
	let formatting = "hh':'mm' 'a";
	
	let openSessions = whatSessionIsOpen(exchange, time);
	let todayIsTradingDay = isThisDayATradingDay(exchange, time);
	
	let coreOpen = time.set({ 
		hour: exchange.sessions.core.openHour, 
		minute: exchange.sessions.core.openMinute, 
		second: 0 
	});
	
	if (exchange.sessions.core2) {
		core2Open = time.set({ 
			hour: exchange.sessions.core2.openHour, 
			minute: exchange.sessions.core2.openMinute, 
			second: 0 
		});
		coreClose = core2Open.plus({ minute: exchange.sessions.core2.duration });
		if (exchange.sessions.core3) {
			core3Open = time.set({ 
				hour: exchange.sessions.core3.openHour, 
				minute: exchange.sessions.core3.openMinute, 
				second: 0 
			});
			coreClose = core3Open.plus({ minute: exchange.sessions.core3.duration });
		}
		if (exchange.sessions.core4) {
			core4Open = time.set({ 
				hour: exchange.sessions.core4.openHour, 
				minute: exchange.sessions.core4.openMinute, 
				second: 0 
			});
			coreClose = core3Open.plus({ minute: exchange.sessions.core4.duration });
		}
		if (exchange.sessions.core5) {
			core5Open = time.set({ 
				hour: exchange.sessions.core5.openHour, 
				minute: exchange.sessions.core5.openMinute, 
				second: 0 
			});
			coreClose = core5Open.plus({ minute: exchange.sessions.core5.duration });
		}
	} else {
		coreClose = coreOpen.plus({ minute: exchange.sessions.core.duration });
	}
	
	for (key of data) {
		let sessionData = {};
		let session = exchange.sessions[key];
		if (exchange.nameShort == "FX" || exchange.nameShort == "BTC") {
			sessionOpen = time.setZone(session.timeZone);
		} else {
			sessionOpen = time;
		}
		
		sessionOpen = sessionOpen.set({ 
			hour: session.openHour, 
			minute: session.openMinute, 
			second: 0 
		});
		let sessionClose = sessionOpen.plus({ minute: session.duration });
		
		// if (exchange.nameShort == "CME GLOBEX" && session.name == "Pre-Open") {
		// 	console.log(sessionOpen.weekday);
		// 	console.log(sessionClose.weekday);
		// 	console.log(time.diff(sessionClose).as("hours"));
		// 	console.log(todayIsTradingDay);
		// }
		
		
			// if (exchange.nameShort == "FX") {
			// 	console.log(session.name);
			// 	console.log(sessionOpen.toFormat(formatting));
			// 	console.log(sessionOpen.setZone("Etc/UTC").toFormat(formatting));
			// }
		
		sessionData["className"] = key;
		sessionData["Session"] = session.name;
		
		if (exchange.nameShort == "FX" || exchange.nameShort == "BTC") {
			sessionData["Exchange Time (UTC)"] = sessionOpen.setZone("Etc/UTC").toFormat(formatting).toLowerCase() + " - " + sessionClose.setZone("Etc/UTC").toFormat(formatting).toLowerCase();
			sessionData["Local Time (" + buildAcronym(localTime.toFormat("ZZZZZ")) + ")"] = sessionOpen.setZone(localTimeZone).toFormat(formatting).toLowerCase() + " - " + sessionClose.setZone(localTimeZone).toFormat(formatting).toLowerCase();
		} else {
			sessionData["Exchange Time (" + buildAcronym(sessionOpen.toFormat("ZZZZZ")) + ")"] = sessionOpen.toFormat(formatting).toLowerCase() + " - " + sessionClose.toFormat(formatting).toLowerCase();
			sessionData["Local Time (" + buildAcronym(localTime.toFormat("ZZZZZ")) + ")"] = sessionOpen.setZone(localTimeZone).toFormat(formatting).toLowerCase() + " - " + sessionClose.setZone(localTimeZone).toFormat(formatting).toLowerCase();
		}
		
		
		// Countdown logic. If session open now -> "Now". If it is opening today -> Count down. If all sessions closed -> count down to next open day session.
		if (openSessions.includes(session)) {
			sessionData["Countdown"] = "Now";
		} else if (exchange.nameShort == "FX"  || exchange.nameShort == "BTC") {
				// console.log(session.name)
				// console.log(sessionOpen.weekday);
				// console.log(sessionClose.weekday);
				if (sessionClose.diffNow() < 0) {
					if ((sessionClose.weekday - coreOpen.weekday)%7 > 0) {
						sessionData["Countdown"] = sessionClose.plus({ days: -1}).setZone("Etc/UTC").toRelative({ unit: ["hours", "minutes"] });
					}
					sessionData["Countdown"] = sessionClose.setZone("Etc/UTC").toRelative({ unit: ["hours", "minutes"] });
					console.log(session.name)
				} else {
					sessionData["Countdown"] = sessionOpen.setZone("Etc/UTC").toRelative({ unit: ["hours", "minutes"] });
				}
		// } else if (time.diff(sessionOpen.plus({days: daysTilNextOpen})) > 0) {
		} else if (sessionClose.diffNow() < 0 && todayIsTradingDay) {
			if ((coreClose.weekday - coreOpen.weekday)%7 < 0) {
				sessionData["Countdown"] = sessionClose.plus({ days: -1}).toRelative({ unit: ["hours", "minutes"] });
			} else {
				sessionData["Countdown"] = sessionClose.toRelative({ unit: ["hours", "minutes"] });	
			}
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

// Inputs exchange and datetime object, returns boolean if exchange is open at input datetime.
function isExchangeOpen(exchange, time) {
	var isOpen;

	normalTrading = ["core", "core2", "core3", "core4", "core5"]; 
	
	for (session of normalTrading) {
		normalSession = exchange.sessions[session];

		if (normalSession == undefined) {
			break;
		}
		
		let open = time.set({ 
			hour: normalSession.openHour, 
			minute: normalSession.openMinute, 
			second: 0 
		}); 
		
		let close = open.plus({ minutes: normalSession.duration });
		

		
		// if (exchange.nameShort == "CME GLOBEX") {
		// 	console.log(isOpen);
		// 	console.log(open.weekday);
		// 	console.log(close.weekday);
		// 	console.log(close.weekday - open.weekday)
		// 	console.log((close.weekday - open.weekday)%7)
		// }
		// 
		if ((close.weekday - open.weekday)%7 > 0) {
			open = open.plus({ days: -1 });
		}
	
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
	
	// if (exchange.nameShort == "CME GLOBEX") {
	// 	console.log(isOpen);
	// 	console.log(open);
	// 	console.log(session);
	// 	console.log(close.weekday);
	// }
	return isOpen
}

function getDaysTilNextOpen(exchange, time) {
	let exchangeOpenOnThisDay = isThisDayATradingDay(exchange, time);
	let coreOpen = time.set({ 
		hour: exchange.sessions.core.openHour, 
		minute: exchange.sessions.core.openMinute, 
		second: 0 
	});
	
	if (exchange.sessions.core2) {
		core2Open = time.set({ 
			hour: exchange.sessions.core2.openHour, 
			minute: exchange.sessions.core2.openMinute, 
			second: 0 
		});
		coreClose = core2Open.plus({ minute: exchange.sessions.core2.duration });
		if (exchange.sessions.core3) {
			core3Open = time.set({ 
				hour: exchange.sessions.core3.openHour, 
				minute: exchange.sessions.core3.openMinute, 
				second: 0 
			});
			coreClose = core3Open.plus({ minute: exchange.sessions.core3.duration });
		}
		if (exchange.sessions.core4) {
			core4Open = time.set({ 
				hour: exchange.sessions.core4.openHour, 
				minute: exchange.sessions.core4.openMinute, 
				second: 0 
			});
			coreClose = core3Open.plus({ minute: exchange.sessions.core4.duration });
		}
		if (exchange.sessions.core5) {
			core5Open = time.set({ 
				hour: exchange.sessions.core5.openHour, 
				minute: exchange.sessions.core5.openMinute, 
				second: 0 
			});
			coreClose = core5Open.plus({ minute: exchange.sessions.core5.duration });
		}
	} else {
		coreClose = coreOpen.plus({ minute: exchange.sessions.core.duration });
	}
	
	// +1 day, if core session is closed already
	if (time > coreClose) {
		closedForToday = 1;
	} else {
		closedForToday = 0;
	}
	
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
	return daysTilNextOpen + closedForToday;
}

function generateListElement(exchange, time, tableData) {
	let formatting = "hh':'mm' 'a";
	let exchangeOpen = isExchangeOpen(exchange, time);
	let daysTilNextOpen = getDaysTilNextOpen(exchange, time);
	
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
	if (exchange.nameShort == "CME GLOBEX") {
		console.log("Time: " + time.weekday)
		console.log("Open: " + coreOpen.weekday);
		console.log("Close: " + coreOpen.plus({ minute: exchange.sessions.core.duration }).weekday);
		// console.log(coreOpen.diff(time));
		// console.log(time.diff(coreOpen));
		daySessionOpened = time.plus(time.diff(coreOpen));
		console.log("day session opened: " + daySessionOpened.weekday)
	}
	
	// If the session opened yesterday
	// if (time.plus(time.diff(coreOpen)).weekday < time.weekday) {
	// if (coreOpen.plus(coreOpen.diff(time)).weekday - time.weekday > 0) {
	// 	coreOpen = coreOpen.plus({ days: -1 });
	// } 
	// else if (coreClose.weekday - time.weekday < 0) {
	// 	coreClose = coreClose.plus({days: -1});
	// }
	
	// if (exchange.sessions.core2) {
	// 	coreClose = coreOpen.plus({ minute: exchange.sessions.core2.duration });
	// 	if (exchange.sessions.core3) {
	// 		coreClose = coreClose.plus({ minute: exchange.sessions.core3.duration });
	// 	}
	// 	if (exchange.sessions.core4) {
	// 		coreClose = coreClose.plus({ minute: exchange.sessions.core4.duration });
	// 	}
	// } else {
	// 	coreClose = coreOpen.plus({ minute: exchange.sessions.core.duration });
	// }
	
	if (exchange.nameShort == "FX") {
		console.log(coreClose.toFormat(formatting))
		console.log(coreOpen.weekday)
		console.log(coreClose.weekday)
	}
	
	if (exchange.sessions.core2) {
		core2Open = time.set({ 
			hour: exchange.sessions.core2.openHour, 
			minute: exchange.sessions.core2.openMinute, 
			second: 0 
		});
		coreClose = core2Open.plus({ minute: exchange.sessions.core2.duration });	
	} else {
		coreClose = coreOpen.plus({ minute: exchange.sessions.core.duration });
	} 
	
	// If session closes the day after it opened.
	// if (coreClose.weekday - time.weekday < 0) {
	// 	coreClose = coreClose.plus({days: -1});
	// }
	
	let coreOpenString = coreOpen.setZone(localTimeZone).toFormat(formatting).toLowerCase() + " - " + coreClose.setZone(localTimeZone).toFormat(formatting).toLowerCase();
	
	let currentSessions = whatSessionIsOpen(exchange, time);
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
	
	const localCountry = ct.getCountryForTimezone(localTime.zoneName);
	if (exchange.nameShort == "BTC") {
		referral = document.createElement("div");
		referral.setAttribute("class", "btc-referral");
		// referral.style.textAlign = "center";
		referral.innerHTML = '<a href="https://med.etoro.com/B9459_A109752_TClick_SBTC.aspx" target="_blank"><img border="0" src="images/etoro/etoro_crypto_wide.gif" alt=" " style="border:3px solid white; border-radius:1em; overflow:hidden;" width="468" height="60" /></a><p class="fallback-caption">Buy and sell Bitcoin with <a href="https://med.etoro.com/B9459_A109752_TClick_SBTC.aspx" target="_blank">eToro</a>.</p>';
	} else if (exchange.nameShort == "FX") {
		referral = document.createElement("div");
		referral.setAttribute("class", "btc-referral");
		referral.innerHTML = '<iframe src="https://cdn.plus500.com/Media/Banners/468x60/57192/index.html?set=Forex-Phone&language=EN&country=IE&url=https%3A%2F%2Fwww.plus500.com%2FEN%2Fmarketing%2FForex%3Fid%3D131797%26pl%3D2" style="border:3px solid white; border-radius:1em; overflow:hidden;" width="468" height="60" scrolling="no" frameborder="0" style="border:none"></iframe><p class="fallback-caption">Trade forex with <a href="https://www.plus500.com/Trading/Forex?id=131797&pl=2" target="_blank">Plus500</a>.</p>'
	} else if (exchange.plus500Symbol) {
		referral = document.createElement("div");
		referral.setAttribute("class", "plus500-instrument");
		referral.innerHTML = '<iframe width="566" height="90" frameborder="0" scrolling="no" src="https://marketools.plus500.com/Widgets/SingleInstrumentContainer?hl=en&isNT=True&tl=https%3a%2f%2fwww.plus500.com%2fTrading%2fIndices%3fid%3d131797%26pl%3d2&th=Dark&id=131797&tags=widg+chart&pl=2&instSymb=' + exchange.plus500Symbol + '"></iframe><p class="fallback-caption">Trade ' + exchange.nameShort + '-listed stock CFDs with <a href="https://www.plus500.com/Trading/Indices?id=131797&pl=2" target="_blank">Plus500</a>.</p>';
	} else {
		referral = document.createElement("p");
		referral.innerHTML = "Buy and sell " + exchange.nameShort + "-listed stocks in " + localCountry.name;
	}
	
	timeTag.innerHTML = time.toFormat("cccc, d LLLL y");
	if (exchange.nameShort == "BTC") {
		// title.innerHTML = String.fromCodePoint(0x1F3F4,0x200D,0x2620,0xFE0F) + " " + exchange.nameLong + " (" + exchange.nameShort + ") " + "<time>" + time.toFormat("h':'mm' 'a").toLowerCase() + "</time>" ;
		title.innerHTML = String.fromCodePoint(0x1F3F4,0x200D,0x2620,0xFE0F) + " " + exchange.nameLong + "<time>" + time.toFormat("h':'mm' 'a").toLowerCase() + "</time>";
	} else if (exchange.nameShort == "FX") {
		title.innerHTML = String.fromCodePoint(0x1F4B1) + " " + exchange.nameLong + "<time>" + time.toFormat("h':'mm' 'a").toLowerCase() + "</time>";
	} else {
		// title.innerHTML = countryFlagEmoji.get(ct.getCountryForTimezone(time.zoneName).id).emoji + " " + exchange.nameLong + " (" + exchange.nameShort.split(" ")[0] + ") " + "<time>" + time.toFormat("h':'mm' 'a").toLowerCase() + "</time>";
		title.innerHTML = countryFlagEmoji.get(ct.getCountryForTimezone(time.zoneName).id).emoji + " " + exchange.nameLong + "<time>" + time.toFormat("h':'mm' 'a").toLowerCase() + "</time>";
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
		"<li><b>Offset</b> " + time.zoneName.split("/")[1].replace(/_/g, ' ')  + " is " + offset["hours"] + " hours and " + offset["minutes"] + " minutes " + relativeOffset + " " + localTime.zoneName.split("/")[1].replace(/_/g, ' ') + "</li>";
	} else if (exchange.nameShort == "FX") {
		text.innerHTML = "<li><b>Trading week</b> " + openDaysString[0] + " - " + openDaysString[1] + "</li>" +
		"<li><b>Location</b> Sydney, Tokyo, Frankfurt, London, and New York</li>" +
		"<li><b>Timezone</b> " + time.toFormat("ZZZZZ") + " (UTC" + time.toFormat("ZZ") + ") " + "</li>" +
		"<li><b>Offset</b> " + time.zoneName.split("/")[1].replace(/_/g, ' ')  + " is " + offset["hours"] + " hours and " + offset["minutes"] + " minutes " + relativeOffset + " " + localTime.zoneName.split("/")[1].replace(/_/g, ' ') + "</li>";
	} else if (exchange.city) {
		text.innerHTML = "<li><b>Trading week</b> " + openDaysString[0] + " - " + openDaysString[1] + "</li>" +
		"<li><b>Location</b> " + exchange.city + ", " + ct.getCountryForTimezone(time.zoneName).name  + "</li>" + 
		"<li><b>MIC code</b> " + exchange.mic + "</li>" +
		"<li><b>Timezone</b> " + time.toFormat("ZZZZZ") + " (UTC" + time.toFormat("ZZ") + ") " + "</li>" +
		"<li><b>Offset</b> " + exchange.city  + " is " + offset["hours"] + " hours and " + offset["minutes"] + " minutes " + relativeOffset + " " + localTime.zoneName.split("/")[1].replace(/_/g, ' ') + "</li>"
		;
	} else {
		text.innerHTML = "<li><b>Trading week</b> " + openDaysString[0] + " - " + openDaysString[1] + "</li>" +
		"<li><b>Location</b> " + time.zoneName.split("/")[1].replace(/_/g, ' ') + ", " + ct.getCountryForTimezone(time.zoneName).name  + "</li>" +
		"<li><b>MIC code</b> " + exchange.mic + "</li>" +
		"<li><b>Timezone</b> " + time.toFormat("ZZZZZ") + " (UTC" + time.toFormat("ZZ") + ") " + "</li>" +
		"<li><b>Offset</b> " + time.zoneName.split("/")[1].replace(/_/g, ' ')  + " is " + offset["hours"] + " hours and " + offset["minutes"] + " minutes " + relativeOffset + " " + localTime.zoneName.split("/")[1].replace(/_/g, ' ') + "</li>"
		;	
	}
	
	let subHead2 = document.createElement("p");
	
	if (currentSessions[0].timeZone) {
		currentSessionOpenTime = time.setZone(currentSessions[0].timeZone);
	} else {
		currentSessionOpenTime = time;
	}
	
	currentSessionOpenTime = currentSessionOpenTime.set({ 
		hour: currentSessions[0].openHour, 
		minute: currentSessions[0].openMinute, 
		second: 0 
	});
	
	currentSessionCloseTime = currentSessionOpenTime.plus({ minutes: currentSessions[0].duration })
	// Countdown logic
	
	core
	
	let todayIsTradingDay = isThisDayATradingDay(exchange, time);
	
	if (exchangeOpen) {
		if (exchange.nameShort == "BTC") {
			countdown.innerHTML = "Never closes";
		// } else if (coreClose.weekday > coreOpen.weekday) {
		} else if (exchange.nameShort == "FX") {
			countdown.innerHTML = currentSessions[0].name + " closes " + currentSessionCloseTime.toRelative( { unit: ["hours", "minutes"]} );
		} else if ((coreClose.weekday - coreOpen.weekday)%7 > 0) {
			countdown.innerHTML = "Closing " + coreClose.plus({days: -1}).toRelative( { unit: ["hours", "minutes"]} );
		} else {
			countdown.innerHTML = "Closing " + coreClose.toRelative( { unit: ["hours", "minutes"]} );
		}
	} else if (currentSessions[0].name != "Closed") { // Extended open
		// if (time > currentSessionOpenTime) { // Pre-open
		if (time < coreClose) {
			countdown.innerHTML = "Opening " + coreOpen.toRelative( { unit: ["hours", "minutes"]} );
		} else if (currentSessions[0].name == "Lunch") {
			countdown.innerHTML = "Re-opening " + currentSessionOpenTime.plus({ minutes: exchange.sessions.lunch.duration });
		} else { // Extended hours 
			countdown.innerHTML = "Closed " + coreClose.toRelative( { unit: ["hours", "minutes"]} );
		}
	// } else if (time < midnight) {
	// 	countdown.innerHTML = "Closed " + coreClose.toRelative( { unit: ["hours", "minutes"]} );
	} else {
		if (daysTilNextOpen == 1) {
			countdown.innerHTML = "Closed " + coreClose.toRelative( { unit: ["hours", "minutes"]} );
		} else {
		countdown.innerHTML = "Opening " + coreOpen.plus({ days: daysTilNextOpen }).toRelative( { unit: ["hours", "minutes"]} );
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
	currentSessions.forEach((session) => {
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
	
	// let title = document.createElement("h1");
	// title.innerHTML = "Ad";
	// let adImg = document.createElement("img");
	// adImg.setAttribute("src", "testAd.png");
	// let text = document.createElement("p");
	// text.innerHTML = "MariahCoin to the moon.";
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
	
	let currentSessions = whatSessionIsOpen(exchange, exchangeTime);

	if (exchangeOpen) {
		openExchanges.appendChild(li);
	} else if (currentSessions[0].name != "Closed") { // Any session that is not Core open or closed session
		extendedOpenExchanges.appendChild(li);
	} else {
		closedExchanges.appendChild(li);
	}
		
	generateTable(table, tableData);
	generateTableHead(table, Object.keys(tableData[0]));
}

ad = generateAds();

ad2 = document.getElementById("ad2");
ad2.classList.add("ad", "exchange-item");
ad3= document.getElementById("ad3");
ad3.classList.add("ad", "exchange-item");

container.appendChild(openExchanges);
container.appendChild(extendedOpenExchanges);
container.appendChild(closedExchanges);

adLocation = Math.floor(Math.random() * container.childNodes.length);
// adLocation2 = Math.floor(Math.random() * container.childNodes[adLocation].childNodes.length);
adLocation0 = Math.floor(Math.random() * container.childNodes[0].childNodes.length);
// adLocation1 = Math.floor(Math.random() * container.childNodes[2].childNodes.length);
// adLocation2 = Math.floor(Math.random() * container.childNodes[2].childNodes.length);
adLocation1 = Math.round(0.3 * container.childNodes[2].childNodes.length);
adLocation2 = Math.round(0.6 * container.childNodes[2].childNodes.length);
// container.childNodes[adLocation].childNodes[adLocation2].insertNode(ad);


container.childNodes[0].insertBefore(ad, container.childNodes[0].childNodes[adLocation0 + 1]);
container.childNodes[2].insertBefore(ad2, container.childNodes[2].childNodes[adLocation1]);
container.childNodes[2].insertBefore(ad3, container.childNodes[2].childNodes[adLocation2 + 1]);


document.getElementById("browserTimezone").innerHTML = localTime.zoneName;
document.getElementById("detectedLocation").innerHTML = localTime.zoneName.split("/")[1] + ", " + ct.getCountryForTimezone(localTime.zoneName).name;

// const supportsMasonry = CSS.supports('grid-template-rows', 'masonry');
// 
// if (supportsMasonry) {
// 	console.log('Native masonry is supported, do nothing');
// } else {
// 	const elem = document.querySelector('.masonry');
// 	const msnry = new Masonry(elem, {
// 		// options
// 		itemSelector: '.exchange-item',
// 		fitWidth: true
// 	});
// }


function masonry() {
	const elem = document.querySelector('.masonry');
	const msnry = new Masonry(elem, {
		// options
		itemSelector: '.exchange-item',
		fitWidth: true
	});	
}

function adsFallback() {
	ads = document.querySelectorAll(".ad-content");
	ads.forEach((ad) => {
		ad.remove();
	});
	fallback = document.querySelectorAll(".fallback-content");
	fallback.forEach((ad) => {
		ad.style.visibility = "visible";
		// ad.style.display = "table-cell";
	})
	console.log("blocked")
}

function adsEnabled() {
	fallback = document.querySelectorAll(".fallback-content");
	fallback.forEach((ad) => {
		ad.remove();
	});
	ads = document.querySelectorAll(".ad-content");
	ads.forEach((ad) => {
		ad.style.visibility = "visible";
		// ad.style.display = "table-cell";
	})
	console.log("not blocked");
}

async function detectAdBlock() {
		  let adBlockEnabled = false
		  // const AdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
		  const AdUrl = 'https://pl16507235.highperformancecpm.com/727c14fa740149ed6c4d984df64bdcb8/invoke.js';
		  // const googleAdUrl = 'https://whendoesthemarketopen.com/script3.js';
		  try {
			await fetch(new Request(
				AdUrl, {
					method: 'HEAD',
					mode: 'no-cors'
				}))
				.catch(_ => adBlockEnabled = true)
		  } catch (e) {
			adBlockEnabled = true
		  } finally {
			console.log(`AdBlock Enabled: ${adBlockEnabled}`)
		  }
		  return adBlockEnabled;
		}

detectAdBlock().then(function(adBlockEnabled) {
	console.log(adBlockEnabled)
		if (adBlockEnabled) {
				adsFallback();
			} else {
				adsEnabled();
			}
	// li = document.querySelectorAll("li.ad");
	// li.forEach((item) => {
	// 	item.style.display = "table";	
	// })
	masonry();
})

// justDetectAdblock.detectAnyAdblocker().then(function(detected) {
// 	if (detected) {
// 		ad = document.querySelectorAll(".ads");
// 		ad.forEach((ad) => {
// 			ad.innerHTML = "";
// 			ad.style.visibility = "hidden";
// 			ad.remove();
// 		});
// 		console.log("blocked");
// 	} else {
// 		fallback = document.querySelectorAll(".fallback-content");
// 		fallback.forEach((ad) => {
// 			ad.innerHTML = "";
// 			ad.style.visibility = "hidden";
// 			ad.remove();
// 		});
// 		console.log("not blocked");
// 	}
// })


// window.addEventListener("load", adCheck());
// adCheck();
// if (navigator.brave && await navigator.brave.isBrave() || false) {
// 	console.log("brave")
// }

// const elem = document.querySelector('.masonry');
// const msnry = new Masonry(elem, {
// 	// options
// 	itemSelector: '.exchange-item',
// 	fitWidth: true
// });	

// if (navigator.brave !== undefined) {
// 	list = document.querySelector(".fallback-list");
// 	li = document.createElement("li")
// 	li.classList.add("brave");
// 	li.innerHTML = "Send me a tip with Brave Rewards"
// 	list.appendChild(li);
// }



// window.addEventListener("load", function() {
window.addEventListener("DOMContentLoaded", function() {
	const elem = document.querySelector('.masonry');
	const msnry = new Masonry(elem, {
		// options
		itemSelector: '.exchange-item',
		fitWidth: true
	});	
})
