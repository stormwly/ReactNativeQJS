import * as ActionTypes from '../contants/ActionTypes'

const initState = {
    userData:null,
    isLoading: false,
    errInfo: null
}

export default function LoginReducers(state = initState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_START:
            return Object.assign(
                {}, state, {
                    isLoading: true,
                    userData: action.userData,
                    errInfo: null,
                });
        case ActionTypes.LOGIN_SUCCESS:
            return Object.assign(
                {}, state, {
                    isLoading: false,
                    userData: action.userData,
                    errInfo: null,
                });
        case ActionTypes.LOGIN_FAILURE:
            return Object.assign(
                {}, state, {
                    isLoading: false,
                    userData: action.userData,
                    errInfo: action.errInfo
                });
        default:
            return state;
    }

}
