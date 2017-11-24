import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
} from 'react-native';

import HomeBannerComponent from '../component/HomeBannerComponent'
import NoticeComponent from '../component/NoticeComponent'
import CompanyDescComponent from '../component/CompanyDescComponent'
import {toastShort} from "../common/ToastUtils"
import HomeListComponent from '../component/HomeListComponent'
import {connect} from 'react-redux'
import * as HomeListAction from '../actions/HomeListAction'

class HomePage extends Component {

    componentWillMount() {
        this.checkNetWork();
    }

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

    componentWillMount() {
        let {getHomeList} = this.props;
        getHomeList();
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

