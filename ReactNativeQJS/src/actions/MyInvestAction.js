'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import {toastShort} from "../common/ToastUtils"

export const getMyInvestInfo = (investInfo) => {
    return dispatch => {
        dispatch(getMyInvestInfoStart(investInfo))
        HttpUtils.get(HttpConfigs.api.getMyInvestInfo,{
            token:GLOBAL.UserToken
        }).then(response => {
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        dispatch(getMyInvestInfoSuccess(response.data));
                    } else {
                        dispatch(getMyInvestInfoFail(response.message,investInfo));
                    }
                } else {
                    dispatch(getMyInvestInfoFail(response.message,investInfo));
                }
            }
        ).catch(err => {
            //请求失败
            console.log(err)
            toastShort(ConstantData.NET_ERROR);
            dispatch(getMyInvestInfoFail(err,investInfo));
        });
    }
}

let getMyInvestInfoStart = (investInfo) => {
    return {
        type: ActionTypes.GET_INVEST_INFO_START,
        investInfo
    }
}

let getMyInvestInfoSuccess = (response) => {
    return {
        type: ActionTypes.GET_INVEST_INFO_SUCCESS,
        investInfo:response
    }
}

let getMyInvestInfoFail = (errInfo,investInfo) => {
    return {
        type: ActionTypes.GET_INVEST_INFO_FAILURE,
        errInfo,
        investInfo
    }
}