import * as ActionTypes from '../contants/ActionTypes'

const initState = {
    accountInfo: null,
    errInfo: null,
    isRefreshing: false
}

export default function AccountInfoReducers(state = initState, action) {
    switch (action.type) {
        case ActionTypes.GET_ACCOUNT_INFO_START:
            return Object.assign(
                {}, state, {
                    accountInfo: action.accountInfo,
                    errInfo: null,
                    isRefreshing: true
                });
        case ActionTypes.GET_ACCOUNT_INFO_SUCCESS:
            return Object.assign(
                {}, state, {
                    accountInfo: action.accountInfo,
                    errInfo: null,
                    isRefreshing: false
                });
        case ActionTypes.GET_ACCOUNT_INFO_FAILURE:
            return Object.assign(
                {}, state, {
                    accountInfo: action.accountInfo,
                    isRefreshing: false,
                    errInfo: action.errInfo
                });
        case ActionTypes.GET_ACCOUNT_AVATAR_SOURCE:
            return Object.assign(
                {}, state, {
                    accountInfo: action.accountInfo,
                    isRefreshing: false,
                    avatarSource:action.avatarSource,
                    errInfo: action.errInfo
                });
        default:
            return state;
    }

}
