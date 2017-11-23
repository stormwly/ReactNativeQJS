'use strict'
import RepositoryUtils from './RepositoryUtils'
let RNSync = {

    //获取首页中理财列表数据
    homeFinanceList(params) {
        let {syncParams: {resolve, reject}} = params;
        if (resolve === undefined || reject === undefined) {
            return
        }
        HttpUtils.post(HttpConfigs.api.home_finance_list).then(response => {
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        resolve && resolve(response.data);
                        RepositoryUtils.init().saveCacheDataByKey(StorageKeys.homeFinanceList, response.data);
                    } else {
                        reject && reject(new Error(response.message))
                    }
                } else {
                    reject && reject(new Error('服务端返回数据为空!'))
                }
            }
        ).catch(err => {
            //请求失败
            reject && reject(err);
        })
    },


    //获取首页顶部Banner数据
    homeBanner(params) {

        let {syncParams: {resolve, reject}} = params;
        if (resolve === undefined || reject === undefined) {
            return
        }
        HttpUtils.post(HttpConfigs.api.home_banner).then(response => {
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        resolve && resolve(response.data);
                        RepositoryUtils.init().saveCacheDataByKey(StorageKeys.homeBanner, response.data);
                    } else {
                        reject && reject(new Error(response.message))
                    }
                } else {
                    reject && reject(new Error('服务端返回数据为空!'))
                }
            }
        ).catch(err => {
            //请求失败
            reject && reject(err);
        })
    },

    //获取首页中的公告数据
    homeNoticeDesc(params) {
        let {syncParams: {resolve, reject}} = params;
        if (resolve === undefined || reject === undefined) {
            return
        }
        HttpUtils.post(HttpConfigs.api.home_getNotices).then(response => {
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        resolve && resolve(response.data);
                        RepositoryUtils.init().saveCacheDataByKey(StorageKeys.homeNoticeDesc, response.data);
                    } else {
                        reject && reject(new Error(response.message))
                    }
                } else {
                    reject && reject(new Error('服务端返回数据为空!'))
                }
            }
        ).catch(err => {
            //请求失败
            reject && reject(err);
        })
    }

}

export default RNSync;
