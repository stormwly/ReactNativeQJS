import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import Routers from './Routers';
class AppWithNavigationState extends Component {
    render() {
        const { dispatch, nav } = this.props;
        return (
            <Routers navigation={addNavigationHelpers({
                dispatch: dispatch,
                state: nav
            })}
            />
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});


export default connect(mapStateToProps)(AppWithNavigationState);