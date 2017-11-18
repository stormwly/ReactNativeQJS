'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import RepositoryUtils from '../common/storage/RepositoryUtils'
let index = 0;
export const getHomeNotice = () => {
    return dispatch => {
        RepositoryUtils.init().getDataByKey(StorageKeys.homeNoticeDesc).then(response => {
            setInterval(() => {
                updateData(response, dispatch)
            }, 3000);
        }).catch(err => {
            console.log(err)
            dispatch(getHomeNoticeFail(err.message));
        });
    }

}

let updateData = (response, dispatch) => {
    index++;
    let length = response.length;
    let noticeModel = response[index % length];
    if (noticeModel) {
        dispatch(getHomeNoticeSuccess(noticeModel.noticeContent));
    }
}


let getHomeNoticeSuccess = (noticeContent) => {
    return {
        type: ActionTypes.GET_HOME_NOTICE_SUCCESS,
        noticeContent
    }
}

let getHomeNoticeFail = (errInfo) => {
    return {
        type: ActionTypes.GET_HOME_NOTICE_FAILURE,
        errInfo
    }
}