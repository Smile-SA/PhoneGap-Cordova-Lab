//
//  Badge.m
//
//  Author: Smile.fr
//


#import "Badge.h"


@implementation BadgePlugin

@synthesize callbackID;

- (void)set:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options 
{
	NSString *BadgeNumberString 	= [arguments objectAtIndex:0];
    NSInteger BadgeNumber 	        = [BadgeNumberString integerValue];
	[[UIApplication sharedApplication] setApplicationIconBadgeNumber:BadgeNumber];
    
    //Create Plugin Result
	PluginResult* pluginResult 		= [PluginResult resultWithStatus:PGCommandStatus_OK messageAsString:                        @"Badge set"];
    
    //Call  the Success Javascript function
    [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    
}

- (void)clear:(NSMutableArray*)badgeNumber withDict:(NSMutableDictionary*)options
{
	[[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
    
    //Create Plugin Result
	PluginResult* pluginResult 		= [PluginResult resultWithStatus:PGCommandStatus_OK messageAsString:                        @"Badge cleared"];
    
    //Call  the Success Javascript function
    [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
    
}

@end

