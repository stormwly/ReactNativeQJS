import React, {Component} from 'react'
import store from './src/store/configureStore'
import {Provider} from 'react-redux'
import splash_screen from 'react-native-splash-screen'
import RepositoryUtils from './src/common/storage/RepositoryUtils'

import AppWithNavigationState from './src/routers/AppWithNavigationState'

export default class rootApp extends Component {

    componentWillMount() {
        console.log("root 初始化")
        RepositoryUtils.init(true);//初始化操作
    }

    render() {
        return <Provider store={store}>
            <AppWithNavigationState/>
        </Provider>
    }

    componentDidMount() {
        splash_screen.hide()
    }
}