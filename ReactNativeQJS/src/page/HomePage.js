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
        console.log('HomePage11111---',this.props)
        let {routes} = this.props;
        var now = new Date().getTime();
        if (routes && routes.length === 1) {
            if (now - lastClickTime < 2500) {
                console.log('HomePage222222---',this.props)

                return false;
            } else {
                console.log('HomePage33333--',this.props)
                toastShort('再点击一次退出应用');
            }
        } else {
            if (routes.length > 1) {
                console.log('HomePage44444--',this.props)
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