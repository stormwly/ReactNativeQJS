'use strict'
import React, {PureComponent} from 'react'
import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    SectionList,
} from 'react-native'
import Button from 'react-native-button'
var {NativeModules}=require('react-native');
var {getVersionName}= NativeModules.PackageInfo;
var appVersion;
import SeparatorLine from '../component/SeparatorLine'

export default class SettingPage extends PureComponent {
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
    }

    _onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
        this.props.navigation.setParams({
            title: this.props.navigation.state.params.title,
        });
        getVersionName((versionName)=>{
            console.log(versionName)
            appVersion=versionName;
        })
    }

    render() {
        return (<View style={styles.container}>
            <SectionList
                ItemSeparatorComponent={() => SeparatorLine()}
                ListFooterComponent={this.ListFootComponent()}
            />
        </View>)
    }

    //列表的foot组件
    ListFootComponent() {
        return <View style={styles.footerStyle}>
            <Button
                onPress={() => this.loginPress()}
                activeOpacity={0.8}
                containerStyle={styles.buttonContainerStyle}
                style={styles.buttonTextStyle}>
                安全退出
            </Button>
            <Text style={styles.logoutTextStyle}>当前版本:{appVersion}</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray
    },
    footerStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    logoutTextStyle: {
        fontSize: FONT_SIZE(14),
        color: Colors.itemDescColor,
        marginTop:5
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
        marginTop: 10,
        backgroundColor: Colors.red
    }
})