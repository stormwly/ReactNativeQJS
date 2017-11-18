//投资页面的逻辑
import React, {Component} from 'react';
import {connect} from 'react-redux'
import HomeContentContainer from '../container/HomeContentContainer'
import splash_screen from 'react-native-splash-screen'

class HomePage extends Component {
    componentDidMount() {
        splash_screen.hide()
    }

    render() {
        return (<HomeContentContainer navigation={this.props.navigation}/>);
    }
}
export default connect((state) => {
    const routes = state.nav.routes;
    return {
        routes
    };
})(HomePage)