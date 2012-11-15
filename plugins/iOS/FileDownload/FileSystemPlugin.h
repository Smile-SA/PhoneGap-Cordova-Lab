//
//  FileSystemPlugin.h
//
//  Author: Nizar SEHLI
//

#import <Foundation/Foundation.h>
#import <PhoneGap/PGPlugin.h>

@interface	FileSystemPlugin : PGPlugin {
    
	NSString* callbackID;  
}

@property (nonatomic, copy) NSString* callbackID;

//Instance Method  
- (void) saveToDiskFromUrl:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void) deleteFileByName:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end
