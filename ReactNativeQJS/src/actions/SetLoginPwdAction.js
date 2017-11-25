'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import {toastShort} from "../common/ToastUtils"

export const summit = (phoneNum, password, messageCode) => {
    return dispatch => {
        dispatch(summitStart())
        HttpUtils.get(HttpConfigs.api.user_setLoginPwd, {
            phoneNum: phoneNum,
            password: password,
            messageCode: messageCode
        }).then(response => {
                console.log(response)
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        toastShort('修改成功');
                        dispatch(summitSuccess(response.data));

                    } else {
                        dispatch(summitFail(response.message));
                        toastShort('修改失败');
                    }
                } else {
                    dispatch(summitFail(response.message));
                    toastShort('修改失败');
                }
            }
        ).catch(err => {
            //请求失败
            console.log(err)
            toastShort(ConstantData.NET_ERROR);
            dispatch(summitFail(err));
        });
    }
}

export const getValidPhone = (validPhone) => {
    return {
        type: ActionTypes.GET_SET_LOGIN_PWD_VALID_PHONE,
        validPhone
    }
}

export const setMessageCodeTxt = (messageCodeTxt) => {
    return {
        type: ActionTypes.SET_FORGET_LOGIN_PWD_MESSAGE_TXT,
        messageCodeTxt
    }
}

export const getValidPwd = (validPwd) => {
    return {
        type: ActionTypes.GET_SET_LOGIN_PWD,
        validPwd
    }
}

export const isShowForgetPassWord = (isShowPwd) => {
    return {
        type: ActionTypes.IS_SHOW_SET_LOGIN_PASS_WORD,
        isShowPwd
    }
}

let summitStart = () => {
    return {
        type: ActionTypes.SET_LOGIN_PWD_SUMMIT_START,
    }
}

let summitSuccess = (response) => {
    return {
        type: ActionTypes.SET_LOGIN_PWD_SUMMIT_SUCCESS,
        userData: response
    }
}

let summitFail = (errInfo) => {
    return {
        type: ActionTypes.SET_LOGIN_PWD_SUMMIT_FAILURE,
        errInfo,
    }
}