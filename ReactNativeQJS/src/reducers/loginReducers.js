import * as ActionTypes from '../contants/ActionTypes'

const initState = {
    validPhone:'',
    validPwd:'',
    isShowPwd:false,
    userData:null,
    isLoading: false,
    errInfo: null,
}

export default function LoginReducers(state = initState, action) {
    switch (action.type) {
        case ActionTypes.GET_LOGIN_VALID_PWD:
            return Object.assign(
                {}, state, {
                    ...state,
                    validPwd:action.validPwd,
                });
        case ActionTypes.GET_LOGIN_VALID_PHONE:
            return Object.assign(
                {}, state, {
                    ...state,
                    validPhone:action.validPhone,
                });
        case ActionTypes.IS_SHOW_LOGIN_PASS_WORD:
            return Object.assign(
                {}, state, {
                    ...state,
                    isShowPwd:action.isShowPwd
                });
        case ActionTypes.LOGIN_START:
            return Object.assign(
                {}, state, {
                    ...state,
                    isLoading: true,
                });
        case ActionTypes.LOGIN_SUCCESS:
            return Object.assign(
                {}, state, {
                    ...state,
                    isLoading: false,
                    userData: action.userData,
                });
        case ActionTypes.LOGIN_FAILURE:
            return Object.assign(
                {}, state, {
                    ...state,
                    isLoading: false,
                    errInfo: action.errInfo
                });
        default:
            return state;
    }

}
