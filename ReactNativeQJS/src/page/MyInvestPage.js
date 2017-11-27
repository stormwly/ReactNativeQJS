import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl,
    BackHandler,
    Share,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux'
import * as MyInvestInfoAction from '../actions/MyInvestAction'
import {toastShort} from "../common/ToastUtils"
import Button from 'react-native-button'
class MyInvestPage extends Component {
    render() {
        let {investInfo} = this.props;
        let rewardMoney = investInfo ? investInfo.rewardMoney : 0;//待提取奖励金额
        let totalInvestNums = investInfo ? investInfo.totalInvestNums : 0;//累计邀请人数
        let totalRewardMoney = investInfo ? investInfo.totalRewardMoney : 0;//累计获得奖励金额
        return <ScrollView style={styles.container}
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
            {this.renderTopView(rewardMoney, totalInvestNums, totalRewardMoney)}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <Image source={ConstantData.ICON_WALLET}
                           style={{height:25, width:45}}
                           resizeMode={'center'}/>
                    <Text style={{fontSize: 16, color: Colors.red, marginLeft: 5}}>转至账户余额</Text>
                </View>
            </View>
            <View style={{backgroundColor: Colors.splitLineColor, height: 5}}/>

            <Button
                onPress={() => this._investNow()}
                activeOpacity={0.8}
                containerStyle={styles.buttonInvestContainerStyle}
                style={styles.buttonInvestTextStyle}>
                立即邀请
            </Button>
        </ScrollView>
    }

    renderTopView(rewardMoney, totalInvestNums, totalRewardMoney) {
        return <View style={styles.topViewStyle}>
            <Image source={ConstantData.MINE_ACCOUNT_BACKGROUND} style={styles.topBgStyle}/>
            <View>
                <View style={styles.rewardMoneyStyle}>
                    <Text style={styles.rewardMoneyTextStyle}>{rewardMoney}</Text>
                    <Text style={styles.rewardDescTxtStyle}>待提取奖励金额(元)</Text>
                </View>
            </View>
            <View style={styles.topBottomStyle}>
                <View style={styles.totalInvestStyle}>
                    <Text style={styles.totalInvestNumsStyle}>{totalInvestNums}</Text>
                    <Text style={styles.totalInvestTxtStyle}>累计邀请人数(人)></Text>
                </View>
                <View style={{backgroundColor: Colors.splitLineColor, height: 20, width: 1}}/>
                <View style={styles.totalRewardStyle}>
                    <Text style={styles.totalInvestNumsStyle}>{totalRewardMoney}</Text>
                    <Text style={styles.totalInvestTxtStyle}>累计获得奖励金额(元)></Text>
                </View>
            </View>
        </View>
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
    }

    _onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount() {
        this.fetchNetData();
    }

    fetchNetData() {
        let {getMyInvestInfo} = this.props;
        getMyInvestInfo(this.props.investInfo);
    }

    _onRefresh = () => {
        this.fetchNetData();
    };

    _investNow=()=>{
        Share.share({
            message: 'A framework for building native apps using React',
            url: 'http://facebook.github.io/react-native/',
            title: '邀请好友'
        }, {
            dialogTitle: '邀请好友',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ],
            tintColor: 'green'
        })
            .then(this._showResult)
            .catch(error=>console.log(error));
    }

    _showResult(result) {
        console.log('_showResult------>',result)
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log(result)
            }
            toastShort('分享成功')
        } else if (result.action === Share.dismissedAction) {
            toastShort('分享取消了')
        }
    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    topViewStyle: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        height:SCREEN_HEIGHT/2-100,
    },
    topBgStyle: {
        width: SCREEN_WIDTH,
        height:SCREEN_HEIGHT/2-100,
        position: 'absolute'
    },
    rewardMoneyStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
    },
    rewardMoneyTextStyle: {
        fontSize: 30,
        color: Colors.white,
        backgroundColor: 'transparent'
    },
    rewardDescTxtStyle: {
        fontSize: 14,
        color: Colors.white,
        marginTop: 3,
        backgroundColor: 'transparent'
    },
    totalInvestNumsStyle: {
        fontSize: 14,
        color: Colors.white,
        backgroundColor: 'transparent'
    },
    totalInvestTxtStyle: {
        fontSize: 14,
        color: Colors.white,
        marginTop: 3,
        backgroundColor: 'transparent'
    },

    topBottomStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    totalInvestStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    totalRewardStyle: {
        flexDirection: 'column',
        marginLeft: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonInvestTextStyle: {
        color: Colors.white,
        fontSize: FONT_SIZE(14),
    },
    buttonInvestContainerStyle: {
        width: SCREEN_WIDTH - 20,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:10,
        marginRight:10,
        overflow: 'hidden',
        borderRadius: 4,
        marginBottom: 10,
        marginTop:30,
        backgroundColor: Colors.red
    },
});

const mapStateToProps = (state) => {
    let {investInfo, errInfo, isRefreshing} = state.myInvestInfo;
    return {
        investInfo: investInfo,
        errInfo: errInfo,
        isRefreshing: isRefreshing,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMyInvestInfo: (oldInvestInfo) => {
            dispatch(MyInvestInfoAction.getMyInvestInfo(oldInvestInfo));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MyInvestPage)

