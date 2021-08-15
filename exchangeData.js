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
	"epa" : {
		"nameLong" : "Euronext Paris",
		"nameShort" : "EPA",
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
		"timeZone" : "Etc/UTC",
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
	},
	"aex" : {
		"nameLong" : "Euronext Amsterdam",
		"nameShort" : "AEX",
		"timeZone" : "Europe/Amsterdam",
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
				"openMinute" : 34,
				"duration" : 6
			}
		}
	},
	"mta" : {
		"nameLong" : "Borsa Italiana",
		"nameShort" : "MTA",
		"timeZone" : "Europe/Rome",
		"openDays" : [1, 2, 3, 4, 5],
		"sessions" : {
			"pre" : {
				"name" : "Opening Auction",
				"openHour" : 8,
				"openMinute" : 0,
				"duration" : 60
			},
			"core" : {
				"name" : "Continuous Trading",
				"openHour" : 9,
				"openMinute" : 0,
				"duration" : 510
			},
			"auction" : {
				"name" : "Closing Auction",
				"openHour" : 17,
				"openMinute" : 30,
				"duration" : 5
			},
			"after" : {
				"name" : "Trading at the Closing Auction Price",
				"openHour" : 17,
				"openMinute" : 34,
				"duration" : 7
			}
		}
	},
	"jse" : {
		"nameLong" : "Johannesburg Stock Exchange",
		"nameShort" : "JSE",
		"timeZone" : "Africa/Johannesburg",
		"openDays" : [1, 2, 3, 4, 5],
		"sessions" : {
			"core" : {
				"name" : "Trading",
				"openHour" : 9,
				"openMinute" : 0,
				"duration" : 510
			}
		}
	},
	"tadawul" : {
		"nameLong" : "Saudi Stock Exchange",
		"nameShort" : "Tadawul",
		"timeZone" : "Asia/Riyadh",
		"openDays" : [7, 1, 2, 3, 4],
		"sessions" : {
			"core" : {
				"name" : "Trading",
				"openHour" : 10,
				"openMinute" : 0,
				"duration" : 300
			}
		}
	}
}