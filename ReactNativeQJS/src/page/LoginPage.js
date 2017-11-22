//登录页面的逻辑
import React, {Component} from 'react';
import LoginContainer from '../container/LoginContainer'
export default class LoginPage extends Component {
    render() {
        return (<LoginContainer navigation={this.props.navigation}/>)
    }
}


