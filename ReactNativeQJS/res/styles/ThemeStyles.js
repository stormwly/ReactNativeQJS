//公共样式主题相关
'use strict'
import {
    StyleSheet
} from 'react-native';

const ThemeStyles=StyleSheet.create({

    //下面是定义顶部导航栏的样式
    headerStyle:{
        backgroundColor:Colors.white,
    },
    headerTitleStyle:{
        fontSize:FONT_SIZE(14),
        color:Colors.headTitleColor,
        alignSelf:'center',
    },

    headerRightStyle:{
        fontSize:FONT_SIZE(16),
        color:Colors.headTitleColor,
        alignSelf:'center',
    }


})

export default ThemeStyles;