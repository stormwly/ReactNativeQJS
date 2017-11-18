'use strict'

import React from 'react'

import {
    StyleSheet,
    View,
    Text
} from 'react-native'

let EmptyView = (text) => {
    <View style={styles.emptyViewStyle}>
        <Text>
            {text}
        </Text>
    </View>
}

const styles = StyleSheet.create({
    emptyViewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
})

export default EmptyView;