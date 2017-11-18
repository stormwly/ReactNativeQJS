import * as ActionTypes from '../contants/ActionTypes'

const initState = {
    noticeContent: null,
    errInfo: null
}

export default function HomeNotice(state = initState, action) {

    switch (action.type) {
        case ActionTypes.GET_HOME_NOTICE_SUCCESS:
            return Object.assign(
                {}, state, {
                    noticeContent: action.noticeContent
                });
        case ActionTypes.GET_HOME_NOTICE_FAILURE:
            return Object.assign(
                {}, state, {
                    errInfo: action.errInfo
                });
        default:
            return state;
    }

}
