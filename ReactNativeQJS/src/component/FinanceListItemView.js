'use strict'
import React from 'react'
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'
import Button from 'react-native-button'
import DashLine from './DashLine'
import HeartCircle from './HeartCircle'

export default class FinanceListItemView {

    static getFinanceListItemView(item, onPressItem) {
        return <View style={styles.container} key={item.id}>
            <View style={styles.topViewStyle}>
                <View style={{flexDirection: 'row'}}>
                    <View
                        style={[{width: 2, height: 10, marginRight: 3, marginTop: 1},item.productType===1?{backgroundColor:Colors.gray}:{backgroundColor:Colors.red}]}/>
                    <Text style={styles.topTextViewStyle}>{item.productName}</Text>
                </View>
                {FinanceListItemView.getProductTypeButton(item, onPressItem)}
            </View>
            <DashLine style={[styles.dashLineStyle]} margin={"10"}/>
            <View style={styles.bottomViewStyle}>
                <View style={styles.bottomLeftViewStyle}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.rateStyle,item.productType===1?{color:Colors.headTitleColor}:{color:Colors.red}]}>{item.rate}</Text>
                        <Text style={[styles.rateStyle,item.productType===1?{color:Colors.headTitleColor}:{color:Colors.red},{fontSize: 10, paddingTop: 4}]}>%</Text>
                        {FinanceListItemView.getActiveRateView(item)}
                    </View>
                    <Text style={[styles.rateDescStyle, {marginTop: 2}]}>期望年化收益率</Text>
                </View>
                <View style={{width: 1, backgroundColor: Colors.financeItemLineColor, marginBottom: 20}}/>
                <View style={styles.bottomRightViewStyle}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <HeartCircle style={[{marginRight:1,marginTop:2}]} radius={2} fill={item.productType===1?Colors.itemDescColor:Colors.yellow}/>
                            <Text
                                style={{fontSize: 10, color: Colors.itemDescColor, paddingRight: 100}}>项目期限</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.financeDayMoneyStyle, item.productType===1?{color:Colors.headTitleColor}:{color:Colors.red},{fontSize: 10}]}>{item.financeDays}</Text>
                            <Text style={{fontSize: 10, color: Colors.headTitleColor}}>天</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                        <View style={{flexDirection: 'row'}}>
                            <HeartCircle style={[{marginRight:1,marginTop:2}]} radius={2} fill={item.productType===1?Colors.itemDescColor:Colors.yellow}/>
                            <Text style={{fontSize: 10, color: Colors.itemDescColor}}>可投金额</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[styles.financeDayMoneyStyle, item.productType===1?{color:Colors.headTitleColor}:{color:Colors.red},{fontSize: 10}]}>{item.investMoney}</Text>
                            <Text style={{fontSize: 10, color: Colors.headTitleColor}}>元</Text>
                        </View>
                    </View>
                </View>
            </View>

        </View>

    }

    static getActiveRateView(item) {
        // let activeView;
        // if (item.activeRate) {
        //     activeView = <Text style={styles.activeRateStyle}>+{item.activeRate}</Text>
        // }
        //
        // return activeView;
        let activeView = <Text style={[styles.activeRateStyle,item.productType===1?{color:Colors.headTitleColor}:{color:Colors.red}]}>+2%</Text>
        return activeView;
    }

    static getProductTypeButton(item, onPressItem) {
        let buttonContent;
        switch (item.productType) {
            case 0:
                buttonContent = <Button
                    activeOpacity={0.8}
                    containerStyle={styles.buttonContainerStyle}
                    onPress={onPressItem}
                    style={styles.buttonTextStyle}>
                    立即购买
                </Button>
                break;
            case 1:
                buttonContent = <Button
                    disabled={true}
                    styleDisabled={[styles.buttonContainerStyle, {backgroundColor: Colors.bgColor}]}
                    style={[styles.buttonTextStyle,{color:Colors.gray}]}>
                    已售罄
                </Button>
                break;
            case 2:
                buttonContent = <Button
                    disabled={true}
                    styleDisabled={[styles.buttonContainerStyle]}
                    style={styles.buttonTextStyle}>
                    预约中
                </Button>
                break;
            default:
                null
                break;

        }

        return buttonContent;
    }
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        backgroundColor: Colors.white,
        paddingRight: 10,
        paddingLeft: 10
    },
    topViewStyle: {
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    topTextViewStyle: {
        fontSize: 12,
        color: Colors.headTitleColor
    },
    productNameStyle: {
        fontSize: 16,
        color: Colors.headTitleColor,
        marginTop: 10,
        marginBottom: 10
    },
    rateStyle: {
        fontSize: 16,
        color: Colors.red,
    },
    activeRateStyle: {
        fontSize: 10,
        color: Colors.red,
        paddingTop: 4,
    },
    rateDescStyle: {
        fontSize: 10,
        color: Colors.itemDescColor,
        marginBottom: 20
    },

    financeContainerStyle: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    financeDayMoneyStyle: {
        fontSize: 10,
        color: Colors.red
    },
    financeDescStyle: {
        fontSize: 10,
        color: Colors.itemDescColor,
    },
    textStyle: {
        fontSize: 12,
        color: Colors.itemDescColor,
    },
    buttonDisableStyle: {
        backgroundColor: Colors.gray,
    },
    buttonTextStyle: {
        color: Colors.white,
        fontSize: 12,
    },
    buttonContainerStyle: {
        paddingBottom: 2,
        paddingTop: 2,
        paddingLeft: 5,
        paddingRight: 5,
        overflow: 'hidden',
        borderRadius: 2,
        backgroundColor: Colors.red
    },
    dashLineStyle: {
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
        width: 50
    },
    bottomViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    bottomLeftViewStyle: {
        flexDirection: 'column',
    },
    bottomRightViewStyle: {
        flexDirection: 'column',
        paddingTop: 4,
    },

})