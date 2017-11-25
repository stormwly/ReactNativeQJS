import * as ActionTypes from '../contants/ActionTypes'

const initState = {
    validPhone:'',
    validPwd:'',
    success:false,
    isShowPwd:false,
    isLoading: false,
    errInfo: null,
    messageCodeTxt:'获取验证码'
}

export default function ForgetLoginPwdReducers(state = initState, action) {
    switch (action.type) {
        case ActionTypes.GET_SET_LOGIN_PWD:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    validPwd:action.validPwd,
                });
        case ActionTypes.GET_SET_LOGIN_PWD_VALID_PHONE:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    validPhone:action.validPhone,
                });
        case ActionTypes.IS_SHOW_SET_LOGIN_PASS_WORD:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    isShowPwd:action.isShowPwd
                });
        case ActionTypes.SET_LOGIN_PWD_SUMMIT_START:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    isLoading: true,
                });
        case ActionTypes.SET_LOGIN_PWD_SUMMIT_SUCCESS:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:true,
                    isLoading: false,
                });
        case ActionTypes.SET_LOGIN_PWD_SUMMIT_FAILURE:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    isLoading: false,
                    errInfo: action.errInfo
                });
        case ActionTypes.SET_FORGET_LOGIN_PWD_MESSAGE_TXT:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    isLoading: false,
                    messageCodeTxt: action.messageCodeTxt
                });
        default:
            return state;
    }

}
