package com.reactnativeqjs.custom.packageInfo;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.reactnativeqjs.BuildConfig;

/**
 * Created by zhangshili on 2017/11/24.
 * 获取packageInfo的基本信息
 * 版本号,版本名称
 */

public class PackageInfoModule extends ReactContextBaseJavaModule {


    public PackageInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PackageInfo";
    }

    //获取app版本名称(eg:1.0)
    @ReactMethod
    public void getVersionName(Callback callback){
        callback.invoke(BuildConfig.VERSION_NAME);
    }

    //获取app版本号
    @ReactMethod
    public void getVersionCode(Callback callback){
        callback.invoke(BuildConfig.VERSION_CODE);
    }

    @ReactMethod
    public void getPackageName(Callback callback){
        callback.invoke(BuildConfig.APPLICATION_ID);
    }
}
