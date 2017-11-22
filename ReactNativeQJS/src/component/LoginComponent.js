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
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    //验证手机号只能输入数字
    validPhoneInput = (text) => {
        let {getValidPhone}=this.props;
        getValidPhone(text)
    }

    //验证手机号只能输入数字
    validPassWordInput = (text) => {
        let {getValidPwd}=this.props;
        getValidPwd(text)
    }

    loginPress=()=>{
        let {login}=this.props;
        console.log(this.props.validPhone,this.props.validPwd)
        login(this.props.validPhone,this.props.validPwd);
    }

    isShowLoginPassWord=()=>{
        let {isShowLoginPassWord}=this.props;
        isShowLoginPassWord(!this.props.isShowPwd)
    }


    render() {
        return <View style={styles.container}>
            <Image style={styles.logoStyle} source={ConstantData.ICON_LOGIN_LOGO} resizeMode={'cover'}/>
            <CustomTextInput
                keyboardType="phone-pad"
                onChangeText={(text) => this.validPhoneInput(text)}
                textInputStyle={styles.textInputStyle}
                iconLeftStyle={styles.iconLeftStyle}
                leftIconName={ConstantData.ICON_PHONE_LOGIN}
                borderBottomColor={Colors.bottomColor}
                placeholderTextColor={Colors.textColorHint}
                maxLength={11}
                value={this.props.validPhone}
                placeholderText="请输入手机号码"/>
            <CustomTextInput
                onChangeText={(text) => this.validPassWordInput(text)}
                secureTextEntry={this.props.isShowPwd}
                containerStyle={styles.containerStyle}
                textInputStyle={styles.textInputStyle}
                leftIconName={ConstantData.ICON_PASS_LOGIN}
                rightIconName={this.props.isShowPwd?ConstantData.ICON_OPEN_PASS_LOGIN:ConstantData.ICON_CLOSE_PASS_LOGIN}
                iconRightStyle={styles.iconRightStyle}
                iconLeftStyle={styles.iconLeftStyle}
                borderBottomColor={Colors.bottomColor}
                iconRightOnPress={this.isShowLoginPassWord}
                placeholderTextColor={Colors.textColorHint}
                maxLength={18}
                value={this.props.validPwd}
                placeholderText="请输入密码6-18位"/>
            <Text style={styles.forgetPwdStyle}>忘记密码?</Text>
            <Button
                onPress={()=>this.loginPress()}
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
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        alignItems: 'center'
    },
    logoStyle: {
        marginTop: 50,
        marginBottom: 30,
        width: 200,
        height: 50
    },
    containerStyle: {
        marginTop: 10
    },
    textInputStyle: {
        marginTop: 5
    },
    iconLeftStyle: {
        marginRight: 5
    },
    iconRightStyle: {
        marginRight: 10
    },
    forgetPwdStyle: {
        fontSize: FONT_SIZE(12),
        color: Colors.headTitleColor,
        marginRight: 10,
        marginTop: 10,
        alignSelf: 'flex-end',
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