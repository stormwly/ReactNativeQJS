'use strict';

import React,{NetInfo} from 'react-native';

const NOT_NETWORK = "当前网络不可用,请检查网络连接";
const TAG_NETWORK_CHANGE = "connectionChange";

/***
 * 检查网络链接状态
 * @param callback
 */
const listenerNetworkState = (callback) =>{
    NetInfo.isConnected.fetch().done(
        (isConnected) => {
            callback(isConnected);
        }
    );
};
/***
 * 移除网络状态变化监听
 * @param tag
 * @param handler
 */
const removeEventListener = (tag,handler) => {
    NetInfo.isConnected.removeEventListener(tag, handler);
};

/***
 * 添加网络状态变化监听
 * @param tag
 * @param handler
 */
const addEventListener = (tag,handler)=>{
    NetInfo.isConnected.addEventListener(tag, handler);
};

export default{
    listenerNetworkState,
    addEventListener,
    removeEventListener,
    NOT_NETWORK,
    TAG_NETWORK_CHANGE
};
