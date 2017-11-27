'use strict'

 let HttpConfigs= {
    api: {
        baseUrl: 'http://rapapi.org/mockjs/26579/',
        home_banner: 'home/getBanner',//首页中的获取banner接口
        home_finance_list:'home/getFinanceList',
        invest_list:'finance/getFinanceList',//获取理财列表中的数据
        previous_invest_list:'finance/getPreviousFinanceList',//获取往期理财项目列表数据
        getAccountInfo:'user/getAccountInfo',//获取用户账户中心数据
        home_getNotices:'home/getNotices',//获取首页中的最新公告
        user_login:'user/login',//登录
        user_setLoginPwd:'user/setLoginPwd',//设置登录密码
        getMyInvestInfo:'user/getMyInvestInfo',//我的邀请
    },

    //基础请求参数
    baseParams: {
        accessToken: 'qjsToken',
        app_version: 100000,
    },

    map: {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    },

    timeout:30000,
};

export default HttpConfigs;