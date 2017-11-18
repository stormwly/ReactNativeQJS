import * as ActionTypes from '../contants/ActionTypes'

const initState = {
    financeList: [],
    errInfo: null,
    isRefreshing:false
}

export default function FinanceListReducers(state = initState, action) {
    switch (action.type) {
        case ActionTypes.GET_FINANCE_LIST_START:
            return Object.assign(
                {}, state, {
                    financeList:action.financeList,
                    errInfo: null,
                    isRefreshing:true
                });
        case ActionTypes.GET_FINANCE_LIST_SUCCESS:
            return Object.assign(
                {}, state, {
                    financeList: action.financeList,
                    errInfo: null,
                    isRefreshing:false
                });
        case ActionTypes.GET_FINANCE_LIST_FAILURE:
            return Object.assign(
                {}, state, {
                    financeList:action.financeList,
                    isRefreshing:false,
                    errInfo: action.errInfo
                });
        default:
            return state;
    }

}
