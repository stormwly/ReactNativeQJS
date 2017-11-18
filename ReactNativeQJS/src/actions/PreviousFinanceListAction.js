'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import {toastShort} from "../common/ToastUtils"

export const getNetPreviousFinanceList = (financeList,pageIndex,isRefreshing,isLoadMore,hasMore) => {
    return dispatch => {
        dispatch(getPreviousFinanceListStart(financeList,isRefreshing,isLoadMore,hasMore))
        HttpUtils.get(HttpConfigs.api.previous_invest_list,{
            page:pageIndex
        }).then(response => {
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        dispatch(getPreviousFinanceListSuccess(financeList,false,isLoadMore,response.data,response.hasMore));
                        console.log('getNetPreviousFinanceList',response.hasMore)
                    } else {
                        dispatch(getPreviousFinanceListFail(financeList,false,isLoadMore,response.message,hasMore));
                    }
                } else {
                    dispatch(getPreviousFinanceListFail(financeList,false,isLoadMore,response.message,hasMore));
                }
            }
        ).catch(err => {
            //请求失败
            console.log(err)
            toastShort(ConstantData.NET_ERROR);
            dispatch(getPreviousFinanceListFail(financeList,false,isLoadMore,err,hasMore));
        });
    }


}

let getPreviousFinanceListStart = (financeList,isRefreshing,isLoadMore,hasMore) => {
    return {
        type: ActionTypes.GET_PREVIOUS_FINANCE_LIST_START,
        financeList,
        isRefreshing,
        isLoadMore,
        hasMore
    }
}

let getPreviousFinanceListSuccess = (currentFinanceList,isRefreshing,isLoadMore,response,hasMore) => {
    return {
        type: ActionTypes.GET_PREVIOUS_FINANCE_LIST_SUCCESS,
        currentFinanceList:currentFinanceList,
        isRefreshing,
        isLoadMore,
        newFinanceList:response,
        hasMore
    }
}

let getPreviousFinanceListFail = (financeList,isRefreshing,isLoadMore,errInfo,hasMore) => {
    return {
        type: ActionTypes.GET_PREVIOUS_FINANCE_LIST_FAILURE,
        errInfo,
        financeList,
        isRefreshing,
        isLoadMore,
        hasMore
    }
}