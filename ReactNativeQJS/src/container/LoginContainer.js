import LoginComponent from '../component/LoginComponent'
import {connect} from 'react-redux'
import * as LoginAction from '../actions/LoginAction'
import * as TextUtils from '../common/TextUtils'
import {toastShort} from "../common/ToastUtils"
const mapStateToProps = (state, ownProps) => {
    let routes = state.nav.routes;
    let from=state.nav.from;
    let {navigation} = ownProps;
    let {validPhone,validPwd,isShowPwd,userData, errInfo,isLoading} = state.login;
    return {
        userData: userData,
        errInfo: errInfo,
        isLoading: isLoading,
        validPhone,
        validPwd,
        isShowPwd,
        from,
        routes,
        navigation
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (phone,password) => {
            if(!TextUtils.isPhoneNumber(phone)){
                toastShort('请输入正确的手机号码!')
            }else if(!TextUtils.isLoginPwd(password)){
                toastShort('请输入6-18位的密码!')
            }else {
                dispatch(LoginAction.login(phone,password));
            }
        },
        getValidPhone:(inputPhone)=>{
            let validPhone = inputPhone.replace(/\D/g,'');
            dispatch(LoginAction.getValidPhone(validPhone))
        },
        getValidPwd:(inputPwd)=>{
            let validPwd=inputPwd.replace(/[^\a-\z\A-\Z0-9\_]/g,'');//只能输入数字和字母以及下划线
            dispatch(LoginAction.getValidPwd(validPwd))
        },
        isShowLoginPassWord:(isShowPwd)=>{
            dispatch(LoginAction.isShowLoginPassWord(isShowPwd))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

