import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Platform,
    Alert,
    Linking
} from 'react-native';

import HomeBannerComponent from '../component/HomeBannerComponent'
import NoticeComponent from '../component/NoticeComponent'
import CompanyDescComponent from '../component/CompanyDescComponent'
import {toastShort} from "../common/ToastUtils"
import HomeListComponent from '../component/HomeListComponent'
import {connect} from 'react-redux'
import * as HomeListAction from '../actions/HomeListAction'

import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import _updateConfig from '../../update.json';
const {appKey} = _updateConfig[Platform.OS];


class HomePage extends Component {

    componentWillMount() {
        let {getHomeList} = this.props;
        getHomeList();

        //这是热更新相关
        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
                {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
                {text: '否', onPress: ()=>{markSuccess()}},
            ]);
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }
    }

    componentDidMount() {
        this.checkUpdate();
        console.log('currentVersionDesc',packageVersion);
        console.log('currentHashDesc',currentVersion);
    }

    componentWillMount() {
        this.checkNetWork();
    }

    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                {text: '是', onPress: ()=>switchVersion(hash)},
                {text: '否',},
                {text: '下次启动时', onPress: ()=>switchVersionLater(hash)},
            ]);
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };

    checkUpdate= () => {
        checkUpdate(appKey).then(info => {
            console.log('update--info',info)
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
                ]);
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.');
            } else {
                Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
                    {text: '是', onPress: ()=>{this.doUpdate(info)}},
                    {text: '否',},
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };

    checkNetWork() {
        IOS ?
            NetUtils.listenerNetworkState(() => {
                NetUtils.addEventListener(NetUtils.TAG_NETWORK_CHANGE, this.handleMethod);
            })
            :
            NetUtils.listenerNetworkState((isConnected) => {
                if (!isConnected) {
                    toastShort(NetUtils.NOT_NETWORK);
                }
            });
    }

    componentWillUnmount() {
        NetUtils.removeEventListener(NetUtils.TAG_NETWORK_CHANGE, this.handleMethod);
    }

    // 检测网络状态
    handleMethod = (isConnected) => {
        if (!isConnected) {
            toastShort(NetUtils.NOT_NETWORK);
        }
    };

    render() {
        return <ScrollView contentContainerStyle={styles.container}
                           horizontal={false}
                           showsVerticalScrollIndicator={false}
                           refreshControl={
                               <RefreshControl
                                   refreshing={this.props.isRefreshing}
                                   onRefresh={() => this._onRefresh()}
                                   tintColor={Colors.red}
                                   title="刷新中..."
                                   titleColor={Colors.red}
                                   colors={['#ff0000', '#00ff00', '#0000ff']}
                                   progressBackgroundColor={Colors.white}/>
                           }>
            <View style={styles.topContainer}>
                <HomeBannerComponent navigation={this.props.navigation}/>
                <NoticeComponent navigation={this.props.navigation}/>
                <CompanyDescComponent/>
            </View>
            <View style={[styles.itemSeparatorStyle]}/>
            <HomeListComponent style={styles.customHomeList} {...this.props}/>
        </ScrollView>
    }



    _onRefresh = () => {
        let {getNetHomeList,financeList} = this.props;
        getNetHomeList(financeList);
    };


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flexDirection: 'column',
        height: SCREEN_HEIGHT / 2,
        backgroundColor:Colors.white
    },
    customHomeList: {
        height: SCREEN_HEIGHT / 2,
        width: SCREEN_WIDTH
    },
    itemSeparatorStyle: {
        backgroundColor:'transparent',
        height: 5,
    },
});

const mapStateToProps = (state,ownProps) => {
    let {navigation}=ownProps;
    let {isLoading, financeList, errInfo,isRefreshing} = state.homeList;
    return {
        isLoading: isLoading,
        financeList: financeList,
        errInfo: errInfo,
        isRefreshing:isRefreshing,
        navigation:navigation
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getHomeList: () => {
            dispatch(HomeListAction.getHomeList());
        },
        getNetHomeList: (financeList) => {
            dispatch(HomeListAction.getNetHomeList(financeList));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

