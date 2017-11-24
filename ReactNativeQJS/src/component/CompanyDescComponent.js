import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'
import Colors from "../contants/Colors";

export default class CompanyDescComponent extends Component {

    render() {
        return (<View style={styles.container}>
            <View style={styles.viewStyle}>
                <Image source={require('../../res/images/icon_discovery_introduce.png')} style={styles.icon}/>
                <Text style={styles.text}>平台介绍</Text>
            </View>
            <View style={styles.viewStyle}>
                <Image source={require('../../res/images/icon_discovery_data.png')} style={styles.icon}/>
                <Text style={styles.text}>平台数据</Text>
            </View>
            <View style={styles.viewStyle}>
                <Image source={require('../../res/images/icon_discovery_security.png')} style={styles.icon}/>
                <Text style={styles.text}>安全保障</Text>
            </View>
        </View>);
    }

    shouldComponentUpdate(nextProps, nextState) {
       return false;
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    viewStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 32,
        height: 32,
        marginBottom: 5
    },
    text: {
        fontSize: 14,
        color: Colors.itemDescColor
    }
})