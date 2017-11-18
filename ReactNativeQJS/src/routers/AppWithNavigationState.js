import React, { Component } from 'react';
import {
    BackHandler
} from 'react-native'
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import {NavigationActions} from 'react-navigation'
import Routers from './Routers';
import {toastShort} from "../common/ToastUtils"
let lastClickTime=0;

class AppWithNavigationState extends Component {
    render() {
        console.log('mmmm---',this.props)
        const { dispatch, nav } = this.props;
        return (
            <Routers navigation={addNavigationHelpers({
                dispatch: dispatch,
                state: nav
            })}
            />
        );
    }

    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid );
    }

    _onBackAndroid=()=>{
        let {nav,dispatch}=this.props;
        let{routes}=nav;
        console.log('AppWithNavigationState----',this.props)
        var now = new Date().getTime();
        if(routes&&routes.length===1){
            if(now - lastClickTime < 2500) {
                return false;
            }else {
                toastShort('再点击一次退出应用');
            }
        }else {
            NavigationActions.BACK();
        }
        lastClickTime = now;
        return true;
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});


export default connect(mapStateToProps)(AppWithNavigationState);