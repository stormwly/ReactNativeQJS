'use strict'
//第三方本地存储框架(npm install react-native-storage --save)
var repositoryUtils;
export default class RepositoryUtils {

    constructor(isInit) {
        //这里根据isInit的值可以在app启动的时候做一些初始化操作
    }

    static init(isInit) {
        if (!repositoryUtils) {
            repositoryUtils = new RepositoryUtils(isInit)
        }

        return repositoryUtils;
    }

    //获取根据key缓存的数据
    getDataByKey(key) {
        return new Promise((resolve,reject)=>{
            RNAsyncStorage.load({
                syncParams:{resolve,reject},
                key: key,
                autoSync: true,//设置为true表示在数据过期或未找到数据时调用与key同名的sync方法,这里在RNSync中实现
                syncInBackground: true,//syncInBackground(默认为true)意味着如果数据过期，在调用sync方法的同时先返回已经过期的数据。设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            }).then(ret=>{
                resolve&&resolve(ret);
            }).catch(err=>{
                reject&&reject(err);
            });
        })
    }

    removeDataByKey(key){
        // 删除单个数据
        RNAsyncStorage.remove({
            key: key
        });
    }


    saveDataByKey(key, data) {
        RNAsyncStorage.save({
            key: key,  // 注意:请不要在key中使用_下划线符号!
            data:data,
            expires:1000*60*60//过期时间为60秒，60秒之后数据过期，将会自动调用RNSync文件中的方法
        });
    }
}