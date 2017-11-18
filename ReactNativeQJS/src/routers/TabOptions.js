'use strict'
import React from 'react'
import {
    Image
} from 'react-native'
import ThemeStyles from '../../res/styles/ThemeStyles'
const TabOptions = (tabBarTitle, topTitle, normalImage, selectedImage) => {
    let tabBarLabel = tabBarTitle;
    let tabBarIcon = (({tintColor, focused}) => {
        return (
            <Image
                source={!focused ? normalImage : selectedImage}
                style={[{height:24, width:24,marginTop:1}]}
            />
        )
    });
    let headerTitle = topTitle;
    let headerTitleStyle = ThemeStyles.headerTitleStyle;
    // header的style
    let headerStyle = ThemeStyles.headerStyle;
    let headerLeft = null;
    let tabBarVisible = true;
    let header;
    if (topTitle === null) {
        header = null;
    }
    return {tabBarLabel, tabBarIcon, headerTitle, headerTitleStyle, headerStyle, tabBarVisible, headerLeft,header};
}

export default TabOptions