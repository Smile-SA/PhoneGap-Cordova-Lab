//
//  Badge.h
//
//  Author: Smile.fr
//

#import <Foundation/Foundation.h>
#import <PhoneGap/PGPlugin.h>

@interface BadgePlugin : PGPlugin {
    
    NSString* callbackID;  
}

@property (nonatomic, copy) NSString* callbackID;

- (void) set:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void) clear:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options; 

@end