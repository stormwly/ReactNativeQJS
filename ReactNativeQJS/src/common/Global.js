'use-strict'
import React from 'react';
import {Dimensions, PixelRatio, Platform } from 'react-native';
import FontSize from '../component/TextSize';
import Colors from '../contants/Colors';
import HttpUtils from '../common/HttpUtils';
import RNAsyncStorage from '../common/storage/RNAsyncStorage'
import HttpConfigs from '../contants/HttpConfigs';
import StorageKeys from '../contants/StorageKeys';
import ConstantData from '../contants/ConstantData'
import NetUtils from './NetUtils'
let {height, width} = Dimensions.get('window');

// 系统是iOS
global.IOS = (Platform.OS === 'ios');
// 系统是安卓
global.Android = (Platform.OS ==='android');
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.Pixel = 1 / PixelRatio;
// 常用颜色
global.Colors = Colors;
// 适配字体
global.FONT_SIZE = FontSize;
//用户本地存储token
global.UserToken =null;
// 网络请求
global.HttpUtils = HttpUtils;
//http请求地址参数
global.HttpConfigs=HttpConfigs;
//数据缓存
global.RNAsyncStorage=RNAsyncStorage;
//数据缓存key
global.StorageKeys=StorageKeys;
//常用常量
global.ConstantData=ConstantData;
//网络监听
global.NetUtils=NetUtils;

