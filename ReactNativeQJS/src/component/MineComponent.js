//我的页面view
import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import MineGridView from './MineGridView'
import Communications from 'react-native-communications'

export default class MineComponent extends Component {

    render() {
        let {accountInfo} = this.props;
        let userName = accountInfo ? accountInfo.userName : null;
        let yestodayProfit = accountInfo ? accountInfo.yestodayProfit : 0;
        let amountProfits = accountInfo ? accountInfo.amountProfits : 0;
        let availableMoney = accountInfo ? accountInfo.availableMoney : 0;
        let amountMoney = accountInfo ? accountInfo.amountMoney : 0;
        let rateNums = accountInfo ? accountInfo.rateNums : 0;
        let redNums = accountInfo ? accountInfo.redNums : 0;
        let investNums = accountInfo ? accountInfo.investNums : 0;
        let headerPic = accountInfo ? accountInfo.headerPic : null;
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
            {this.renderTopView(userName, yestodayProfit, amountProfits, availableMoney, amountMoney, headerPic)}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <Image source={ConstantData.MINE_RECHARGE_ICON}
                           style={{height: 32, width: 32}}/>
                    <Text style={{fontSize: 16, color: Colors.red, marginLeft: 5}}>充值</Text>
                </View>
                <View style={{height: 20, width: 1, backgroundColor: Colors.splitLineColor}}/>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    marginLeft: 1
                }}>
                    <Image source={ConstantData.MINE_WITHDRAW_ICON}
                           resizeMode={'center'}
                           style={{height: 32, width: 32}}/>
                    <Text style={{fontSize: 16, color: Colors.headTitleColor, marginLeft: 5}}>提现</Text>
                </View>
            </View>
            <View style={{backgroundColor: Colors.splitLineColor, height: 5}}/>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 10,
                paddingTop: 10
            }}>
                <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                    <Image source={ConstantData.MINE_RATE_COUPON_ICON}
                           style={{height: 32, width: 32}}/>
                    <Text style={{fontSize: 16, color: Colors.red, marginLeft: 5}}>加息券{rateNums}张</Text>
                </View>
                <View style={{height: 20, width: 1, backgroundColor: Colors.splitLineColor}}/>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    marginLeft: 1
                }}>
                    <Image source={ConstantData.MINE_CASH_COUPON_ICON}
                           style={{height: 32, width: 32}} resizeMode={'center'}/>
                    <Text style={{fontSize: 16, color: Colors.headTitleColor, marginLeft: 5}}>红包{redNums}张</Text>
                </View>

            </View>
            <View style={{backgroundColor: Colors.splitLineColor, height: 5}}/>

            <MineGridView items={this.props.gridItems} onGridSelected={this.onGridSelected} investNums={investNums}/>
            <View style={{backgroundColor: Colors.splitLineColor, height: 5}}/>
            <TouchableOpacity onPress={() => Communications.phonecall(ConstantData.SERVICE_PHONE, true)}
                              activeOpacity={0.8}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 5}}>
                    <Text style={{fontSize: 16, color: Colors.headTitleColor}}>客服电话:{ConstantData.SERVICE_PHONE}</Text>
                    <Text style={{
                        fontSize: 12,
                        color: Colors.itemDescColor,
                        marginTop: 3
                    }}>{ConstantData.SERVICE_TIME}</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    }

    renderTopView(userName, yestodayProfit, amountProfits, availableMoney, amountMoney, headerPic) {
        if (this.props.isLogin) {
            return <View style={styles.topViewStyle}>
                <Image source={ConstantData.MINE_ACCOUNT_BACKGROUND} style={styles.topBgStyle}/>
                <View>
                    <View
                        style={styles.topLine1Style}>
                        <TouchableOpacity onPress={() => this._cameraAction()} activeOpacity={0.8}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image
                                    // source={headerPic ? {uri: headerPic} :ConstantData.MINE_HEAD_DEFAULT}
                                    source={this.props.avatarSource ? this.props.avatarSource : ConstantData.MINE_HEAD_DEFAULT}
                                    resizeMode={'cover'}
                                    style={styles.headImgStyle}/>
                                <Text style={styles.nameTxtStyle}>{userName}</Text>
                            </View>
                        </TouchableOpacity>
                        <Image source={ConstantData.ICON_SETTING}
                               style={{width: 24, height: 24}}/>
                    </View>
                    <View style={styles.topLine2Style}>
                        <Text style={styles.amountTxtStyle}>{amountMoney}</Text>
                        <Text style={styles.amountDescTxtStyle}>资产总额(元)</Text>
                    </View>
                    <View style={styles.topLine3Style}>
                        <Text style={styles.valTxtStyle}>{availableMoney}</Text>
                        <Text style={styles.valDescTxtStyle}>可用余额(元)</Text>
                    </View>
                </View>
                <View style={styles.topLine4Style}>
                    <View style={{flexDirection: 'column', alignItems: 'center', flex: 1}}>
                        <Text style={styles.valTxtStyle}>{yestodayProfit}</Text>
                        <Text style={styles.valDescTxtStyle}>昨日收益(元)</Text>
                    </View>
                    <View style={{backgroundColor: Colors.splitLineColor, height: 20, width: 1}}/>
                    <View style={{
                        flexDirection: 'column',
                        marginLeft: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                        <Text style={styles.valTxtStyle}>{amountProfits}</Text>
                        <Text style={styles.valDescTxtStyle}>累计收益(元)</Text>
                    </View>
                </View>
            </View>
        } else {
            return <View style={styles.topViewStyle}>
                <Image source={ConstantData.MINE_ACCOUNT_BACKGROUND} style={styles.topBgStyle}/>
                <View style={styles.loginContainerStyle}>
                    <Image
                        source={ConstantData.MINE_HEAD_DEFAULT}
                        resizeMode={'cover'}
                        style={styles.headNoLoginImgStyle}/>
                    <Text style={styles.loginTextStyle} onPress={()=>this.props.navigation.navigate('Login')}>点击登录/注册</Text>
                </View>
            </View>
        }
    }

    componentDidMount() {
        this.fetchNetData();
    }

    fetchNetData() {
        let {getNetAccountInfo} = this.props;
        getNetAccountInfo(this.props.accountInfo);
    }

    _onRefresh = () => {
        this.fetchNetData();
    };

    _cameraAction = () => {
        let {openCamera} = this.props;
        if (openCamera) {
            this.props.openCamera();
        }
    }


    onGridSelected(item) {
        // alert(item.title)
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
        height: SCREEN_HEIGHT / 2 - 100,
    },
    topBgStyle: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 2 - 100,
        position: 'absolute'
    },
    topLine1Style: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20
    },
    headImgStyle: {
        height: 32,
        width: 32,
        marginRight: 5,
        borderRadius: 16
    },
    headNoLoginImgStyle: {
        height: 72,
        width: 72,
        borderRadius: 36
    },
    nameTxtStyle: {
        fontSize: 16,
        color: Colors.white,
        backgroundColor: 'transparent'
    },
    topLine2Style: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    amountTxtStyle: {
        fontSize: 30,
        color: Colors.white,
        backgroundColor: 'transparent'
    },
    amountDescTxtStyle: {
        fontSize: 14,
        color: Colors.white,
        marginTop: 3,
        backgroundColor: 'transparent'
    },

    topLine3Style: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

    valTxtStyle: {
        fontSize: 14,
        color: Colors.white,
        backgroundColor: 'transparent'
    },
    valDescTxtStyle: {
        fontSize: 14,
        color: Colors.white,
        marginTop: 3,
        backgroundColor: 'transparent'
    },

    topLine4Style: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    loginContainerStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: (SCREEN_HEIGHT / 2 - 100) / 3
    },

    loginTextStyle: {
        fontSize: FONT_SIZE(18),
        color: Colors.white,
        marginTop:10
    }
});