import * as ActionTypes from '../contants/ActionTypes'

const initState = {
    investInfo: null,
    errInfo: null,
    isRefreshing: false,
}

export default function MyInvestInfoReducers(state = initState, action) {
    switch (action.type) {
        case ActionTypes.GET_INVEST_INFO_START:
            return Object.assign(
                {}, state, {
                    investInfo: action.investInfo,
                    errInfo: null,
                    isRefreshing: true
                });
        case ActionTypes.GET_INVEST_INFO_SUCCESS:
            return Object.assign(
                {}, state, {
                    investInfo: action.investInfo,
                    errInfo: null,
                    isRefreshing: false
                });
        case ActionTypes.GET_INVEST_INFO_FAILURE:
            return Object.assign(
                {}, state, {
                    investInfo: action.investInfo,
                    isRefreshing: false,
                    errInfo: action.errInfo
                });
        default:
            return state;
    }

}
