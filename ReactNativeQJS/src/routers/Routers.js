import React from 'react';
import {
    Platform
} from 'react-native'
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation'
//公共配置文件
import Global from '../common/Global'
import TabOptions from './TabOptions'
import StackOptions from './StackOptions'
import LaunchPage from '../page/LaunchPage'
import HomePage from '../page/HomePage'
import FinancePage from '../page/FinancePage'
import DiscoverPage from '../page/DiscoverPage'
import MinePage from '../page/MinePage'
import WebViewPage from '../page/WebViewPage'
import PreviousFinancePage from '../page/PreviousFinancePage'

//底部导航相关
const Tab = TabNavigator({
    //每一个页面的配置
    Home: {
        screen: HomePage,
        navigationOptions: () => TabOptions('首页', null,ConstantData.HOME_TAB_ICON_NORMAL,ConstantData.HOME_TAB_ICON_SELECTED)
    },
    Finance: {
        screen: FinancePage,
        navigationOptions: () => TabOptions('投资', '投资项目',ConstantData.FINANCE_TAB_ICON_NORMAL,ConstantData.FINANCE_TAB_ICON_SELECTED)
    },
    Discover: {
        screen: DiscoverPage,
        navigationOptions: () => TabOptions('发现', '发现',ConstantData.DISCOVER_TAB_ICON_NORMAL,ConstantData.DISCOVER_TAB_ICON_SELECTED)
    },
    Mine: {
        screen: MinePage,
        navigationOptions: () => TabOptions('账户', null,ConstantData.MINE_TAB_ICON_NORMAL,ConstantData.MINE_TAB_ICON_SELECTED)
    }
}, {
    //设置TabNavigator的位置
    tabBarPosition: 'bottom',
    //是否在更改标签时显示动画
    animationEnabled: false,
    //是否允许在标签之间进行滑动
    swipeEnabled: false,
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: "none",
    //设置Tab标签的属性
    gesturesEnabled:false,//是否支持滑动返回收拾，iOS默认支持，安卓默认关闭

    tabBarOptions: {
        //Android属性
        upperCaseLabel: false,//是否使标签大写，默认为true
        //共有属性
        showIcon: true,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        activeTintColor: 'red',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
            height:Platform.OS==="ios"?44:55,
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        labelStyle: {//文字的样式
            fontSize: 12,
            marginBottom:1
        },
        iconStyle: {//图标的样式
            // marginBottom:5,
            // marginTop:5,
        }
    },
});
/*
 *初始化StackNavigator
 */
export default Routers = StackNavigator({
    //默认加载第一个界面,这里用来注册要跳转的界面,类似于android中的Manifest.xml文件
    Launch: {
        screen: LaunchPage,
        navigationOptions:{
            header:null
        }
    },
    Tab: {
        screen: Tab
    },
    WebView:{
        screen:WebViewPage,
        navigationOptions:({navigation})=>StackOptions({navigation})
    },
    PreviousFinance:{
        screen:PreviousFinancePage,
        navigationOptions:({navigation})=>StackOptions({navigation})
    },
},)

