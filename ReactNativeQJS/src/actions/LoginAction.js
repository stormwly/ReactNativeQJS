'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import {toastShort} from "../common/ToastUtils"

export const login= (phoneNum,password) => {
    return dispatch => {
        dispatch(loginStart())
        HttpUtils.get(HttpConfigs.api.user_login,{
            phoneNum:phoneNum,
            password:password
        }).then(response => {
                //请求成功
                if (response) {
                    if (response.code === 0) {
                        dispatch(loginSuccess(response.data));
                    } else {
                        dispatch(loginFail(response.message));
                    }
                } else {
                    dispatch(loginFail(response.message));
                }
            }
        ).catch(err => {
            //请求失败
            console.log(err)
            toastShort(ConstantData.NET_ERROR);
            dispatch(loginFail(err));
        });
    }
}

export const getValidPhone=(validPhone)=>{
    return {
        type:ActionTypes.GET_LOGIN_VALID_PHONE,
        validPhone
    }
}

export const getValidPwd=(validPwd)=>{
    return {
        type:ActionTypes.GET_LOGIN_VALID_PWD,
        validPwd
    }
}

export const isShowLoginPassWord=(isShowPwd)=>{
    return {
        type:ActionTypes.IS_SHOW_LOGIN_PASS_WORD,
        isShowPwd
    }
}

let loginStart = () => {
    return {
        type: ActionTypes.LOGIN_START,
    }
}

let loginSuccess = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        userData:response
    }
}

let loginFail = (errInfo) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        errInfo,
    }
}