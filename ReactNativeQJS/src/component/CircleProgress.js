'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';

let CircleProgress = () => {
    return <View style={styles.container}>
        <ActivityIndicator animating={true}
                           color={Colors.gray}
                           style={styles.centering}
                           size='small'/>
        <Text style={styles.text}>加载中...</Text>
    </View>

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        fontSize:14,
        color:Colors.gray,
        marginTop:2
    }

});

export default CircleProgress;
