/**
 * Google Analytics for PhoneGap/Cordova, in a JavaScript Way<br>
 * 
 * Add http://www.google-analytics* to your project whitelist external hosts if
 * needed<br>
 * Usage sample : cordovaLab.ga.html
 */

// namespacing
var cordovaLab = {};

cordovaLab.ga = (function() {

	var $ = {};

	/**
	 * set your Google Analytics Account ID
	 */
	$.setAccount = function(account_id) {
		$.accountID = account_id;
	};

	$.setSiteAddress = function(website_address) {
		$.siteAddress = website_address;
	};

	var hashCode = function(param) {
		var hash = 0;
		if (param.length == 0)
			return hash;
		for ( var i = 0; i < param.length; i++) {
			char = param.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return Math.abs(hash);
	};

	/**
	 * Track a page being viewed
	 */
	$.track = function(page) {
		var utmac = $.accountID;
		var utmhn = $.siteAddress;
		var utmn = Math.random() * 1000000000;
		var domainHash = "%3D1";
		var currentDate = new Date();
		var currentTimeStamp = currentDate.getTime();
		var timestampOfPreviousVisit = currentTimeStamp;
		var timestampOfCurrentVisit = currentTimeStamp;
		var timestampOfFirstVisit = currentTimeStamp;
		// first track we store date of use
		if (localStorage.getItem('cordovaLab.ga.timestampOfFirstVisit')) {
			timestampOfFirstVisit = localStorage.getItem('cordovaLab.ga.timestampOfFirstVisit');
		} else {
			localStorage.setItem('cordovaLab.ga.timestampOfFirstVisit', timestampOfFirstVisit);
		}
		
		var visitorId;
		if (device && device.uuid) {
			visitorId = hashCode(device.uuid);
		} else {
			visitorId = "1";
		}

		var visitCount = "1";
		var _utma = domainHash + "." + visitorId + "." + timestampOfFirstVisit + "." + timestampOfPreviousVisit + "."
				+ timestampOfCurrentVisit + "." + visitCount;
		var utmsr = window.innerWidth + "x" + window.innerHeight;

		var ga_url = "http://www.google-analytics.com/__utm.gif?utmwv=5.2.3&utmn=" + utmn + "&utmhn=" + utmhn
				+ "&utmcs=ISO-8859-1&utmul=fr&utmdt=" + page + "&utmr=-&utmp=" + page + "&utmac=" + utmac
				+ "&utmcc=__utma" + _utma + "&utmu=qhC~&utmsr=" + utmsr;

		var ga_img = document.createElement('img');
		ga_img.setAttribute('style', 'display:none');
		ga_img.setAttribute('src', ga_url);

		document.getElementsByTagName('body')[0].appendChild(ga_img);
	};

	return $;
})();