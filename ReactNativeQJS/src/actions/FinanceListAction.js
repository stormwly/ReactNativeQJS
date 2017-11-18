'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import {toastShort} from "../common/ToastUtils"

export const getNetFinanceList = (financeList) => {
    return dispatch => {
        dispatch(getFinanceListStart(financeList))
        HttpUtils.post(HttpConfigs.api.invest_list).then(response => {
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        dispatch(getFinanceListSuccess(response.data));
                    } else {
                        dispatch(getFinanceListFail(response.message,financeList));
                    }
                } else {
                    dispatch(getFinanceListFail(response.message,financeList));
                }
            }
        ).catch(err => {
            //请求失败
            console.log(err)
            toastShort(ConstantData.NET_ERROR);
            dispatch(getFinanceListFail(err,financeList));
        });
    }


}

let getFinanceListStart = (financeList) => {
    return {
        type: ActionTypes.GET_FINANCE_LIST_START,
        financeList
    }
}

let getFinanceListSuccess = (response) => {
    return {
        type: ActionTypes.GET_FINANCE_LIST_SUCCESS,
        financeList:response
    }
}

let getFinanceListFail = (errInfo,financeList) => {
    return {
        type: ActionTypes.GET_FINANCE_LIST_FAILURE,
        errInfo,
        financeList
    }
}