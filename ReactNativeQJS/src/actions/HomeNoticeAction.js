'use strict'
import * as ActionTypes from '../contants/ActionTypes'
import RepositoryUtils from '../common/storage/RepositoryUtils'

let index = 0;
var interval;
let isTimeInterval=true;
export const getHomeNotice = () => {
    return dispatch => {
        RepositoryUtils.init().getDataByKey(StorageKeys.homeNoticeDesc).then(response => {
            interval = setInterval(() => {
                updateData(response, dispatch)
            }, 3000);
        }).catch(err => {
            console.log(err)
            dispatch(getHomeNoticeFail(err.message));
        });
    }
}

export const clearTime = () => {
    isTimeInterval=false;
}

let updateData = (response, dispatch) => {
    index++;
    let length = response.length;
    let noticeModel = response[index % length];
    if (noticeModel) {
        dispatch(getHomeNoticeSuccess(noticeModel.noticeContent));
    }
    if(!isTimeInterval){
        interval&&clearInterval(interval)
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