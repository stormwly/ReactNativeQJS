'use strict'

import React from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native'

let ErrorView = (errMsg) => {
    return <View style={styles.errorViewStyle}>
        <Image source={require('../../res/images/net_error.png')} style={{width: 60, height: 60,marginBottom:5}}/>
        <Text>{errMsg}</Text>
    </View>
}

const styles = StyleSheet.create({
    errorViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
})

export default ErrorView;