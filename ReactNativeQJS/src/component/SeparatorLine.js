'use strict'

import React from 'react'

import {
    StyleSheet,
    View
} from 'react-native'

let SeparatorLine = () => {
    return <View style={[styles.separatorStyle]}/>;
}

const styles = StyleSheet.create({
    separatorStyle: {
        backgroundColor: Colors.splitLineColor,
        height: 5
    },
})

export default SeparatorLine;