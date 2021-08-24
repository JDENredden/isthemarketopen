(function() {
var global_setting = {
	isDev: function() {
		var location, isLocal;
		location = window.location.href;
		isLocal = location.indexOf('localhost') !== -1 ? true : false
		return isLocal;
	}
}
var staticSettings, userSettings, defaultSettings, settings;
var staticSettings = {
	iframeClass: 'etoro-widget',
	widgetUrl: global_setting.isDev() ? 'http://localhost/dev/etoro-pages/widgets/widget-redesign/stocks-list' : 'pages.etoro.com/widgets/widget-redesign/stocks-list',
};
var defaultSettings = {
	pageName: 'Default',
	container: 'etoro-widget"',
	etoroUrl: null,
	clickTag:null
}
var userSettings = window['widgetSettings'];

var objBuilder = {
	extend: function(originalObj, extObj) {
		for (var i in extObj) {
			originalObj[i] = extObj[i]
		}
		return originalObj
	}
};

settings = objBuilder.extend(defaultSettings, userSettings);

var urlBuilder = {
	src: function() {
		var protocol, feedType, url, paramsQS;
		protocol = global_setting.isDev() ? "" : 'https://';
		feedType ='stocks';

		url = staticSettings.widgetUrl;
		paramsQS = urlBuilder.serialize()
		params = '?w_size='+settings.w_size;
		params+=  '&clickTag='+settings.clickTag;
		params+=  '&disclaimerType=' +settings.disclaimerType;
		params+=  '&culture=' +settings.culture;
		if('affId' in settings){
			params+=  '&affId=' +settings.affId+'&bannerId='+settings.bannerId;
		}
		if('etoroUrl' in settings){
			params+=  '&etoroUrl='+settings.etoroUrl
		}
		return protocol + url + '/' + feedType + '/index.php' + params + '&' +encodeURIComponent(paramsQS);
	},
	serialize: function() {
		var obj, str;

		str = [];

		for (var key in obj)
			if (obj.hasOwnProperty(key)) {
				str.push(key + "=" + obj[key]);
			}

		return str.join("&");
	},
	isDev: function() {
		var location, isLocal;

		location = window.location.href;
		isLocal = location.split('/')[2] == 'localhost' ? true : false;

		return isLocal;
	},

};
var iframeCreator = {
	properties: {
		container: settings.container,
		src: urlBuilder.src(),
		class: staticSettings.iframeClass,
		isEtoro: settings.isEtoro,
		feedType: 'stocks'
	},
	impressionPixel: function(settings) {
		// for tracking
		var img = document.createElement('img');
		img.style.width = 0;
		img.style.height = 0;
		img.style.opacity = 0;
		img.src = settings.etoroUrl + '&Task=Click&TargetURL=https://marketing.etorostatic.com/others/tracking/blank.gif';
		document.body.appendChild(img);
	},
	setSize: function(isEtoro){
		if (!isEtoro) {
			return [300,548];// ifarme width, height
		}
		return [350, 558];// ifarme width, height
	},
	createIframe: function() {
		var attrs, container, ifrm, setSize, that;

		that = this;
		attrs = that.properties;
		container = document.querySelectorAll("div#" + attrs.container);
		setSize = that.setSize(attrs.isEtoro);
		if (!container) return;
		container = container[0];
		ifrm = document.createElement("iframe");

		ifrm.setAttribute("class", attrs.class);
		ifrm.setAttribute("frameborder", '0');
		ifrm.setAttribute("src", attrs.src);
		ifrm.style.overflow = 'hidden';
		ifrm.width=300;
		ifrm.height=250;
		if(settings.w_size == 's_300X250'){
			ifrm.width=300;
			ifrm.height=250;
		}
		else if(settings.w_size == 's_300x600'){
			ifrm.width=300;
			ifrm.height=600;
		}
		else if(settings.w_size == 's_728x90'){
			ifrm.width=728;
			ifrm.height=90;
		}
		else if(settings.w_size == 's_970x90'){
			ifrm.width=970;
			ifrm.height=90;
		}
		else if(settings.w_size == 's_970x250'){
			ifrm.width=970;
			ifrm.height=250;
		}
		try {
			container.appendChild(ifrm);
		} catch (e) {
			throw new Error('container error: ' + e);
		}
	}
};

iframeCreator.createIframe();
})()