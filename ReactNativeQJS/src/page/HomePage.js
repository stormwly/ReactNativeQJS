//投资页面的逻辑
import React, {Component} from 'react';
import {connect} from 'react-redux'
import HomeContentContainer from '../container/HomeContentContainer'
import {BackHandler} from 'react-native'
import {toastShort} from "../common/ToastUtils"

let lastClickTime = 0;

class HomePage extends Component {

    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    _onBackAndroid = () => {
        let {routes} = this.props;
        var now = new Date().getTime();
        if (routes && routes.length === 1) {
            if (now - lastClickTime < 2500) {
                return false;
            } else {
                toastShort('再点击一次退出应用');
            }
        } else {
            if (routes.length > 1) {
                this.props.navigation.goBack();
                return true;
            }
        }
        lastClickTime = now;
        return true;
    }

    render() {
        return (<HomeContentContainer {...this.props}/>);
    }
}

export default connect((state) => {
    const routes = state.nav.routes;
    return {
        routes
    };
})(HomePage)