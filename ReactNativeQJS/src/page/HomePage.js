//投资页面的逻辑
import React, {Component} from 'react';
import {connect} from 'react-redux'
import HomeContentContainer from '../container/HomeContentContainer'
class HomePage extends Component {
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