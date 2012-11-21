// Created by Smile. 
// http://www.smile.fr
// https://github.com/smile-mobile
// MIT Licensed
/**
 * 
 * Mocking Cordova, for running on desktop
 */
var cordova = (function() {
	var fireDocumentEvent = function(type, data, bNoDetach) {
		var ev = document.createEvent('HTMLEvents');
		ev.initEvent(type, true, true);
		document.dispatchEvent(ev);
	};

	return {
		fireDocumentEvent : fireDocumentEvent,
	};
})();
// aliasing
var PhoneGap = cordova;

/**
 * Mocking the PhoneGap device API
 * 
 * device.name <br>
 * device.cordova <br>
 * device.platform <br>
 * device.uuid <br>
 * device.version
 */
var device = (function(_device) {

	var DESKTOP = "desktop";

	_device.name = DESKTOP;
	_device.cordova = DESKTOP;
	_device.platform = DESKTOP;
	_device.uuid = DESKTOP;
	_device.version = DESKTOP;

	return _device;
})(device || {});

/**
 * Mocking the PhoneGap navigator API
 */
var navigator = (function(_navigator) {
	_navigator.notification = {};

	/**
	 * @method alert
	 * @param message :
	 *            {String} message to display
	 * @param callback :
	 *            {Function} called after alert
	 * @param title :
	 *            {String} title of alert
	 */
	_navigator.notification.alert = function(message, callback, title) {
		alert(message);
	};

	/**
	 * @method confirm
	 * @param message :
	 *            {String} message to display
	 * @param callback :
	 *            {Function} called after confirm
	 * @param title :
	 *            {String} title of confirm
	 * @param buttonLabels :
	 *            {String} labels of buttons comma separated (eg :
	 *            'Restart,Exit' )
	 */
	_navigator.notification.confirm = function(message, callback, title, buttonLabels) {
		confirm(message);
	};

	return _navigator;
})(navigator || {});

// DOM Ready
$(function() {
	// Mock fire event
	PhoneGap.fireDocumentEvent("deviceready");
	// add specific CSS
	$("body").addClass("desktop");
});
