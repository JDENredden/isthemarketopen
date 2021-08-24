// Script to determine the browser location, and then insert ads/affiliate/sponsored posts accordingly

// .innerHTML but with script eval. https://stackoverflow.com/a/47614491
var setInnerHTML = function(elm, html) {
	  elm.innerHTML = html;
	  Array.from(elm.querySelectorAll("script")).forEach( oldScript => {
		const newScript = document.createElement("script");
		Array.from(oldScript.attributes)
		  .forEach( attr => newScript.setAttribute(attr.name, attr.value) );
		newScript.appendChild(document.createTextNode(oldScript.innerHTML));
		oldScript.parentNode.replaceChild(newScript, oldScript);
	  });
	}
	
var ads = {
	"etoro" : {
		"countries" : ["AU", "UK"],
		"url" : "https://med.etoro.com/B18126_A109752_TClick.aspx",
		"creative" : {
			"wide" : {
				"imgUrl" : "etoro_wide.gif"
			},
			"widget" : {
				// "source" : `<div id="etoro-widget"></div>\n<script type="text/javascript">\nwindow['widgetSettings']={\nfeedType:'cryptocurrency',pageName:'Default',\ncontainer:'etoro-widget',\nculture: 'en-gb',\nisEtoro: true,\nclickTag: '',\nw_size:'s_728x90',\netoroUrl: " https://med.etoro.com/B15356_A109752_TClick_ADVTrue.aspx"\n}\n</script>\n<script src="https://pages.etoro.com/widgets/widget-redesign/stocks-list/iframe-creator.js" type="text/javascript"></script>`
				"source" : `<div id="etoro-widget"></div>
				  <script type="text/javascript">
					  window['widgetSettings']={
						  feedType:'cryptocurrency',
						  pageName:'Default', // your site name/ other custom name (used for tracking)
						  container:'etoro-widget', // Container
						  culture: 'en-gb', //en-gb, de-de, fr-fr, es-es, ar-ae, it-it, sv-se, nl-nl, nb-no, da-dk
						  isEtoro:true,
						  clickTag:'',
						  w_size:'s_728x90',    // s_300X250 , s_300x600 , s_728x90 , s_970x90, s_970x250
						  etoroUrl: " https://med.etoro.com/B15356_A109752_TClick_ADVTrue.aspx"
					  }
				  </script>
				  <script src="iframe-creator.js" type="text/javascript"></script>`
			}
		}
	}
}

// let DateTime = luxon.DateTime;

const time = luxon.DateTime.now();

country = ct.getCountryForTimezone(time.zoneName).id;

adsBrand = Object.keys(ads);

availableAds = [];
for (ad of adsBrand) {
	// console.log(ads[ad])
	if (ads[ad].countries.includes(country)) {
		availableAds.push(ad)
	}
}

// test = document.getElementById("test");
// setInnerHTML(test, ads[availableAds[0]].creative.widget.source)



console.log(availableAds);
console.log(ads[availableAds[0]].creative.widget.source)