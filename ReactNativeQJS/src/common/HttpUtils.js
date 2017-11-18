//网络请求封装
'use strict'
import queryString from 'query-string';
import _ from 'lodash';
import Mock from 'mockjs';

const HttpUtils = {
    post: (url, body) => {
        return fetch_time_out(fetch_post_promise(url, body),HttpConfigs.timeout)
    },

    get: (url, params) => {
        return fetch_time_out(fetch_get_promise(url, params), HttpConfigs.timeout)
    },
}

function fetch_time_out(fetch_promise, timeout) {
    var abort_fn = null;
    var abort_promise = new Promise((resolve, reject) => {
        abort_fn = function () {
            reject(new Error('网络请求超时!'));
        };
    });
    var race_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);
    setTimeout(function () {
        abort_fn();
    }, timeout);

    return race_promise;
}

function fetch_get_promise(url, params) {
    if (params) {
        url = HttpConfigs.api.baseUrl + url + '?' + queryString.stringify(HttpConfigs.baseParams) + "&" + queryString.stringify(params)
    } else {
        url = HttpConfigs.api.baseUrl + url + '?' + queryString.stringify(HttpConfigs.baseParams)
    }
    // console.log(url);
    return new Promise(function (resolve, reject) {
        fetch(url).then((response) => {
            // console.log(response)
            return response.json();
        })
            .then((responseData) => {
                // console.log(responseData)
                resolve(Mock.mock(responseData))
            })//网络请求成功返回的数据
            .catch((err) => reject(err));
    });
}


function fetch_post_promise(url, body) {
    //合并json对象
    let params = _.extend(HttpConfigs.baseParams,//合并基础参数
        body
    );

    let map = _.extend(HttpConfigs.map, {
        body: JSON.stringify(params)
    });
    // console.log(map)
    url = HttpConfigs.api.baseUrl + url;
    // console.log(url)
    return new Promise(function (resolve, reject) {
        fetch(url, map).then((response) => response.json())
            .then((responseData) => resolve(Mock.mock(responseData)))
            .catch((err) => reject(err))
    });
}

export default HttpUtils;