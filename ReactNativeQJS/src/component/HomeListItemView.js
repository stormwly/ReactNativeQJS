//首页中list列表的item
'use strict'
import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
import Button from 'react-native-button'
export default class HomeListItem {

    static getHomeListItem(item, onPressItem) {
        return <View style={styles.container} key={item.id}>
            <Text style={styles.productNameStyle}>{item.productName}</Text>
            <Text style={styles.rateStyle}>{item.rate}</Text>
            <Text style={styles.rateDescStyle}>期望年化收益率(%)</Text>
            <View style={styles.financeContainerStyle}>
                <View style={{flexDirection:'row'}}>
                    <Text style={styles.financeDayMoneyStyle}>{item.financeDays}</Text>
                    <Text style={[styles.textStyle]}>天项目期限</Text>
                </View>
                <View style={{backgroundColor: Colors.gray, width:1,marginRight:4,marginLeft:4,marginBottom:2,marginTop:2}}/>
                <View style={{flexDirection:'row',marginRight:10}}>
                    <Text style={[styles.textStyle,]}>预计每万元可赚取收益</Text>
                    <Text style={styles.financeDayMoneyStyle}>{item.amountMoney}</Text>
                    <Text style={[styles.textStyle]}>元</Text>
                </View>
            </View>
            {HomeListItem.getProductTypeButton(item,onPressItem)}
        </View>
    }

    static getProductTypeButton(item,onPressItem){
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
        width:SCREEN_WIDTH,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:30,
        backgroundColor:Colors.white
    },
    productNameStyle: {
        fontSize: 16,
        color: Colors.headTitleColor,
        marginTop:20,
        marginBottom:20
    },
    rateStyle: {
        fontSize: 28,
        color: Colors.red,
        marginBottom:10
    },
    rateDescStyle: {
        fontSize: 12,
        color: Colors.itemDescColor,
        marginBottom: 20
    },

    financeContainerStyle: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    financeDayMoneyStyle: {
        fontSize: 12,
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
        fontSize: 20,
    },
    buttonContainerStyle: {
        width: SCREEN_WIDTH - 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: Colors.red
    }
})
