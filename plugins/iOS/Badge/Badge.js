/**
 * PhoneGap plugin to manage 'Badges' on the app's desktop icon
 *
 * @author Smile.fr
 *
 */
 
BadgePlugin = function() {};

/**
 * sets the badge to 1
 */
BadgePlugin.prototype.set = function(params, success, fail) {
	return PhoneGap.exec( function(args) {
                // handle success
                success(args);
                        },
                        function(args) {
                // handle failure
                fail(args);				 
			}, 'BadgePlugin', 'set', [params]);
};

BadgePlugin.prototype.clear = function(params, success, fail) {
	return PhoneGap.exec( function(args) {
		// handle success
                success(args);
			 }, function(args) {
                // handle failure
                fail(args);
						 
			}, 'BadgePlugin', 'clear', [params]);
};

PhoneGap.addConstructor(function() {
                        if(!window.plugins)
                        {
                                window.plugins = {};
                        }
                                window.plugins.Badge = new BadgePlugin();
});