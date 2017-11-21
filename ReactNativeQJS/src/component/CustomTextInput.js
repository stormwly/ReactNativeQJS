'use strict'
import React, {Component} from 'react-native';

const PropTypes = require('prop-types');
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    ViewPropTypes,
    ColorPropType
} from 'react-native'

export default class CustomTextInput extends Component {

    render() {
        let {
            containerStyle,
            iconStyle,
            textInputStyle,
            iconRef,
            iconName,
            textInputRef,
            placeholderTextColor,
            borderBottomColor,
            placeholderText,
            ...attributes
        } = this.props;

        return <View style={[styles.defaultContainerStyle, containerStyle, {borderBottomColor: borderBottomColor}]}>
            <Image style={[styles.defaultIconStyle, iconStyle]}
                   ref={iconRef}
                   source={iconName}>
            </Image>
            <TextInput style={[styles.defaultTextInputStyle, textInputStyle]}
                       placeholderTextColor={placeholderTextColor}
                       ref={textInputRef}
                       placeholder={placeholderText}
                       underlineColorAndroid={'transparent'}
                       clearButtonMode={'while-editing'}
                       {...attributes}
            />
        </View>
    }
}

CustomTextInput.propTypes = {
    containerStyle: ViewPropTypes.style,
    iconStyle: ViewPropTypes.style,
    textInputStyle: ViewPropTypes.style,
    iconRef: PropTypes.string,
    iconName: PropTypes.string,
    textInputRef: PropTypes.string,
    placeholderTextColor: ColorPropType.isRequired,
    placeholderText: PropTypes.string,
    borderBottomColor: ColorPropType.isRequired,

};

const styles = StyleSheet.create({
    defaultContainerStyle: {
        flexDirection: 'row',
        marginLeft: 15,
        // marginRight: 15,
        borderBottomColor:'#4ECBFC',
        borderBottomWidth: 1,

    },
    defaultIconStyle: {
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        height:28,
        width:28,
    },
    defaultTextInputStyle: {
        marginLeft:5,
        marginRight:10,
        height: 46,
        width: SCREEN_WIDTH - 50,
        color: 'blue',
        fontSize: FONT_SIZE(14),
    },
})