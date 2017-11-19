import React, {Component} from 'react'
import store from './src/store/configureStore'
import {Provider} from 'react-redux'
import splash_screen from 'react-native-splash-screen'

import AppWithNavigationState from './src/routers/AppWithNavigationState'
export default class rootApp extends Component {

    render() {
        return <Provider store={store}>
          <AppWithNavigationState/>
        </Provider>
    }

    componentDidMount() {
        splash_screen.hide()
    }
}