import React, {Component} from 'react'
import * as DevicesEventType from '../contants/DevicesEventType'
import {
    View,
    StyleSheet,
    Image,
    BackHandler,
    Text,
    Keyboard,
    DeviceEventEmitter
} from 'react-native'
import {connect} from 'react-redux'
import Communications from 'react-native-communications'
import * as LoginAction from '../actions/LoginAction'
import * as TextUtils from '../common/TextUtils'
import {toastShort} from "../common/ToastUtils"
import CustomTextInput from '../component/CustomTextInput'
import Button from 'react-native-button'
import LoadingView from '../component/LoadingView'

class LoginPage extends Component {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        console.log('Keyboard Shown');
    }

    _keyboardDidHide() {
        console.log('Keyboard Hidden');
    }


    _onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerRightClick: this._headerRightClick,
        });
    }

    _headerRightClick = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate('LoginSetting', {title: '设置'});
    }

//验证手机号只能输入数字
    validPhoneInput = (text) => {
        let {getValidPhone} = this.props;
        getValidPhone(text)
    }

//验证手机号只能输入数字
    validPassWordInput = (text) => {
        let {getValidPwd} = this.props;
        getValidPwd(text)
    }

    loginPress = () => {
        Keyboard.dismiss();
        let {login} = this.props;
        login(this.props.validPhone, this.props.validPwd);
    }

    gotoRegister = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate('Register', {title: '注册'});
    }

    isShowLoginPassWord = () => {
        let {isShowLoginPassWord} = this.props;
        isShowLoginPassWord(!this.props.isShowPwd)
    }

    componentDidUpdate() {
        if (this.props.userData) {
            DeviceEventEmitter.emit(DevicesEventType.LOGIN_SUCCESS_EVENT_TYPE, this.props.userData);
            this.props.navigation.goBack();
        }
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
                keyboardType="numeric"
                onChangeText={(text) => this.validPassWordInput(text)}
                secureTextEntry={this.props.isShowPwd}
                containerStyle={styles.containerStyle}
                textInputStyle={styles.textInputStyle}
                leftIconName={ConstantData.ICON_PASS_LOGIN}
                rightIconName={this.props.isShowPwd ? ConstantData.ICON_OPEN_PASS_LOGIN : ConstantData.ICON_CLOSE_PASS_LOGIN}
                iconRightStyle={styles.iconRightStyle}
                iconLeftStyle={styles.iconLeftStyle}
                borderBottomColor={Colors.bottomColor}
                iconRightOnPress={this.isShowLoginPassWord}
                placeholderTextColor={Colors.textColorHint}
                maxLength={18}
                value={this.props.validPwd}
                placeholderText="请输入密码6-18位"/>
            <Text onPress={()=>this.props.navigation.navigate('SetLoginPwd',{title:'设置新密码'})} style={styles.forgetPwdStyle} >忘记密码?</Text>
            <Button
                onPress={() => this.loginPress()}
                activeOpacity={0.8}
                containerStyle={styles.buttonLoginContainerStyle}
                style={styles.buttonLoginTextStyle}>
                登录
            </Button>
            <Button
                onPress={() => this.gotoRegister()}
                activeOpacity={0.8}
                containerStyle={styles.buttonRegisterContainerStyle}
                style={styles.buttonRegisterTextStyle}>
                新用户注册,立领超值大礼包
            </Button>
            <View style={styles.bottomStyle}>
                <Image source={ConstantData.ICON_LOGIN_PHONE} style={styles.bottomPhoneIconStyle} resizeMode={'center'}/>
                <Text style={styles.bottomPhoneTextStyle} onPress={()=>Communications.phonecall(ConstantData.SERVICE_PHONE, true)}>{ConstantData.SERVICE_PHONE}</Text>
            </View>
            <LoadingView isOpen={this.props.isLoading}/>
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
    buttonLoginTextStyle: {
        color: Colors.white,
        fontSize: FONT_SIZE(12),
    },
    buttonLoginContainerStyle: {
        width: SCREEN_WIDTH - 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 4,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: Colors.red
    },

    buttonRegisterTextStyle: {
        color: Colors.red,
        fontSize:FONT_SIZE(12),
    },
    buttonRegisterContainerStyle: {
        width: SCREEN_WIDTH - 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 4,
        marginTop: 20,
        borderColor: Colors.red,
        borderWidth: 1,
        backgroundColor: Colors.white
    },
    bottomStyle: {
        marginTop:40,
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomPhoneIconStyle: {
        width: 12,
        height: 12
    },
    bottomPhoneTextStyle: {
        fontSize:FONT_SIZE(10),
        color:Colors.red,
        marginLeft:3
    }
})

const mapStateToProps = (state) => {
    let {validPhone, validPwd, isShowPwd, userData, errInfo, isLoading} = state.login;
    return {
        userData: userData,
        errInfo: errInfo,
        isLoading: isLoading,
        validPhone,
        validPwd,
        isShowPwd,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (phone, password) => {
            if (!TextUtils.isPhoneNumber(phone)) {
                toastShort('请输入正确的手机号码!')
            } else if (!TextUtils.isLoginPwd(password)) {
                toastShort('请输入6-18位的密码!')
            } else {
                dispatch(LoginAction.login(phone, password));
            }
        },
        getValidPhone: (inputPhone) => {
            let validPhone = inputPhone.replace(/\D/g, '');
            dispatch(LoginAction.getValidPhone(validPhone))
        },
        getValidPwd: (inputPwd) => {
            let validPwd = inputPwd.replace(/[^\a-\z\A-\Z0-9\_]/g, '');//只能输入数字和字母以及下划线
            dispatch(LoginAction.getValidPwd(validPwd))
        },
        isShowLoginPassWord: (isShowPwd) => {
            dispatch(LoginAction.isShowLoginPassWord(isShowPwd))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

