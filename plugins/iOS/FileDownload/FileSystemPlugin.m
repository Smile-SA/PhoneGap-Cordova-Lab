//
//  FileSystemPlugin.m

//
//  Author: Nizar SEHLI
//

#import "FileSystemPlugin.h"

@implementation FileSystemPlugin

@synthesize callbackID;

//
//	Saves a file to iOS "Documents" folder from a URL received from javascript
//	The video file is saved with the same name in the url. 
//	Example : 
//	http://www.example.com/videos/video-1234.mp4 will be saved under the name "video-1234.mp4"
// 	The video will be accessible from phonegap's "www" folder using "../../Documents/video-1234.mp4"
//
-(void)saveToDiskFromUrl:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options 
{
	NSMutableString *stringToReturn = [NSMutableString stringWithString: @"File not saved!"];
	//The first argument in the arguments parameter is the callbackID.
	//We use this to send data back to the successCallback or failureCallback
	//through PluginResult.   
	self.callbackID 					= [arguments pop];
	
	//Get the string that javascript sent us. 
	//This is the video url to download
	NSString *videoURL 					= [arguments objectAtIndex:0];
    
    //Getting NSURL from video url string
    NSURL  *url 						= [NSURL URLWithString:videoURL];
    
    //Getting video file name
    NSString* videoFileName 			= [url lastPathComponent];
    
    //Download the video
    NSData *urlData 					= [NSData dataWithContentsOfURL:url];
    
    //Saving the video
    if ( urlData )
    {
        NSArray       *paths 			= NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
        NSString  *documentsDirectory 	= [paths objectAtIndex:0];  
        NSString  *filePath 			= [NSString stringWithFormat:@"%@/%@", documentsDirectory,videoFileName];
        [urlData writeToFile:filePath atomically:YES];
        stringToReturn 					= [NSMutableString stringWithString: videoFileName];
    }
	
	//Create Plugin Result
	PluginResult* pluginResult 			= [PluginResult resultWithStatus:PGCommandStatus_OK messageAsString:                        stringToReturn ];
    
    //Call  the Success Javascript function
    [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
}

//
// Deletes file from iOS "Documents" directory
//
-(void)deleteFileByName:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options 
{
	//The first argument in the arguments parameter is the callbackID.
	//We use this to send data back to the successCallback or failureCallback
	//through PluginResult.   
	self.callbackID 				= [arguments pop];
	
	//Get the string that javascript sent us. 
	//This is the file name of the video we want to delete
	NSString *videoFileName 		= [arguments objectAtIndex:0];
    
   	//Deleting file
    NSArray       *paths 			= NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString  *documentsDirectory 	= [paths objectAtIndex:0];  
    NSString  *videoFilePath 		= [NSString stringWithFormat:@"%@/%@", documentsDirectory,videoFileName];
	NSError *error;
	if ([[NSFileManager defaultManager] fileExistsAtPath:videoFilePath])		//Does file exist?
	{
		if (![[NSFileManager defaultManager] removeItemAtPath:videoFilePath error:&error])	//Delete it
		{
			NSLog(@"Delete file error: %@", error);
		}
	}
    
	//Create Plugin Result
	PluginResult* pluginResult 		= [PluginResult resultWithStatus:PGCommandStatus_OK messageAsString:                        videoFileName];
    
    //Call  the Success Javascript function
    [self writeJavascript: [pluginResult toSuccessCallbackString:self.callbackID]];
}

@end
