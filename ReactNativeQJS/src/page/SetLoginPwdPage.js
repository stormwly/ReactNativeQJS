import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Image,
    BackHandler,
    Text,
    TextInput,
    Keyboard,
} from 'react-native'
import {connect} from 'react-redux'
import * as SetLoginPwdAction from '../actions/SetLoginPwdAction'
import * as TextUtils from '../common/TextUtils'
import {toastShort} from "../common/ToastUtils"
import CustomTextInput from '../component/CustomTextInput'
import Button from 'react-native-button'
import LoadingView from '../component/LoadingView'

class SetLoginPwdPage extends Component {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        this.interval && clearInterval(this.interval);
        this.props.navigation.dispatch(SetLoginPwdAction.setMessageCodeTxt('获取验证码'));
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

    summit = () => {
        Keyboard.dismiss();
        let messageCode = this.refs['messageCodeRef']._lastNativeText;
        let {summit} = this.props;
        summit(this.props.validPhone, this.props.validPwd, messageCode);
    }

    isShowLoginPassWord = () => {
        let {isShowLoginPassWord} = this.props;
        isShowLoginPassWord(!this.props.isShowPwd)
    }

    componentDidUpdate() {
        if (this.props.success) {
            this.props.navigation.goBack();
        }
    }

    timeCountDown = () => {
        let time = 60;
        this.interval = setInterval(() => {
            if (time < 1) {
                this.props.navigation.dispatch(SetLoginPwdAction.setMessageCodeTxt('重新获取'));
                this.interval && clearInterval(this.interval)
            } else {
                this.props.navigation.dispatch(SetLoginPwdAction.setMessageCodeTxt(time + 's'));
                time--;
            }
        }, 1000);
    }

    render() {
        return <View style={styles.container}>
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
            <View style={styles.messageCodeContainerStyle}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <Image style={styles.messageCodeIconStyle}
                           resizeMode={'center'}
                           source={ConstantData.ICON_FORGET_MESSAGE_CODE}/>
                    <TextInput style={styles.messageCodeInputStyle}
                               placeholderTextColor={Colors.textColorHint}
                               ref='messageCodeRef'
                               maxLength={4}
                               keyboardType="numeric"
                               placeholder='请输入短信验证码'
                               underlineColorAndroid={'transparent'}
                               clearButtonMode={'while-editing'}/>
                </View>
                <Text style={styles.countDownTextStyle}
                      onPress={() => this.timeCountDown()}>{this.props.messageCodeTxt}</Text>
            </View>
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
            <Button
                onPress={() => this.summit()}
                activeOpacity={0.8}
                containerStyle={styles.buttonSummitContainerStyle}
                style={styles.buttonSummitTextStyle}>
                确定
            </Button>
            <LoadingView isOpen={this.props.isLoading}/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white,
        alignItems: 'center',
        marginTop: 3
    },
    logoStyle: {
        marginTop: 50,
        marginBottom: 30,
        width: 200,
        height: 50
    },
    containerStyle: {
        marginTop: 5
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
    buttonSummitTextStyle: {
        color: Colors.white,
        fontSize: FONT_SIZE(12),
    },
    buttonSummitContainerStyle: {
        width: SCREEN_WIDTH - 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 4,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: Colors.red
    },
    messageCodeContainerStyle: {
        flexDirection: 'row',
        borderBottomColor: Colors.bottomColor,
        borderBottomWidth: 0.5,
        alignItems: 'center',
        width: SCREEN_WIDTH - 30,
        justifyContent: 'space-between',
    },
    messageCodeInputStyle: {
        color: Colors.textColor,
        fontSize: FONT_SIZE(14),
        marginLeft: 5,
        flex: 1
    },
    messageCodeIconStyle: {
        alignSelf: 'center',
        height: 32,
        width: 25,
    },
    countDownTextStyle: {
        fontSize: FONT_SIZE(12),
        color: Colors.red
    }
})

const mapStateToProps = (state) => {
    let {validPhone, validPwd, isShowPwd, messageCodeTxt, errInfo, isLoading,success} = state.setLoginPwd;
    return {
        messageCodeTxt,
        errInfo: errInfo,
        isLoading: isLoading,
        validPhone,
        validPwd,
        isShowPwd,
        success
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        summit: (phone, password, messageCode) => {
            if (!TextUtils.isPhoneNumber(phone)) {
                toastShort('请输入正确的手机号码!')
            } else if (messageCode===undefined||messageCode.length!=4) {
                toastShort('请输入正确的验证码!')
            } else if (!TextUtils.isLoginPwd(password)) {
                toastShort('请输入6-18位的密码!')
            } else {
                dispatch(SetLoginPwdAction.summit(phone, password, messageCode));
            }
        },
        getValidPhone: (inputPhone) => {
            let validPhone = inputPhone.replace(/\D/g, '');
            dispatch(SetLoginPwdAction.getValidPhone(validPhone))
        },
        getValidPwd: (inputPwd) => {
            let validPwd = inputPwd.replace(/[^\a-\z\A-\Z0-9\_]/g, '');//只能输入数字和字母以及下划线
            dispatch(SetLoginPwdAction.getValidPwd(validPwd))
        },
        isShowLoginPassWord: (isShowPwd) => {
            dispatch(SetLoginPwdAction.isShowForgetPassWord(isShowPwd))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SetLoginPwdPage)

