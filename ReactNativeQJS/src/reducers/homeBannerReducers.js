import * as ActionTypes from '../contants/ActionTypes'

const initState = {
    bannerList: [],
    errInfo: null
}

export default function HomeBanner(state = initState, action) {
    switch (action.type) {
        case ActionTypes.GET_HOME_BANNER_SUCCESS:
            return Object.assign(
                {}, state, {
                    bannerList: action.response
                });
        case ActionTypes.GET_HOME_BANNER_FAILURE:
            return Object.assign(
                {}, state, {
                    errInfo: action.errInfo
                });
        default:
            return state;
    }

}
