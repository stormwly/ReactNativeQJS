import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Image,
    BackHandler,
    Text
} from 'react-native'
import CustomTextInput from './CustomTextInput'
import Button from 'react-native-button'

export default class LoginComponent extends Component {

    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    _onBackAndroid = () => {
        const {routes} = this.props;
        if (routes.length > 1) {
            this.props.navigation.goBack();
            return true;
        }
    }


    componentDidMount() {
        console.log('componentDidMount', this.props)
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
        let {login} = this.props;
        login(123, 12);
    }


    render() {
        return <View style={styles.container}>
            <Image style={styles.logoStyle} source={ConstantData.ICON_LOGIN_LOGO} resizeMode={'cover'}/>
            <CustomTextInput
                textInputStyle={styles.textInputStyle}
                iconLeftStyle={styles.iconLeftStyle}
                leftIconName={ConstantData.ICON_PHONE_LOGIN}
                borderBottomColor={Colors.bottomColor}
                placeholderTextColor={Colors.textColorHint}
                placeholderText="请输入手机号码"/>
            <CustomTextInput
                containerStyle={styles.containerStyle}
                textInputStyle={styles.textInputStyle}
                leftIconName={ConstantData.ICON_PASS_LOGIN}
                rightIconName={ConstantData.ICON_CLOSE_PASS_LOGIN}
                iconRightStyle={styles.iconRightStyle}
                iconLeftStyle={styles.iconLeftStyle}
                borderBottomColor={Colors.bottomColor}
                placeholderTextColor={Colors.textColorHint}
                placeholderText="请输入密码"/>
            <Text style={styles.forgetPwdStyle}>忘记密码?</Text>
            <Button
                activeOpacity={0.8}
                containerStyle={styles.buttonContainerStyle}
                style={styles.buttonTextStyle}>
                登录
            </Button>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        alignItems:'center'
    },
    logoStyle: {
        marginTop:50,
        marginBottom:30,
        width:200,
        height:50
    },
    containerStyle: {
        marginTop:10
    },
    textInputStyle: {
        marginTop:5
    },
    iconLeftStyle:{
        marginRight:5
    },
    iconRightStyle:{
        marginRight:10
    },
    forgetPwdStyle:{
        fontSize:FONT_SIZE(12),
        color:Colors.headTitleColor,
        marginRight:10,
        marginTop:10,
        alignSelf:'flex-end',
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