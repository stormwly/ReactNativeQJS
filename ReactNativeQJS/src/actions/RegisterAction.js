'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import {toastShort} from "../common/ToastUtils"

export const register = (phoneNum, password, messageCode) => {
    return dispatch => {
        dispatch(registerStart())
        HttpUtils.get(HttpConfigs.api.user_setLoginPwd, {
            phoneNum: phoneNum,
            password: password,
            messageCode: messageCode
        }).then(response => {
                console.log(response)
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        toastShort('注册成功');
                        dispatch(registerSuccess(response.data));

                    } else {
                        dispatch(registerFail(response.message));
                        toastShort('注册失败');
                    }
                } else {
                    dispatch(registerFail(response.message));
                    toastShort('注册失败');
                }
            }
        ).catch(err => {
            //请求失败
            console.log(err)
            toastShort(ConstantData.NET_ERROR);
            dispatch(registerFail(err));
        });
    }
}

export const getValidPhone = (validPhone) => {
    return {
        type: ActionTypes.GET_REGISTER_PWD_VALID_PHONE,
        validPhone
    }
}

export const setMessageCodeTxt = (messageCodeTxt) => {
    return {
        type: ActionTypes.REGISTER_PWD_MESSAGE_TXT,
        messageCodeTxt
    }
}

export const getValidPwd = (validPwd) => {
    return {
        type: ActionTypes.GET_REGISTER_PWD,
        validPwd
    }
}

export const isShowRegisterPassWord = (isShowPwd) => {
    return {
        type: ActionTypes.IS_SHOW_REGISTER_PASS_WORD,
        isShowPwd
    }
}

let registerStart = () => {
    return {
        type: ActionTypes.REGISTER_START,
    }
}

let registerSuccess = (response) => {
    return {
        type: ActionTypes.REGISTER_SUCCESS,
        userData: response
    }
}

let registerFail = (errInfo) => {
    return {
        type: ActionTypes.REGISTER_FAILURE,
        errInfo,
    }
}