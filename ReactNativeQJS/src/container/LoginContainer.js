import LoginComponent from '../component/LoginComponent'
import {connect} from 'react-redux'
import * as LoginAction from '../actions/LoginAction'

const mapStateToProps = (state, ownProps) => {
    let routes = state.nav.routes;
    let {navigation} = ownProps;
    let {userData, errInfo,isLoading} = state.login;
    return {
        userData: userData,
        errInfo: errInfo,
        isLoading: isLoading,
        routes,
        navigation
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (phoneNum,password) => {
            dispatch(LoginAction.login(phoneNum,password));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

