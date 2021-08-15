// !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).justDetectAdblock=e()}(this,(function(){"use strict";function t(){return void 0!==navigator.brave&&void 0!==navigator.brave.isBrave}function e(){return"string"==typeof navigator.userAgent&&navigator.userAgent.match(/Opera|OPR\//)}function n(){return new Promise((function(t,e){var n=new XMLHttpRequest;n.onreadystatechange=function(){4==n.readyState&&t(n)},n.open("GET","https://raw.githubusercontent.com/wmcmurray/just-detect-adblock/master/baits/pagead2.googlesyndication.com",!0),n.send()}))}function o(t){return 200===t.status&&!t.responseText.match(/^thistextshouldbethere(\n|)$/)}function i(t){return 0===t.status&&!t.responseText.match(/^thistextshouldbethere(\n|)$/)}function r(){if(null!==window.document.body.getAttribute("abp"))return!0;var t=function(){var t=document.createElement("div");return t.setAttribute("class","pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links ad-text adSense adBlock adContent adBanner"),t.setAttribute("style","width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;"),t}();window.document.body.appendChild(t);var e=function(t){if(null===t.offsetParent||0==t.offsetHeight||0==t.offsetLeft||0==t.offsetTop||0==t.offsetWidth||0==t.clientHeight||0==t.clientWidth)return!0;if(void 0!==window.getComputedStyle){var e=window.getComputedStyle(t,null);if(e&&("none"==e.getPropertyValue("display")||"hidden"==e.getPropertyValue("visibility")))return!0}return!1}(t);return window.document.body.removeChild(t),e}var u;return{detectAnyAdblocker:function(){return new Promise((function(u,d){if(r())return u(!0);t()||e()?n().then((function(n){return t()?u(o(n)):e()?u(i(n)):void u(!1)})):u(!1)}))},detectDomAdblocker:(u=r,function(){var t=arguments;return new Promise((function(e,n){e(u.apply(this,t))}))}),detectBraveShields:function(){return new Promise((function(e,i){t()?n().then((function(t){e(o(t))})):e(!1)}))},detectOperaAdblocker:function(){return new Promise((function(t,o){e()?n().then((function(e){t(i(e))})):t(!1)}))},isDetected:function(t,e){return function(){return console.warn("just-detect-adblock : "+(e||"This method is deprecated.")),t.apply(this,arguments)}}(r,"The `isDetected()` method is now deprecated, please use `detectAnyAdblocker()` instead, which returns a Promise and can detect more stuff (like Brave Shields).")}}));

// async function checkForAdBlocker() {
// 	let Blocked;
// 
// 	async function Request() {
// 		try {
// 			return fetch(
// 					new Request(
// 						// "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
// 						"https://a-ads.com/assets/common/ad_blocker-203c5bd097d317c7badf88cd5afdaf79091c5f0b9ab00763ae2a84ee4d2c218b.js", {
// 							method: 'HEAD',
// 							mode: 'no-cors'
// 						}))
// 				.then(function(response) {
// 					// There is no AdBlocker
// 					Blocked = false;
// 					return Blocked;
// 				}).catch(function(e) {
// 					// Failed, Because of an AdBlocker
// 					Blocked = true;
// 					return Blocked;
// 				});
// 		} catch (error) {
// 			console.log(error);
// 			Blocked = true;
// 			return Blocked;
// 		}
// 	}
// 
// 	return Blocked !== undefined ? Blocked : await Request();
// }
// 
// // const usingBlocker = await checkForAdBlocker();
// 
// const usingBlocker = async function () {
// 	return await checkForAdBlocker();
// }

// fetch(
// 	new Request(
// 		// 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
// 			'https://publishers.basicattentiontoken.org/packs/js/static-6b4275072ebcdf6e6ed34e5b978e685f15b7b9ab.js', {
// 			method: 'HEAD',
// 			mode: 'no-cors'
// 		}))
//   .then(response => {
// 	if (!response.ok) {
// 	  throw new Error('Network response was not ok');
// 	}
// 	// else {
// 	// 	console.log("success")
// 	// }
// 	return response.blob();
//   })
//   .then(myBlob => {
// 	console.log("success");
//   })
//   .catch(error => {
// 	console.error('There has been a problem with your fetch operation:', error);
//   });

async function detectAdBlock() {
	  let adBlockEnabled = false
	  const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
	  // const googleAdUrl = 'https://whendoesthemarketopen.com/script3.js';
	  try {
		await fetch(new Request(
			googleAdUrl, {
				method: 'HEAD',
				mode: 'no-cors'
			}))
			.catch(_ => adBlockEnabled = true)
	  } catch (e) {
		adBlockEnabled = true
	  } finally {
		console.log(`AdBlock Enabled: ${adBlockEnabled}`)
	  }
	}
	detectAdBlock();

// async function checkAdBlock() {
// 	fetch(
// 		new Request(
// 			'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
// 				method: 'HEAD',
// 				mode: 'no-cors'
// 			}))
// 	  .then(response => {
// 		if (!response.ok) {
// 		  throw new Error('Network response was not ok');
// 		  return true;
// 		}
// 		return response.blob();
// 	  })
// 	  .then(myBlob => {
// 		console.log("success");
// 		return false;
// 	  })
// 	  .catch(error => {
// 		console.error('There has been a problem with your fetch operation:', error);
// 		return true;
// 	  });
// }
// 
// const usingBlocker = await checkAdBlock();
// 
// console.log(usingBlocker)



// Using the ad block checker
// usingBlocker().then((res) => { 
// 	 if(res) {
// 	console.log('AdBlock is enabled');
// ad = document.getElementById("aa-ad");
// ad.innerHTML = "";
// ad.style.visibility = "hidden";
// 	 } else {
// 	console.log('AdBlock is NOT enabled');
// 	 }
// });
// console.log(usingBlocker);