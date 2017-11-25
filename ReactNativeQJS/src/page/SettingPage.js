'use strict'
import React, {PureComponent} from 'react'
import {
    StyleSheet,
    Text,
    View,
    BackHandler,
    SectionList,
    Image,
    StatusBar
} from 'react-native'
import Button from 'react-native-button'
import AlertModal from '../component/AlertModal'
import RepositoryUtils from '../common/storage/RepositoryUtils'

var {NativeModules} = require('react-native');
var {getVersionName} = NativeModules.PackageInfo;
var appVersion;
var sections = [
    {sectionIndex: 0, key: "A", data: [{index: 0, title: "账户安全"}]},
    {
        sectionIndex: 1,
        key: "B",
        data: [{index: 1, title: "意见反馈"}, {index: 2, title: "平台介绍"}, {index: 3, title: "平台介绍"}, {
            index: 4,
            title: "帮助中心"
        }, {index: 5, title: "在线客户"}, {index: 6, title: "客户电话"}]
    },
];
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
        getVersionName((versionName) => {
            appVersion = versionName;
        })
    }

    render() {
        return (<View style={styles.container}>
            <SectionList
                renderSectionHeader={this._sectionHeader}
                renderItem={this._renderItem}
                sections={sections}
                keyExtractor={(item, index) => item.index}
                ItemSeparatorComponent={() => this.SeparatorLine()}
                ListFooterComponent={this.ListFootComponent()}
            />
            <AlertModal
                ref={AlertModal => this.AlertModal = AlertModal}
                message='确定是否退出登录?'
                rightButtonText='确定'
                leftButtonText='取消'
                onRightClick={()=>this._loginOut()}
                onLeftClick={()=>this.AlertModal.hide()}/>
            <StatusBar backgroundColor={Colors.transparent} />
        </View>)
    }

    _renderItem = (info) => {
        return <View style={styles.itemStyle} key={info.item.index}>
            <Text style={styles.itemTextStyle}>{info.item.title}</Text>
            <Image source={ConstantData.ICON_RIGHT_ARROW} style={{height:18,width:18}} resizeMode={'cover'}/>
        </View>
    }

    _sectionHeader = ({section}) => {
        return <View key={section.sectionIndex} style={styles.sectionHeaderStyle}/>
    }

    _showLoginOutAlert = () => {
        this.AlertModal.show();
    }

    _loginOut = () => {
        this.AlertModal.hide();
        RepositoryUtils.init().removeCacheDataByKey(StorageKeys.userToken);
        GLOBAL.UserToken=null;
        this.props.navigation.goBack();
        this.props.navigation.navigate('Home');
    }

    //列表的foot组件
    ListFootComponent() {
        return <View style={styles.footerStyle}>
            <Button
                onPress={() => this._showLoginOutAlert()}
                activeOpacity={0.8}
                containerStyle={styles.buttonContainerStyle}
                style={styles.buttonTextStyle}>
                安全退出
            </Button>
            <Text style={styles.logoutTextStyle}>当前版本:{appVersion}</Text>
        </View>
    }

    SeparatorLine() {
        return <View style={styles.separatorStyle}/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgColor
    },
    sectionHeaderStyle: {
        height: 10,
        backgroundColor: Colors.transparent
    },
    footerStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    itemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height: 60,
        backgroundColor:Colors.white,
        paddingLeft:10,
        paddingRight:10
    },
    itemTextStyle: {
        textAlignVertical: 'center',
        backgroundColor: "#ffffff",
        color: Colors.itemDescColor,
        fontSize: FONT_SIZE(12)
    },
    logoutTextStyle: {
        fontSize: FONT_SIZE(10),
        color: Colors.itemDescColor,
        marginTop: 3
    },
    buttonTextStyle: {
        color: Colors.white,
        fontSize: FONT_SIZE(14),
    },
    buttonContainerStyle: {
        width: SCREEN_WIDTH - 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 4,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: Colors.red
    },
    separatorStyle: {
        backgroundColor: Colors.splitLineColor,
        height: 1
    },
})