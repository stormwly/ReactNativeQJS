import React from 'react'
import {
    View
} from 'react-native'
import Button from 'react-native-button'
import ThemeStyles from '../../res/styles/ThemeStyles'

const StackOptions = ({navigation}) => {
    console.log('StackOptions---',navigation)
    let {state, goBack} = navigation
    //用来控制是否显示header
    let header
    const visible = state.params.visible
    if (visible === false) {
        header = null
    }

    let headerTitle = state.params.title
    let headerStyle = ThemeStyles.headerStyle
    let headerTitleStyle = ThemeStyles.headerTitleStyle
    let headerLeft = (
        <Button onPress={() => goBack()} style={{fontSize:20, color: 'gray', marginLeft: 3,width:30}}>{'<'}</Button>)
    let headerRight = (<View/>)//用来解决android导航栏标题不居中的问题
    let gestureResponseDistance = {horizontal: 300}


    return {header, headerTitle, headerTitleStyle, headerStyle, headerLeft,headerRight, gestureResponseDistance}
}

export default StackOptions