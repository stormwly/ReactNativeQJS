'use strict'
import React, {Component} from 'react';

const PropTypes = require('prop-types');
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    ViewPropTypes,
    ColorPropType,
    TouchableOpacity
} from 'react-native'
import Colors from "../contants/Colors";

export default class CustomTextInput extends Component {
    render() {
        let {
            containerStyle,
            iconLeftStyle,
            iconRightStyle,
            textInputStyle,
            iconLeftRef,
            iconRightRef,
            leftIconName,
            rightIconName,
            textInputRef,
            placeholderTextColor,
            borderBottomColor,
            placeholderText,
            iconRightOnPress,
            ...attributes
        } = this.props;
        return <View style={[styles.defaultContainerStyle, containerStyle, {borderBottomColor: borderBottomColor}]}>
            <Image style={[styles.defaultIconStyle, iconLeftStyle]}
                   ref={iconLeftRef}
                   resizeMode={'center'}
                   source={leftIconName}>
            </Image>
            <TextInput style={[styles.defaultTextInputStyle, textInputStyle]}
                       placeholderTextColor={placeholderTextColor}
                       ref={textInputRef}
                       placeholder={placeholderText}
                       underlineColorAndroid={'transparent'}
                       clearButtonMode={'while-editing'}
                       {...attributes}/>
            <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => iconRightOnPress()} activeOpacity={0.8}>
                <Image style={[styles.defaultIconStyle, iconRightStyle]}
                       ref={iconRightRef}
                       resizeMode={'center'}
                       source={rightIconName}>
                </Image>
            </TouchableOpacity>
        </View>
    }
}

CustomTextInput.propTypes = {
    containerStyle: ViewPropTypes.style,
    iconLeftStyle: ViewPropTypes.style,
    iconRightStyle: ViewPropTypes.style,
    textInputStyle: ViewPropTypes.style,
    iconLeftRef: PropTypes.string,
    iconRightRef: PropTypes.string,
    leftIconName: PropTypes.number,
    rightIconName: PropTypes.number,
    textInputRef: PropTypes.string,
    iconRightOnPress: PropTypes.func,
    placeholderTextColor: ColorPropType.isRequired,
    placeholderText: PropTypes.string,
    borderBottomColor: ColorPropType.isRequired,

};

const styles = StyleSheet.create({
    defaultContainerStyle: {
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        borderBottomColor: Colors.bottomColor,
        borderBottomWidth: 0.5,
    },
    defaultIconStyle: {
        alignSelf: 'center',
        height: 32,
        width: 25,
    },
    defaultTextInputStyle: {
        marginLeft: 5,
        marginRight: 10,
        height: 46,
        flex: 1,
        color: Colors.textColor,
        fontSize: FONT_SIZE(14),
    },
})