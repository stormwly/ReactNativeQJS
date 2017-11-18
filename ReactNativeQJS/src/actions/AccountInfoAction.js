'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import {toastShort} from "../common/ToastUtils"

export const getNetAccountInfo = (accountInfo) => {
    return dispatch => {
        dispatch(getAccountInfoStart(accountInfo))
        HttpUtils.get(HttpConfigs.api.getAccountInfo).then(response => {
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        dispatch(getAccountInfoSuccess(response.data));
                    } else {
                        dispatch(getAccountInfoFail(response.message,accountInfo));
                    }
                } else {
                    dispatch(getAccountInfoFail(response.message,accountInfo));
                }
            }
        ).catch(err => {
            //请求失败
            console.log(err)
            toastShort(ConstantData.NET_ERROR);
            dispatch(getAccountInfoFail(err,accountInfo));
        });
    }
}

export const getAvatarSource=(dispatch,avatarSource)=>{
   return dispatch(getAvatarSourceAction(avatarSource))
}

let getAccountInfoStart = (accountInfo) => {
    return {
        type: ActionTypes.GET_ACCOUNT_INFO_START,
        accountInfo
    }
}

let getAvatarSourceAction = (avatarSource) => {
    return {
        type: ActionTypes.GET_ACCOUNT_AVATAR_SOURCE,
        avatarSource
    }
}

let getAccountInfoSuccess = (response) => {
    return {
        type: ActionTypes.GET_ACCOUNT_INFO_SUCCESS,
        accountInfo:response
    }
}

let getAccountInfoFail = (errInfo,accountInfo) => {
    return {
        type: ActionTypes.GET_ACCOUNT_INFO_FAILURE,
        errInfo,
        accountInfo
    }
}