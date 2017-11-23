'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import RepositoryUtils from '../common/storage/RepositoryUtils'

export const getHomeBanner = () => {

    return dispatch => {
        RepositoryUtils.init().getCacheDataByKey(StorageKeys.homeBanner).then(response => {
            dispatch(getHomeBannerSuccess(response));
        }).catch(err => {
            console.log(err)
            dispatch(getHomeBannerFail(err.message));
        });
    }

}


let getHomeBannerSuccess = (response) => {
    return {
        type: ActionTypes.GET_HOME_BANNER_SUCCESS,
        response
    }
}

let getHomeBannerFail = (errInfo) => {
    return {
        type: ActionTypes.GET_HOME_BANNER_FAILURE,
        errInfo
    }
}