//
//  PackageInfo.m
//  ReactNativeQJS
//
//  Created by 张市理 on 2017/11/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "PackageInfo.h"
#import <React/RCTBridge.h>
@implementation PackageInfo

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getVersionName:(RCTResponseSenderBlock)callback)
{
  //获得应用的Verison号:
  NSString * versionName=[[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
  callback(@[@{@"versionName":versionName}]);
}

RCT_EXPORT_METHOD(getVersionCode:(RCTResponseSenderBlock)callback)
{
  //获得build号:
  NSString * versionCode=[[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"];
  callback(@[@{@"versionCode":versionCode}]);
}

RCT_EXPORT_METHOD(getPackageName:(RCTResponseSenderBlock)callback)
{
  //获取bundleId
  NSString * packageName=[[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleIdentifier"];
  callback(@[@{@"packageName":packageName}]);
}

RCT_EXPORT_METHOD(getAppName:(RCTResponseSenderBlock)callback)
{
  //获取bundleId
  NSString *appName = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleDisplayName"];
  callback(@[@{@"appName":appName}]);
}
@end
