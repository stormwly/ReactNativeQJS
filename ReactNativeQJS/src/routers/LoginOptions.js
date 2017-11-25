import React from 'react'
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import Button from 'react-native-button'
import ThemeStyles from '../../res/styles/ThemeStyles'

const LoginOptions = ({navigation}) => {
    console.log('LoginOptions---', navigation)
    let {state, goBack} = navigation
    //用来控制是否显示header
    let header
    if (state.params ? state.params.visible === false : null) {
        header = null
    }
    let headerTitle = state.params ? state.params.title : '登录'
    let headerStyle = ThemeStyles.headerStyle
    let headerTitleStyle = ThemeStyles.headerTitleStyle
    let headerLeft = (
        <Button onPress={() => goBack()} style={{fontSize: 20, color: 'gray', marginLeft: 3, width: 30}}>{'<'}</Button>)
    let headerRight = (
        <TouchableOpacity onPress={()=>state.params.headerRightClick()} activeOpacity={0.8}>
            <Image source={ConstantData.ICON_SETTING_LOGIN}
                   style={{
                       height: 24,
                       width: 24,
                       marginRight: 10
                   }}/>
        </TouchableOpacity>)//用来解决android导航栏标题不居中的问题
    let gestureResponseDistance = {horizontal: 300}
    return {header, headerTitle, headerTitleStyle, headerStyle, headerLeft, headerRight, gestureResponseDistance}
}

export default LoginOptions