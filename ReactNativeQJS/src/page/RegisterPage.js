'use strict'
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'

export default class RegisterPage extends Component {
    render() {
        return <View style={styles.container}>
            <Text onPress={()=>alert('我是注册')}>我是注册</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.bgColor
    }
})