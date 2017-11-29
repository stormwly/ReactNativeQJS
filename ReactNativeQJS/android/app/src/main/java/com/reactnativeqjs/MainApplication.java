package com.reactnativeqjs;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;

import cn.reactnative.modules.update.UpdateContext;
import cn.reactnative.modules.update.UpdatePackage;

import com.imagepicker.ImagePickerPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnativeqjs.custom.packageInfo.PackageInfoReactPackage;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new UpdatePackage(),
                    new ImagePickerPackage(),
                    new SplashScreenReactPackage(),
                    new PackageInfoReactPackage()
            );
        }

        @Nullable
        @Override
        protected String getJSBundleFile() {
            if(super.getJSBundleFile()!=null){
                Log.e("jsPath000000-->",super.getJSBundleFile());
            }
//            Log.e("jsPath111-->", UpdateContext.getBundleUrl(MainApplication.this));

            return  UpdateContext.getBundleUrl(MainApplication.this);
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
