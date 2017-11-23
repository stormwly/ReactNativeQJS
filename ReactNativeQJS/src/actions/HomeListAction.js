'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import RepositoryUtils from '../common/storage/RepositoryUtils'
import {toastShort} from "../common/ToastUtils"

export const getHomeList = () => {
    return dispatch => {
        dispatch(getHomeListStart(false))
        RepositoryUtils.init().getCacheDataByKey(StorageKeys.homeFinanceList).then(response => {
            dispatch(getHomeListSuccess(response));
        }).catch(err => {
            console.log(err)
            dispatch(getHomeListFail(err.message));
        });
    }

}

export const getNetHomeList = (financeList) => {
    return dispatch => {
        dispatch(getHomeListStart(true,financeList))
        HttpUtils.post(HttpConfigs.api.home_finance_list).then(response => {
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        dispatch(getHomeListSuccess(response.data));
                        RepositoryUtils.init().saveCacheDataByKey(StorageKeys.homeFinanceList, response.data);
                    } else {
                        dispatch(getHomeListFail(response.message,financeList));
                    }
                } else {
                    dispatch(getHomeListFail(response.message,financeList));
                }
            }
        ).catch(err => {
            //请求失败
            console.log(err)
            toastShort(ConstantData.NET_ERROR);
            dispatch(getHomeListFail(err,financeList));
        });
    }


}

let getHomeListStart = (isRefreshing,financeList) => {
    return {
        type: ActionTypes.GET_HOME_LIST_START,
        isRefreshing,
        financeList
    }
}

let getHomeListSuccess = (response) => {
    return {
        type: ActionTypes.GET_HOME_LIST_SUCCESS,
        financeList:response
    }
}

let getHomeListFail = (errInfo,financeList) => {
    return {
        type: ActionTypes.GET_HOME_LIST_FAILURE,
        errInfo,
        financeList
    }
}