import * as ActionTypes from '../contants/ActionTypes'

const initState = {
    financeList: [],
    errInfo: null,
    isRefreshing:false,
    hasMore:false
}

export default function PreviousFinanceListReducers(state = initState, action) {
    switch (action.type) {
        case ActionTypes.GET_PREVIOUS_FINANCE_LIST_START:
            return Object.assign(
                {}, state, {
                    financeList:action.financeList,
                    errInfo: null,
                    isRefreshing:action.isRefreshing,
                    hasMore:action.hasMore
                });
        case ActionTypes.GET_PREVIOUS_FINANCE_LIST_SUCCESS:
            return Object.assign(
                {}, state, {
                    financeList:action.isLoadMore?action.currentFinanceList.concat(action.newFinanceList):action.newFinanceList,
                    errInfo: null,
                    isRefreshing:action.isRefreshing,
                    hasMore:action.hasMore
                });
        case ActionTypes.GET_PREVIOUS_FINANCE_LIST_FAILURE:
            return Object.assign(
                {}, state, {
                    financeList:action.financeList,
                    isRefreshing:action.isRefreshing,
                    errInfo: action.errInfo,
                    hasMore:action.hasMore
                });
        default:
            return state;
    }

}
