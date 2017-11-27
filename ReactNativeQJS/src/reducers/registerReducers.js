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

export default function RegisterReducers(state = initState, action) {
    switch (action.type) {
        case ActionTypes.GET_REGISTER_PWD:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    validPwd:action.validPwd,
                });
        case ActionTypes.GET_REGISTER_PWD_VALID_PHONE:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    validPhone:action.validPhone,
                });
        case ActionTypes.IS_SHOW_REGISTER_PASS_WORD:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    isShowPwd:action.isShowPwd
                });
        case ActionTypes.REGISTER_START:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    isLoading: true,
                });
        case ActionTypes.REGISTER_SUCCESS:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:true,
                    isLoading: false,
                });
        case ActionTypes.REGISTER_FAILURE:
            return Object.assign(
                {}, state, {
                    ...state,
                    success:false,
                    isLoading: false,
                    errInfo: action.errInfo
                });
        case ActionTypes.REGISTER_PWD_MESSAGE_TXT:
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
