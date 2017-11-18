import * as ActionTypes from '../contants/ActionTypes'

const initState = {
    isRefreshing: false,
    financeList: [],
    isLoading: false,
    errInfo: null
}

export default function HomeListReducers(state = initState, action) {
    switch (action.type) {
        case ActionTypes.GET_HOME_LIST_START:
            return Object.assign(
                {}, state, {
                    isLoading: true,
                    financeList: action.financeList,
                    errInfo: null,
                    isRefreshing: action.isRefreshing
                });
        case ActionTypes.GET_HOME_LIST_SUCCESS:
            return Object.assign(
                {}, state, {
                    isLoading: false,
                    financeList: action.financeList,
                    errInfo: null,
                    isRefreshing: false
                });
        case ActionTypes.GET_HOME_LIST_FAILURE:
            return Object.assign(
                {}, state, {
                    isLoading: false,
                    financeList: action.financeList,
                    isRefreshing: false,
                    errInfo: action.errInfo
                });
        default:
            return state;
    }

}
